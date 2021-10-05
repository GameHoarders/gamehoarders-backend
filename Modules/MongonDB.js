'use strict';

//__________________________________// Mongo DB \\ __________________________________\\

const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: String,
    imageURL: String,
    rating: String,
    note: String,
    email: String
});

const gameModel = mongoose.model('game', gameSchema);

// const noteSchema = new mongoose.Schema({
//     note: String,
//     email: String
// });

// const noteModel = mongoose.model('note', noteSchema);

//__________________________________// Functions \\ __________________________________\\

function mongoFindHandler(obj, res) {
    gameModel.find(obj, function (error, data) {
        if (error) {
            console.log('error in getting data', error);
        } else {
            
            res.send(data);
        }
    });
}

// function mongoNoteFindHandler(obj, res) {
//     noteModel.find(obj, function (error, data) {
//         if (error) {
//             console.log('error in getting data', error);
//         } else {
//             res.send(data);
//         }
//     });
// }

function fevGamesHandler(req, res) {
    let userName = req.query.userName;
    mongoFindHandler({ email: userName }, res);
}


function addGameHandler(req, res) {
    console.log(3333, req.body);
    let { gameName, gameImageURL, gameRating,gameNote ,userName } = req.body;

    gameModel.create({
        name: gameName,
        imageURL: gameImageURL,
        rating: gameRating,
        note: gameNote,
        email: userName
    }).then(() => {
        mongoFindHandler({ email: userName }, res);
    }
    );
}

function deleteGameHandler(req, res) {
    let { gameID, userName } = req.query;
    console.log(gameID);
    gameModel.deleteOne({
        _id: gameID
    }).then(() => {

        mongoFindHandler({ email: userName }, res);
    }
    );
}


function updateNoteHandler(req, res) {
    let {gameName, gameImageURL, gameRating,gameNote ,userName , gameID} = req.body;
    gameModel.findByIdAndUpdate(gameID, {
        name: gameName,
        imageURL: gameImageURL,
        rating: gameRating,
        note: gameNote,
        email: userName
    }).then(() => {

        mongoFindHandler({ email: userName }, res);
    }
    );
}



module.exports = { games: fevGamesHandler, deletegames: deleteGameHandler, updateNotes: updateNoteHandler, addgames: addGameHandler};
