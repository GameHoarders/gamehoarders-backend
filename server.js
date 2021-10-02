'use strict';

//______________________________________// REQUIREMENTS \\______________________________________\\

const express = require('express');
const server = express();

const cors = require('cors');
server.use(cors());

require('dotenv').config();
const PORT = process.env.PORT;

// const mongoose = require('mongoose');
// mongoose.connect(`${process.env.MONGO_DB}`);

const ratingHandler = require('./Modules/Rating');
const newGamesHandler = require('./Modules/NewGames');
const pcHandler = require('./Modules/PcGames');
const playstationHandler = require('./Modules/PSGames');
const xboxHandler = require('./Modules/XboxGames');


//______________________________________// FUNCTIONS \\______________________________________\\



//______________________________________// ROUTS \\______________________________________\\

//http://localhost:3001/home/toprating?key=31ed97f5afa843cba25e360868e7e2be&ordering=-rating
server.get('/home/toprating',ratingHandler);

//https://api.rawg.io/api/games?key=31ed97f5afa843cba25e360868e7e2be&ordering=-released&dates=2010-01-01,2021-10-02
server.get('/home/newgames',newGamesHandler);

//https://api.rawg.io/api/games?key=31ed97f5afa843cba25e360868e7e2be&platforms=4&platforms_count=1&ordering=-released&dates=2010-01-01,2021-10-02  OR
//https://api.rawg.io/api/games?key=31ed97f5afa843cba25e360868e7e2be&platforms=4&ordering=-released&dates=2010-01-01,2021-10-02
server.get('/home/pc',pcHandler);

//https://api.rawg.io/api/games?key=31ed97f5afa843cba25e360868e7e2be&platforms=187,18,16&ordering=-released&dates=2010-01-01,2021-10-02
server.get('/home/playstation',playstationHandler);

//https://api.rawg.io/api/games?key=31ed97f5afa843cba25e360868e7e2be&platforms=14,1,3,186&ordering=-released&dates=2010-01-01,2021-10-02
server.get('/home/xbox',xboxHandler);


server.listen(PORT, () => {
    console.log('Server is listening');
});
