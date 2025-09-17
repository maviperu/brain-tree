@echo off
REM Create conda environment from environment.yml and install brainwavelogger package

REM Create the environment
conda env create -f environment.yml

REM Activate the environment
CALL conda activate brainwavelogger

REM Install the brainwavelogger package
pip install -e .