// Application entrypoint.

// const initialState = {
//   currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
//   messages: [
//     {
//       username: "Bob",
//       content: "Has anyone seen my marbles?",
//     },
//     {
//       username: "Anonymous",
//       content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
//     }
//   ]
// }

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
// import ChatBar from './ChatBar.jsx'
// import Message from './Message.jsx'
// import MessageList from './MessageList.jsx'

ReactDOM.render(<App />, document.getElementById('react-root'));
// ReactDOM.render(<MessageList />, document.getElementsByClassName('message')[0]);
// ReactDOM.render(<Message />, document.getElementsByTagName('body')[0]);
// ReactDOM.render(<ChatBar />, document.getElementsByClassName('chatbar')[0]);


