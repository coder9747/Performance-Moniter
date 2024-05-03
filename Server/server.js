const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");

//for env variables
dotenv.config();

//creating express app
const app = express();

//using middleware
app.use(express.json()); //for getting data as a json
app.use(cors()); //for resolving cors error

//creating http server
const httpServer = http.createServer(app);

//creating io for sockets
const io = socketIo(httpServer, {
    cors: "*",
});

//listing to port from env variable
httpServer.listen(process.env.PORT, () => {
    console.log(`Server Running At Port ${process.env.PORT}`);
})

//exporting module 
module.exports = { io, app };




