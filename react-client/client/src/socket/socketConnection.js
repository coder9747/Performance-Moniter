import {io} from "socket.io-client";

let endPoint = 'https://performance-moniter.onrender.com';

export const socket = io(endPoint,
{
    auth:{
        name:"react-client",
        clientType:"react",
    }
});