'use strict';

let axios = require('axios');


// `${year}${month < 10 ? `0${month}` : `${month}`}${date}`;

//https://api.rawg.io/api/games/slug?key=31ed97f5afa843cba25e360868e7e2be
function gameHandler(req, res) {
    try {
        let gameName = req.query.gameName;
        let gameURL = `https://api.rawg.io/api/games/${gameName}?key=${process.env.API_KEY}`;
        // console.log(gameURL);
        axios.get(gameURL).then(gameDataArray => {
            // console.log(1111111111111111,gameDataArray.data);
            let gameData =  new Games(gameDataArray.data);
            res.send(gameData);
        });
    } catch (error) {
        res.status(500).send('Error in finding the games', error);
    }
}

function findReq(game) {

    let data = game.platforms.find(element2 => {
        // console.log(11111111, element2.platform.slug);
        if (element2.platform.slug === 'pc') {
            return element2;
        }
        // else{
        //     return "This has no requirements";
        // }
    });
    // console.log(data);
    if(data === undefined){
        return "This has no requirements"
    }else{

        return data.requirements;
    }
}


class Games {
    constructor(element) {
        this.name = element.name;
        this.image = element.background_image;
        this.description = element.description_raw;
        this.rating = element.rating;
        // this.requirements = element.platforms.find(element2 => {
        //     console.log(11111111, element2.platform.slug);
        //     if (element2.platform.slug === 'pc') {
        //         return element2.requirements;
        //     }
        // });
        this.requirements = findReq(element);
    }
}

module.exports = gameHandler;
