import brainwavelogger.signalproc as signalproc
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt


def read_eeg_csv(filepath):
    df = pd.read_csv(filepath)
    return df


filepath = r"C:\Users\mavip\Desktop\Research Kit\Recordings\Day_2_Focus_Protocol_afternoon_work_session_8cab610dc2b61529.csv"  # noqa
filepath = r"C:\Users\mavip\Desktop\Research Kit\Recordings\Day_4_Focus_Protocol_afternoon_work_session_dd24a8ab9e33fe97.csv" # noqa
filepath = r"C:\Users\mavip\Desktop\Research Kit\Recordings\Day_5_No_Protocol_morning_work_session_42b436667eceaea3.csv" # noqa
sampling_rate = 500
seconds_in_minute = 60
df = read_eeg_csv(filepath)


eeg_channels = signalproc.eeg_channels_to_use()

freq_bands = signalproc.define_freq_bands()

filtered_df = signalproc.bandpass_filter(df, eeg_channels, sampling_rate)

cleaned_df = signalproc.remove_outliers(filtered_df)


brain_power_dict = signalproc.compute_brain_power(cleaned_df, sampling_rate,
                                                  freq_bands)

mean_brain_power_dict = {band: np.mean(power) for band,
                         power in brain_power_dict.items()}

print(f"Number of minutes in session: {int(len(df)/sampling_rate/seconds_in_minute)}") # noqa

print(f"{int(len(cleaned_df)/len(filtered_df)*100)}% of data kept after removing outliers")  # noqa

print(pd.DataFrame(mean_brain_power_dict.items(),
                   columns=["Band", "Mean Power"]))


samples_of_interest = range(20000, 22000)
cleaned_df[eeg_channels].iloc[samples_of_interest].plot()
plt.xlabel('Samples')
plt.ylabel('Amplitude (Microvolts)')
plt.show()
# plt.title(f'Filter order: {current_filter_order}')

# @TODO save in sessions file: 1. bans, 2. duration, 3. % kept after rejection
# @TODO reject bad channels per sessions