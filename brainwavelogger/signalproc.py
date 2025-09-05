import numpy as np
import pandas as pd
from scipy import signal


def eeg_channels_to_use():
    # From a previous study, I found these channels work best
    # See here: https://github.com/maviperu/focus-protocol-eeg-dl/blob/main/scripts/Signal%20processing%20EEG%20artifact%20rejection.ipynb # noqa
    return ['Ch1RawEEG', 'Ch2RawEEG', 'Ch4RawEEG',  'Ch5RawEEG',  'Ch6RawEEG',
            'Ch8RawEEG', 'Ch10RawEEG', 'Ch11RawEEG', 'Ch12RawEEG']


def define_freq_bands(delta_start=0, theta_start=4, alpha_start=8,
                      beta_start=13, gamma_start=30, gamma_end=50):
    freq_band_limits = dict()
    freq_band_limits["delta"] = [delta_start, theta_start-1]
    freq_band_limits["theta"] = [theta_start, alpha_start-1]
    freq_band_limits["alpha"] = [alpha_start, beta_start-1]
    freq_band_limits["beta"] = [beta_start, gamma_start-1]
    freq_band_limits["gamma"] = [gamma_start, gamma_end]
    return freq_band_limits


def butter_lowpass(cutoff, fs, order=5):
    nyq = 0.5 * fs
    normal_cutoff = cutoff / nyq
    sos = signal.butter(order, normal_cutoff, btype='low', analog=False,
                        output='sos')
    return sos


def butter_lowpass_filter(data, cutoff, fs, order=5):
    sos = butter_lowpass(cutoff, fs, order=order)
    y = signal.sosfilt(sos, data, axis=0)  # Axis 0 works properly with
    # dataframe.values
    return y


def butter_highpass(cutoff, fs, order=5):
    nyq = 0.5 * fs
    normal_cutoff = cutoff / nyq
    sos = signal.butter(order, normal_cutoff, btype='high', analog=False,
                        output='sos')
    return sos


def butter_highpass_filter(data, cutoff, fs, order=5):
    sos = butter_highpass(cutoff, fs, order=order)
    y = signal.sosfiltfilt(sos, data, axis=0)
    return y


def bandpass_filter(df, eeg_columns, sampling_rate, highcut=30, lowcut=0.5,
                    filter_order=5):
    high_pass_filtered_array = butter_highpass_filter(df[eeg_columns].values,
                                                      highcut, sampling_rate,
                                                      order=filter_order)
    band_pass_filtered_array = butter_lowpass_filter(high_pass_filtered_array,
                                                     lowcut, sampling_rate,
                                                     order=filter_order)
    return pd.DataFrame(band_pass_filtered_array, columns=eeg_columns)


def remove_outliers(df, threshold=50):
    mask = ((df >= -threshold) & (df <= threshold)).all(axis=1)
    return df[mask]


def compute_brain_power(df, fs, freq_bands):
    brain_power = dict()
    freqs, psd = signal.welch(df.values, fs=fs, nperseg=len(df))
    for band in freq_bands:
        fmin = freq_bands[band][0]
        fmax = freq_bands[band][1]
        band_idx = np.logical_and(freqs >= fmin, freqs <= fmax)
        brain_power[band] = np.trapz(psd[band_idx], freqs[band_idx])
    return brain_power
