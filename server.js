'use strict';

//______________________________________// REQUIREMENTS \\______________________________________\\

const express = require('express');
const server = express();

const cors = require('cors');
server.use(cors());

require('dotenv').config();
const PORT = process.env.PORT;

const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGO_DB}`);

//______________________________________// FUNCTIONS \\______________________________________\\



//______________________________________// ROUTS \\______________________________________\\

server.listen(PORT, () => {
    console.log('Server is listening');
});
