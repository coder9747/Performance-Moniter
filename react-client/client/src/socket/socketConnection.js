import {io} from "socket.io-client";

let endpoint = 'http://localhost:10000';

export const socket = io(endpoint,
{
    auth:{
        name:"react-client",
        clientType:"react",
    }
});