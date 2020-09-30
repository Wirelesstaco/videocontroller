var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var tes = "test worked";
// What html file to look at 
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//Server port
http.listen(3300, () => {
    console.log('listening on *:3300');
  });

// Listen to connection for any incoming events.
io.on('connection', (socket) => {
    console.log('a user econnected');

    // Disconnect event 
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
    // Recive chat message
    socket.on('chat message',(msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg); // send msg to everyone including sender
        io.emit('xpos', msg); 
       
    });

    socket.on('xpos',(msg) => {
      console.log('message: ' + msg);
      io.emit('xpos', msg); // send msg to everyone including sender
  });
});
function callme(){
  console.log("hiya");
}