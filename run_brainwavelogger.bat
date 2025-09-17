@echo off
REM Activate the brainwavelogger conda environment and run brainwavelogger.py
CALL conda activate
CALL conda activate brainwavelogger
python brainwavelogger/brainwavelogger.py
pause