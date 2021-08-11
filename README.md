# Media Backlog Tracker

## Overview
Hello! The goal of this application is to provide a checklist of sorts for movie, video game, and book backlogs. You can add entries and check them off as they are comlpeted, as well as getting randomized suggestions for the next thing to tackle.

## How to Use
To use this application, clone the repo/download the zip file. Once complete, run `npm install && npm start` to open the main application. Run `npm run server` in a seperate terminal window to spin up the server.

## Features
### Home Page
Once opened, the application should land on the home page. Once your backlogs are populated, the home page should suggest a random item from each list. This can be re-rolled with the button underneath them

### Movies, Games, and Books Pages
These are where your backlogs live. The key features here are 
* Add new items
* Edit existing items
* Delete items
* Filter by keyword
* Sort items
* Mark and item as complete

Once and item is markes as complete it will be moved to the completed list. This can be viewed by toggling the "Finished | Unfinished" toggle at the top