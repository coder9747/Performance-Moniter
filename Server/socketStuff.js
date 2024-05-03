const io = require("./server").io;


//middleware
io.use((socket, next) => {
    const { handshake: { auth: { clientType } } } = socket;
    if (clientType == 'node') {
        //means this client is our nodeClient
        //so we have join this client in node room
        socket.join("node");
        //go to next middleware
        next();
    }
    else if (clientType == 'react') {
        //means this client is our react client 
        //so we have to join this to react room
        socket.join("react");
        next();
    }
    else {
        //means this is not our client
        socket.disconnect();
    }
})

let idToNodeClient = {};

io.on("connection", (socket) => {
    let machineId = null;
    const nameOfuser = socket.handshake.auth.name;
    socket.on("perfData", ({ id, data }) => {
        if (!machineId) {
            //store id for firstTime
            machineId = id;
        }
        //data comming from node client
        //now we have to send this data to react client
        idToNodeClient[id] = { data, nameOfuser };
        socket.to('react').emit("dataFromServer", idToNodeClient);
    })
    socket.on("disconnect", () => {
        //now we have to remove this key F
        delete idToNodeClient[machineId];
    })

});


// setInterval(() => {
//     idToNodeClient = {}; //reset to remove dead nodeClient
// }, 5000);