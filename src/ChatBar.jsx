import React, {Component} from 'react';

class ChatBar extends Component {

  render() {
    // console.log("Rendering <ChatBar/>");
    // console.log(currentUser)
    return (
      <footer className="chatbar">
        <input className="chatbar-username" type="text" placeholder={this.props.currentUser.name} onBlur={this.props.notifyName} />
        <input className="chatbar-message" type="text" placeholder="Type a message and hit ENTER" onKeyDown={this.props.onKeyDown} />
      </footer>
    );
  }
}
export default ChatBar;