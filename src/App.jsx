import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws://localhost:3001")
    this.state = {
                    currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
                    messages: [],
                    //   { id: 1,
                    //     username: "Bob",
                    //     content: "Has anyone seen my marbles?"
                    //   },
                    //   { id: 2,
                    //     username: "Anonymous",
                    //     content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
                    //   }
                    // ]
                    users: 0,
                    color: "black"
                  }
  }

  addName(event) {
    console.log("Name event fired.")
    // const oldName = this.state.currentUser.name
    // if (event.key === 'Enter') {
    // const newName = event.target.value
    // console.log("Name from 1st box: ", newName)
    // const newUser = {name: newName}
    // this.setState({currentUser: newUser})
    // }
    // if (event.key === 'Enter') {
    //   console.log("Enter key pressed on username box.")
    //   const newNotification = {type: "postNotification", content: `${oldName}-UserA has changed their name to ${newName}-UserB.`}
    //   this.socket.send(JSON.stringify(newNotification))
    // }
  }

  notifyName(event) {
    console.log("Blur event fired.")

    const oldName = this.state.currentUser.name
    const newName = event.target.value
    const newUser = {name: newName}
    this.setState({currentUser: newUser})
    const newNotification = {type: "postNotification", content: `'${oldName}' has changed their name to '${newName}'.`}
    this.socket.send(JSON.stringify(newNotification))
  }

  addMessage(event) {
    console.log("Add message event fired.")

    if (event.key === 'Enter') {
      console.log("Enter key pressed.")

      const newMessage = {type: "postMessage", username: this.state.currentUser.name, content: event.target.value, color: this.state.color}

      console.log("This.socket: ", this.socket)

      this.socket.send(JSON.stringify(newMessage))

      this.socket.onmessage = function(event) {
        const message = JSON.parse(event.data)

        switch(message.type) {
          case "incomingMessage":
            let messages = this.state.messages.concat(message)
            this.setState({messages: messages})
            break;
          case "incomingNotification":
            let messages2 = this.state.messages.concat(message)
            this.setState({messages: messages2})
            break;
          default:
            throw new Error("Unknown event type " + message.type);
        }

      }

      this.socket.onmessage = this.socket.onmessage.bind(this)

      event.target.value = ""
    }
  }

  componentDidMount() {
    // console.log("componentDidMount <App />");
    this.socket.onopen = function (event) {
      console.log("Connected to the server")
    }

    this.socket.onmessage = function(event) {
      const messages = JSON.parse(event.data)
      console.log("Incoming message: ", messages)
      if (messages.type === "userSize") {
        this.setState({users: messages.users})
      } else if (messages.type === "userColor") {
        console.log("User color: ", messages.color)
        this.setState({color: messages.color})
        console.log("State color: ", this.state.color)
      }
    }

    this.socket.onmessage = this.socket.onmessage.bind(this)

    setTimeout(() => {
      console.log("Simulating incoming message");

      // Add a new message to the list of messages in the data store
      const newMessage = {type: "incomingMessage", id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 1000);
  }

  render() {
    // console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="navbar-users">Users online: {this.state.users}</div>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} onKeyDown={this.addMessage.bind(this)} onKeyUpName={this.addName.bind(this)} notifyName={this.notifyName.bind(this)} />
      </div>
    )
  }


}
export default App;
