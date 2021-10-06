'use strict';

let axios = require('axios');

//https://api.rawg.io/api/games?key=31ed97f5afa843cba25e360868e7e2be&search=god
function searchHandler(req, res) {
    try {
        let gameName = req.query.gameName;
        let gameURL = `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${gameName}`;
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
        this.slug = element.slug;
        this.rating = element.rating;
        this.id = element.id;
    }
}

module.exports = searchHandler;
