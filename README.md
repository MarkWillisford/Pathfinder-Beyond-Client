## TTRPG Character Creater
The third and final capstone project for the Thinkful bootcamp utilizing a MERN full stack architecture

The app is live on Heroku [HERE](https://blooming-crag-44038.herokuapp.com/) while the API also is hosted on Heroku [HERE](https://rocky-mountain-99485.herokuapp.com/)

API repository is [HERE](https://github.com/MarkWillisford/Pathfinder-Beyond-API)

**Screenshots**
Dashboard:
![Alt text](/screenshots/desktop_TTRPGCharGen_Compressed.png "Dashboard")

Mobile Login:

![Alt text](/screenshots/mobile_TTRPGCharGen_Compressed.png "Dashboard")

One of a myriad of selection screens:
![Alt text](/screenshots/TTRPG_Screenshot_2.png "Race Selection")

**Summery**
This app allows a user to create an account and log in with either thier own credentials or with Google login. Once they access their secure dashboard, a user can create, save, and print level 1 characters using Paizo's Pathfinder Gaming system under the Open Game License (OGL).

The internal API has a number of endpoints that simply return the various data collections that the app needs; from lists of classes available to the player to the gear choices. In addition, the API also is responsible for User registration, verification, and authentication using Passport and JWTs

**Tech**

For this project I used;
- HTML/CSS
- JavaScript/jQuery
- Express / Node.js
- Mongoose and MongoDB
- React / Redux
- with a number of npm plugins.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).