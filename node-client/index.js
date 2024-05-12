const perfData = require("./helperFunctions");
const io = require("socket.io-client");
const { randomBytes } = require("crypto");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const endpoint = 'https://performance-moniter.onrender.com';

const socket = io.connect(endpoint,
    {
        auth: {
            name: 'coder',
            clientType: 'node',
        }
    });
const id = randomBytes(4).toString('hex');

setInterval(() => perfData(socket, id), 5000);

const port = process.env.PORT || 20000;

app.listen(port,()=>
{
    console.log('Server Running At Port 20000');
})








