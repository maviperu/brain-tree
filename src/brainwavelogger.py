import src.signalproc as signalproc
import pandas as pd
import numpy as np
import glob
# import matplotlib.pyplot as plt


def get_filepaths(folder):
    """Returns a list of all CSV file paths in the given folder."""
    return glob.glob(f"{folder}/*.csv")


def is_in_sessions_logged(filepath):
    """Checks if the given filepath is present in id_sessions_logged.csv."""
    logged_file = "id_sessions_logged.csv"
    with open(logged_file, "r") as f:
        logged_paths = [line.strip() for line in f if line.strip()]
    return filepath in logged_paths


def add_to_sessions_logged(filepath):
    """Appends the processed filepath to id_sessions_logged.csv."""
    logged_file = "id_sessions_logged.csv"
    with open(logged_file, "a") as f:
        f.write(filepath + "\n")


def read_eeg_csv(filepath):
    df = pd.read_csv(filepath)
    return df


def format_session_for_file(mean_brain_power_dict,
                            session_minutes, percentage_kept):
    # Prepare the line to append
    session_dict = {
        "deltaPower": int(mean_brain_power_dict.get("delta", 0)),
        "thetaPower": int(mean_brain_power_dict.get("theta", 0)),
        "alphaPower": int(mean_brain_power_dict.get("alpha", 0)),
        "betaPower": int(mean_brain_power_dict.get("beta", 0)),
        "gammaPower": int(mean_brain_power_dict.get("gamma", 0)),
        "sessionMinutes": int(session_minutes),
        "percentKept": int(percentage_kept)
    }
    # Format as JS object
    formatted_session = "    {" + ", ".join(f"{k}: {v}" for k, v in session_dict.items()) + "},\n"  # noqa
    return formatted_session


def update_sessions_file(formatted_session):
    sessions_filepath = "sessions.js"
    # Read file and remove closing bracket
    with open(sessions_filepath, "r") as f:
        content = f.read().rstrip()
    if content.endswith("]"):
        content = content[:-1]
    # Append new line and closing bracket
    with open(sessions_filepath, "w") as f:
        f.write(content)
        f.write(formatted_session)
        f.write("]")


def brainwavelogger(df):
    sampling_rate = 500
    seconds_in_minute = 60
    eeg_channels = signalproc.eeg_channels_to_use()
    freq_bands = signalproc.define_freq_bands()
    filtered_df = signalproc.bandpass_filter(df, eeg_channels, sampling_rate)
    cleaned_df = signalproc.remove_outliers(filtered_df)
    brain_power_dict = signalproc.compute_brain_power(cleaned_df, 
                                                      sampling_rate,
                                                      freq_bands)
    mean_brain_power_dict = {band: np.mean(power) for band,
                             power in brain_power_dict.items()}
    session_minutes = len(df)/sampling_rate/seconds_in_minute
    percentage_kept = len(cleaned_df)/len(filtered_df)*100
    formatted_session = format_session_for_file(mean_brain_power_dict,
                                                session_minutes,
                                                percentage_kept)
    return formatted_session


# Inspecting outputs for correctness.
# print(f"Number of minutes in session: {int(len(df)/sampling_rate/seconds_in_minute)}") # noqa

# print(f"{int(len(cleaned_df)/len(filtered_df)*100)}% of data kept after removing outliers")  # noqa

# print(pd.DataFrame(mean_brain_power_dict.items(),
#                    columns=["Band", "Mean Power"]))


# samples_of_interest = range(20000, 22000)
# cleaned_df[eeg_channels].iloc[samples_of_interest].plot()
# plt.xlabel('Samples')
# plt.ylabel('Amplitude (Microvolts)')
# plt.title('Cleaned')
# plt.show(block=False)

# fig = plt.subplots()
# filtered_df[eeg_channels].iloc[samples_of_interest].plot()
# plt.xlabel('Samples')
# plt.ylabel('Amplitude (Microvolts)')
# plt.title('Filtered')
# plt.show(block=False)

# @TODO save in sessions file: 1. bands, 2. duration, 3. % kept after rejection
# @TODO reject bad channels per sessions
# I can either do more for the CSV or go directly to LSL
# For LSL, it is going to be different? Let's see. 
# But I need to do the output as well, to the sessions file.
# Let's do that. 
# @TODO: Check output of Welch transform. Does it look like FFT?
# @TODO: Remove outliers at the feature level. 
# @TODO: Add bat file for brainwavelogger.py
# @TODO: Create instructions and try them in new user: https://conda.github.io/conda-pack/ # noqa