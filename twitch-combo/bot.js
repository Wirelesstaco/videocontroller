const tmi = require('tmi.js');
require('dotenv').config();

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!d20') {
    //console.log(test);
   
    const num = rollDice(commandName);
    client.say(target, `You rolled a ${num}.`);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === '#great') {

    client.say(target, `We Are Great`);
  } else if (commandName === '1') {
    io.emit('movep', commandName);
  }else if (commandName === '2') {
    io.emit('movep', commandName); 
  }else if (commandName === '3') {
    io.emit('movep', commandName); 
  }else if (commandName === '4') {
    io.emit('movep', commandName); 
  } else if (commandName === '5') {
  io.emit('movep', commandName); 
}


    else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 20;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

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
    
  });
});