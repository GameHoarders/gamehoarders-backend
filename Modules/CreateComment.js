"use strict";

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    gameId: String,
    body: String,
    user: String,
    email: String,
});

const commentModel = mongoose.model("genralComments", commentSchema);


// let commentModel = require("../Schemas/GenralComments");
// let filtredData = commentsMatcher(gameData);
//       setTimeout(() => {
//         res.send(filtredData);
//       }, 300);

async function commentsMatcher(req, res) {
    let gameId = req.query.gameId;

    commentModel.find({ gameId }, function (error, results) {
        error ? console.log("error in getting data", error) : res.send(results);
    });
}

async function createComment(req, res) {
    let { gameId, body, user, email } = req.body;

    await commentModel.create({ gameId, body, user, email });

    commentModel.find({ gameId }, function (error, results) {
        error ? console.log("error in getting data", error) : res.send(results);
    });
}
// let commentModel = require("../Schemas/GenralComments");

async function deleteComment(req, res) {
    let { commentId, gameId } = req.query;
    commentModel.deleteOne({ _id: commentId }).then(() => {

        commentModel.find({ gameId }, function (error2, results) {
            error2
                ? console.log("error in getting data", error2)
                : res.send(results);
        });
    });
}

// let commentModel = require("../Schemas/GenralComments");

async function updateComment(req, res) {
    let { commentId, body, gameId } = req.body;
    commentModel.findByIdAndUpdate(commentId, { body }).then(() => {

        commentModel.find({ gameId }, function (error2, results) {
            error2
                ? console.log("error in getting data", error2)
                : res.send(results);
        });
    })
}



module.exports = { createComment, deleteComment, updateComment, commentsMatcher }

