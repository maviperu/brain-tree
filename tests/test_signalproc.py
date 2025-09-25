import src.signalproc as signalproc
import numpy as np
import pandas as pd


def test_eeg_channels_to_use():
    channels = signalproc.eeg_channels_to_use()
    assert isinstance(channels, list)
    assert all(isinstance(ch, str) for ch in channels)
    assert len(channels) == 9
    assert 'Ch1RawEEG' in channels


def test_define_freq_bands_defaults():
    bands = signalproc.define_freq_bands()
    assert isinstance(bands, dict)
    assert set(bands.keys()) == {'delta', 'theta', 'alpha', 'beta', 'gamma'}
    assert bands['delta'] == [0, 3]
    assert bands['theta'] == [4, 7]
    assert bands['alpha'] == [8, 12]
    assert bands['beta'] == [13, 29]
    assert bands['gamma'] == [30, 50]


def test_butter_lowpass_and_highpass():
    sos_low = signalproc.butter_lowpass(30, 100)
    sos_high = signalproc.butter_highpass(0.5, 100)
    assert isinstance(sos_low, np.ndarray)
    assert isinstance(sos_high, np.ndarray)


def test_butter_lowpass_filter_shape():
    data = np.random.randn(100, 2)
    filtered = signalproc.butter_lowpass_filter(data, 30, 100)
    assert filtered.shape == data.shape


def test_butter_highpass_filter_shape():
    data = np.random.randn(100, 2)
    filtered = signalproc.butter_highpass_filter(data, 0.5, 100)
    assert filtered.shape == data.shape


def test_bandpass_filter_returns_dataframe():
    df = pd.DataFrame(np.random.randn(100, 3), columns=['Ch1RawEEG',
                                                        'Ch2RawEEG',
                                                        'Ch4RawEEG'])
    eeg_columns = ['Ch1RawEEG', 'Ch2RawEEG', 'Ch4RawEEG']
    filtered = signalproc.bandpass_filter(df, eeg_columns, 100)
    assert isinstance(filtered, pd.DataFrame)
    assert list(filtered.columns) == eeg_columns


def test_remove_outliers():
    df = pd.DataFrame({'a': [0, 100, -100, 10], 'b': [0, 20, -60, 10]})
    cleaned = signalproc.remove_outliers(df, threshold=50)
    assert isinstance(cleaned, pd.DataFrame)
    assert all((cleaned >= -50).all(axis=1))
    assert all((cleaned <= 50).all(axis=1))


def test_compute_brain_power():
    seconds_of_data = 3
    eeg_channels = ['Ch1RawEEG', 'Ch2RawEEG', 'Ch3RawEEG']
    df = pd.DataFrame(np.random.randn(128*seconds_of_data, len(eeg_channels)),
                      columns=eeg_channels)
    freq_bands = signalproc.define_freq_bands()
    power = signalproc.compute_brain_power(df, 128, freq_bands)
    assert isinstance(power, dict)
    assert set(power.keys()) == set(freq_bands.keys())
    assert all(isinstance(power[band], np.ndarray) for band in power)
