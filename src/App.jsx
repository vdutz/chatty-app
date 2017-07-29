import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {

  constructor(props) {

    // Generates a unique ID for each anonymous user
    let numberList = ["1","2","3","4","5","6","7","8","9","0"]
    function randomNumber() {
      return numberList[Math.floor(Math.random()*numberList.length)];
    }
    let uniqueAnonID = randomNumber() + randomNumber() + randomNumber();

    // Creates the initial state of Chatty app
    super(props);
    this.socket = new WebSocket("ws://localhost:3001");
    this.state = {
                    currentUser: {name: "Anonymous" + uniqueAnonID},
                    messages: [
                                {type: "incomingNotification",
                                id: "1",
                                username: "",
                                content: "Welcome to Chatty! Start typing to join in. You may change your username in the bottom left corner.",
                                color: "black",
                                url: "/"}
                              ],
                    users: 0,
                    color: "black"
                  }
  };

  notifyName(event) {

    // Sends a name-change notification when user blurs away from the username field
    const oldName = this.state.currentUser.name;
    const newName = event.target.value;
    const newUser = {name: newName};
    this.setState({currentUser: newUser});
    const newNotification = {type: "postNotification", content: `'${oldName}' has changed their name to '${newName}'.`};
    this.socket.send(JSON.stringify(newNotification));
  }

  addMessage(event) {

    // Sends message information to the server when user presses the ENTER key
    if (event.key === 'Enter') {
      console.log("Enter key pressed.");

      // Checks to see if the message contains an image URL
      let textToTest = event.target.value;
      let result = textToTest.match(/[^\s]+(\.png$|\.gif$|\.jpg$)/);

      // If the message contains an image URL, displays the image instead of the URL
      if (!result) {
        let newMessage = {type: "postMessage", username: this.state.currentUser.name, content: event.target.value, color: this.state.color, url: "/"};
        this.socket.send(JSON.stringify(newMessage));
      } else {
        let url = result["0"];
        let content = event.target.value.replace(url, "");
        console.log("Remaining content: ", content);
        let newMessage = {type: "postMessage", username: this.state.currentUser.name, content: content, color: this.state.color, url: url};
        this.socket.send(JSON.stringify(newMessage));
      }
      console.log("Match result: ", result);

      event.target.value = "";
    }
  }

  componentDidMount() {

    this.socket.onopen = function (event) {
      console.log("Connected to the server");
    }

    // Changes the state of Chatty app based on four different types of incoming server messages
    this.socket.onmessage = function(event) {
      let message = JSON.parse(event.data);
      console.log("Incoming message: ", message);
      if (message.type === "userSize") {
        this.setState({users: message.users});
      } else if (message.type === "userColor") {
        this.setState({color: message.color});
      } else if (message.type === "incomingMessage") {
        let messages = this.state.messages.concat(message);
        this.setState({messages: messages});
      } else if (message.type === "incomingNotification") {
        let messages2 = this.state.messages.concat(message);
        this.setState({messages: messages2});
      } else {
        throw new Error("Unknown event type " + message.type);
      }
    }

    this.socket.onmessage = this.socket.onmessage.bind(this);

  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="navbar-users">Users online: {this.state.users}</div>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} onKeyDown={this.addMessage.bind(this)} notifyName={this.notifyName.bind(this)} />
      </div>
    );
  }

}
export default App;
