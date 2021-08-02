
//This is a way of importing the module that I am using
var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("My socket server is running");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

//This is the function that is triggered when there is a new socket connection
function newConnection(socket){
    console.log('new connection: ' + socket.id);

    //If there is a message called mouse, trigger this function
    
    socket.on('move', movement);

    socket.on('state', statt);

    //socket.on('startOver', resetMsg);


    //When the mouse message comes in, I want to call the broadcast.emit function to send the same exact message back out.
    //A message that comes in can be 

    function movement(data2){
        socket.broadcast.emit('move', data2);
        console.log(data2);
    }

    function statt(data3){
        socket.broadcast.emit('state', data3);
        console.log(data3);
    }

    // function resetMsg(data2){
    //     socket.broadcast.emit('startOver', data2);
    //     console.log(data2);

    // }
}