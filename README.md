# brain-tree
An incremental-style web game powered by your brain waves!

<img width="1485" height="840" alt="image" src="https://github.com/user-attachments/assets/6cd50ac5-5f21-4277-90a5-ec86989f1fd1" />

Basic loop:
1) Generate Energy either through recording and processing brainwaves (EEG headset required!), or manually by turning a crank (Little clickable object in the "Batteries" pane. Then, store Energy as Power in your Batteries
2) Use available Power to run your Mints to make Coins over time
3) Use available Power to grow Leaves for your tree to boost how much Energy is converted from brainwaves, or use available Coins to buy Battery Capacity upgrades to increase the amount of Power you can store
4) Repeat!

More features and flash to come
---------------------------
Version 0.027 || 2025/10/07 - Cloud Computing & New User Experience
---------------------------
* Created a short "New User Experience" (NUE) which reveals features over time. This will develop over time, and probably become the backbone of unlocking other features.
* Began adding additional early-game / non-EEG-based features
* Cleaned up and generalized a lot of JS code in prep for expanding buildings/upgrades
* Changed original Tree Button to a "sample" file with 5 sessions for new users and those without headsets to experience the power of the Brain Tree
* Added new button that allows users to upload brain data! This is processed and converted into energy

---------------------------
Version 0.015 || 2025/09/26 - Major Update and Release of MVP!
---------------------------
<img width="1418" height="844" alt="image" src="https://github.com/user-attachments/assets/4c1293b0-2b1d-450b-9363-8dff0a24f63e" />
LOTS of updates since last time, but roughly...
* Added more functionality to Mints, including upgrades
* Added Battery visuals to stats pane to show how full the batteries are
* Added rate information throughout the stats pane
* Updated several assets, and worked on some animations
* Adjusted some back-end things to help process session data and to use that data in the js files
* Significantly updated saving and loading functions
* Added ability to delete saves and start fresh
* Got a website and hosted the files! (URL Coming soon)

Game should be 100% playable in a demo state using the session data we have already collected and stored in sessions.js

---------------------------
Version 0.010 || 2025/09/17
---------------------------
<img width="1357" height="806" alt="image" src="https://github.com/user-attachments/assets/1d737345-1ff0-4843-8f20-4ef90dafaf4f" />
* Redesign of various panes. Reduced footprint of most functionality in order to create canvas space for graphics.
* Added Willow Leaves representing the boost for the tree. More clicks = more leaves growing on the page
* Began work on a building grid for future features. Current assets are mostly placeholders
* Fixed a couple minor bugs

---------------------------
Version 0.008 || 2025/09/08
---------------------------
<img width="1427" height="827" alt="image" src="https://github.com/user-attachments/assets/cbff8434-8e25-4cf2-a67b-1fa5255cdb7c" />
