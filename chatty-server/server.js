// server.js

const express = require('express');
const Socket = require('ws')
const SocketServer = Socket.Server
// const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (client) => {
  console.log('Client connected');
  wss.broadcast({type: "userSize", users: wss.clients.size})
  const colorList = ["red", "blue", "green", "orange"]
  const color = colorList[Math.floor(Math.random()*colorList.length)];
  const colorObject = {type: "userColor", color: color}
  client.send(JSON.stringify(colorObject))

  // Echo back messages for testing purposes
  client.on('message', function incoming(message) {
    message = JSON.parse(message)
    uniqueID = uuidv4();
    if (message.type === "postMessage") {
      console.log("User " + message.username + " said: " + message.content)
      messageObject = {type: "incomingMessage", id: uniqueID, username: message.username, content: message.content, color: message.color, url: message.url}
      wss.broadcast(messageObject)
    } else if (message.type === "postNotification") {
      console.log("Notification sent.")
      messageObject = {type: "incomingNotification", id: uniqueID, username: message.username, content: message.content, color: message.color, url: message.url}
      wss.broadcast(messageObject)
    } else {
      console.log("Error reading message type.")
    }
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => {
    console.log('Client disconnected');
    wss.broadcast({type: "userSize", users: wss.clients.size})
  });
});


wss.broadcast = function (data) {
  wss.clients.forEach(function(client) {
    if (client.readyState === Socket.OPEN) {
      console.log("JSON message: ", data)
      console.log("Stringified message: ", JSON.stringify(data))
      client.send(JSON.stringify(data));
    }
  })
}


// function broadcastBack (message) {
//   // console.log(message)
//   wss.broadcast(message)
// }

