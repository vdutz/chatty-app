const express = require('express');
const Socket = require('ws')
const SocketServer = Socket.Server
const uuidv4 = require('uuid/v4');

// Sets the port to 3001
const PORT = 3001;

// Creates a new express server
const server = express()
   // Makes the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Creates the WebSockets server
const wss = new SocketServer({ server });

// Sets up a callback that will run when a client connects to the server. When a client connects they are assigned a socket, represented by the ws parameter in the callback.
wss.on('connection', (client) => {
  console.log('Client connected');
  // Sends browser the updated number of users currently using Chatty app
  wss.broadcast({type: "userSize", users: wss.clients.size});

  // Sends browser a random color to assign to that client
  let colorList = ["red", "blue", "green", "orange", "purple"];
  let color = colorList[Math.floor(Math.random()*colorList.length)];
  let colorObject = {type: "userColor", color: color};
  client.send(JSON.stringify(colorObject));

  // Deals with websocket messages based on two different types
  client.on('message', function incoming(message) {
    message = JSON.parse(message);
    uniqueID = uuidv4();
    if (message.type === "postMessage") {
      messageObject = {type: "incomingMessage", id: uniqueID, username: message.username, content: message.content, color: message.color, url: message.url};
      wss.broadcast(messageObject);
    } else if (message.type === "postNotification") {
      messageObject = {type: "incomingNotification", id: uniqueID, username: message.username, content: message.content, color: message.color, url: message.url};
      wss.broadcast(messageObject);
    } else {
      console.log("Error reading message type.");
    }
  })

  // Sets up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => {
    console.log('Client disconnected');
    // Sends browser the updated number of users currently using Chatty app
    wss.broadcast({type: "userSize", users: wss.clients.size});
  });
});

// Broadcasts a message to all websocket clients
wss.broadcast = function (data) {
  wss.clients.forEach(function(client) {
    if (client.readyState === Socket.OPEN) {
      client.send(JSON.stringify(data));
    }
  })
}

