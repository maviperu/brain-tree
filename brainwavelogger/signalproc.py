import numpy as np
import pandas as pd
from scipy import signal


def eeg_channels_to_use(subset='best'):
    """Returns the names of selected EEG channels

    Args:
        subset (str, optional): The subset of EEG channels to use.
        Options are 'all', 'clean', and 'best'. Defaults to 'best'.
        'all': returns all the eeg channel names as recorded by MW75 Neuro \
            Research Kit
        'clean': returns a subset of 9 channels that usually have good contact
        'best': retuns one channel from the right and one from the left that \
              have the most predictive power

    Returns:
        list: the list of channel names
    """
    # From a previous study, I found these channels are the cleanest
    # See here: https://github.com/maviperu/focus-protocol-eeg-dl/blob/main/scripts/Signal%20processing%20EEG%20artifact%20rejection.ipynb # noqa
    if subset == 'clean':
        return ['Ch1RawEEG', 'Ch2RawEEG', 'Ch4RawEEG',  'Ch5RawEEG',
                'Ch6RawEEG', 'Ch8RawEEG', 'Ch10RawEEG', 'Ch11RawEEG',
                'Ch12RawEEG']
    elif subset == 'best':
        # From logistic regression
        # See here: https://github.com/maviperu/focus-protocol-eeg-dl/blob/main/scripts/Classification%20of%20EEG%20with%20logistic%20regression.ipynb # noqa
        return ['Ch2RawEEG', 'Ch8RawEEG']
    elif subset == 'all':
        return ['Ch1RawEEG', 'Ch2RawEEG', 'Ch3RawEEG', 'Ch4RawEEG',
                'Ch5RawEEG', 'Ch6RawEEG', 'Ch87awEEG', 'Ch8RawEEG',
                'Ch9RawEEG', 'Ch10RawEEG', 'Ch11RawEEG', 'Ch12RawEEG']
    else:
        assert False, "subset can only take the values of 'clean', 'best' or 'all'" # noqa


def define_freq_bands(delta_start=0, theta_start=4, alpha_start=8,
                      beta_start=13, gamma_start=30, gamma_end=50):
    """Returns the limits of the frequency bands on EEG

    Args:
        delta_start (int, optional): To change the start of the delta band. \
            Defaults to 0.
        theta_start (int, optional): To change the start of the theta band. \
            Defaults to 4.
        alpha_start (int, optional): To change the start of the alpha band. \
            Defaults to 8.
        beta_start (int, optional): To change the start of the beta band. \
            Defaults to 13.
        gamma_start (int, optional): To change the start of the gamma band. \
            Defaults to 30.
        gamma_end (int, optional): To change the end of the gamma band. \
            Defaults to 50.

    Returns:
        dictionary: a dictionary with the bands as the keys and the \
            frequencies as the values
    """
    freq_band_limits = dict()
    freq_band_limits["delta"] = [delta_start, theta_start-1]
    freq_band_limits["theta"] = [theta_start, alpha_start-1]
    freq_band_limits["alpha"] = [alpha_start, beta_start-1]
    freq_band_limits["beta"] = [beta_start, gamma_start-1]
    freq_band_limits["gamma"] = [gamma_start, gamma_end]
    return freq_band_limits


def butter_lowpass(cutoff, fs, order=5):
    """generates lowpass filter coefficients

    Args:
        cutoff (float): what is the cut off frequency of the low pass filter
        fs (float): sampling rate
        order (int, optional): Filter order. Defaults to 5.

    Returns:
        array: coefficient array
    """
    nyq = 0.5 * fs
    normal_cutoff = cutoff / nyq
    sos = signal.butter(order, normal_cutoff, btype='low', analog=False,
                        output='sos')
    return sos


def butter_lowpass_filter(data, cutoff, fs, order=5):
    """low-pass filters timeseries data up to the cutoff frequency

    Args:
        data (array): dataframe values \
            (or more generally, datapoints x channels)
        cutoff (float): cutoff frequency
        fs (float): sampling rate
        order (int, optional): Filter order. Defaults to 5.

    Returns:
        array: the filtered signal
    """
    sos = butter_lowpass(cutoff, fs, order=order)
    y = signal.sosfilt(sos, data, axis=0)  # Axis 0 works properly with
    # dataframe.values
    return y


def butter_highpass(cutoff, fs, order=5):
    """generates highpass filter coefficients

    Args:
        cutoff (float): what is the cut off frequency of the high pass filter
        fs (float): sampling rate
        order (int, optional): Filter order. Defaults to 5.

    Returns:
        array: coefficient array
    """
    nyq = 0.5 * fs
    normal_cutoff = cutoff / nyq
    sos = signal.butter(order, normal_cutoff, btype='high', analog=False,
                        output='sos')
    return sos


def butter_highpass_filter(data, cutoff, fs, order=5):
    """high-pass filters timeseries data up to the cutoff frequency

    Args:
        data (array): dataframe values \
            (or more generally, datapoints x channels)
        cutoff (float): cutoff frequency
        fs (float): sampling rate
        order (int, optional): Filter order. Defaults to 5.

    Returns:
        array: the filtered signal
    """
    sos = butter_highpass(cutoff, fs, order=order)
    y = signal.sosfiltfilt(sos, data, axis=0)
    return y


def bandpass_filter(df, eeg_columns, sampling_rate, highcut=0.5, lowcut=30,
                    filter_order=5):
    """Band pass filter

    Args:
        df (dataframe): EEG data in dataframe (with other columns)
        eeg_columns (list): column names in dataframe to filter
        sampling_rate (float): sampling rate
        highcut (int, optional): What is the lowerst frequency we let pass. \
            Defaults to 0.5.
        lowcut (float, optional): What is the highest frequency we let pass. \
            Defaults to 30.
        filter_order (int, optional): Filter order. Defaults to 5.

    Returns:
        dataframe: dataframe with eeg_columns as the only columns, \
            and the filtered data as the values
    """
    high_pass_filtered_array = butter_highpass_filter(df[eeg_columns].values,
                                                      highcut, sampling_rate,
                                                      order=filter_order)
    band_pass_filtered_array = butter_lowpass_filter(high_pass_filtered_array,
                                                     lowcut, sampling_rate,
                                                     order=filter_order)
    return pd.DataFrame(band_pass_filtered_array, columns=eeg_columns)


def remove_outliers(df, threshold=50):
    """Function to remove values that are too big to be considered EEG signal

    Args:
        df (dataframe): dataframe with EEG data
        threshold (int, optional): Threshold above which we exclude the data. \
            Defaults to 50.

    Returns:
        dataframe: dataframe with rows removed where the values were too big \
            to be EEG data
    """
    mask = ((df >= -threshold) & (df <= threshold)).all(axis=1)
    return df[mask]


def compute_brain_power(df, fs, freq_bands):
    """Function that recevies an EEG dataframe and returns the power \
        for each frequency band and for each channel

    Args:
        df (dataframe): dataframe with only EEG data
        fs (float): sampling rate
        freq_bands (dictionary): dictionary created with \
            function define_freq_bands

    Returns:
        dictionary: each key is a frequency band and each value is an array \
            with the power for each channel for that frequency band
        For example, if df only had 3 columns, one key of the output would be \
            like: [alpha]=[0.1,0.3,0.2]
    """
    brain_power = dict()
    freqs, psd = signal.welch(df.values, fs=fs, nperseg=len(df), axis=0)
    for band in freq_bands:
        fmin = freq_bands[band][0]
        fmax = freq_bands[band][1]
        band_idx = np.logical_and(freqs >= fmin, freqs <= fmax)
        if len(band_idx) == 0:
            return 0
        brain_power[band] = np.trapezoid(psd[band_idx, :], freqs[band_idx],
                                         axis=0)
    return brain_power
