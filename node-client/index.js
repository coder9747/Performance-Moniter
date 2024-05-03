const perfData = require("./helperFunctions");
const io = require("socket.io-client");
const { randomBytes } = require("crypto");

const endpoint = 'http://localhost:10000';

const socket = io.connect(endpoint,
    {
        auth: {
            name: 'coder',
            clientType: 'node',
        }
    });
const id = randomBytes(4).toString('hex');

setInterval(() => perfData(socket, id), 1000);








