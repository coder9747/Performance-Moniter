const SocketMain = (io)=>{
    io.use((socket,next)=>{
        const token = socket.handshake.auth.token;
        if(token=="node")
        {
            socket.join("nodeClient");
            next();
        }
        if(token=='react')
        {
            socket.join("reactClient");
            next();
        }
        else{
            console.log("Unknown Client");
        }
    })

    io.on("connection",(socket)=>{
        let machineId = null;
        console.log("socket Connected");
        socket.on("perfData",(data)=>{
            const {id} = data;
            machineId = id;
            io.to("reactClient").emit("react-data",data);
        })
        socket.on("disconnect",(resone)=>{
            console.log("Socket Disconnected");
            io.of("/").to("reactClient").emit("isAlive",{machineId});
        })
    })
}

module.exports = SocketMain;