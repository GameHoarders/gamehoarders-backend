'use strict';

let axios = require('axios');

let newDate = new Date();
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

// `${year}${month < 10 ? `0${month}` : `${month}`}${date}`;

//https://api.rawg.io/api/games?key=31ed97f5afa843cba25e360868e7e2be&ordering=-released&dates=2010-01-01,2021-10-02
function newGamesHandler(req, res) {
    try {
        let gameURL = `https://api.rawg.io/api/games?key=${process.env.API_KEY}&ordering=-released&dates=${year}-01-01,${year}-${month < 10 ? `0${month}` : `${month}`}-${date < 10 ? `0${date}` : `${date}`}&metacritic=80,100`;
        // console.log(gameURL);
        axios.get(gameURL).then(gameDataArray => {
            let gameData = gameDataArray.data.results.map(element => {
                return new Games(element);
            });
            res.send(gameData);
        });
    } catch (error) {
        res.status(500).send('Error in finding the games', error);
    }
}


class Games {
    constructor(element) {
        this.name = element.name;
        this.image = element.background_image;
    }
}

module.exports = newGamesHandler;
