import React, {Component} from 'react';

class ChatBar extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {value: this.props.currentUser.name};
  // }


  render() {
    // console.log("Rendering <ChatBar/>");
    // console.log(currentUser)
    return (
      <footer className="chatbar">
        <input className="chatbar-username" type="text" placeholder={this.props.currentUser.name} onKeyUp={this.props.onKeyUpName} onBlur={this.props.notifyName} />
        <input className="chatbar-message" type="text" placeholder="Type a message and hit ENTER" onKeyDown={this.props.onKeyDown} />
      </footer>
    );
  }
}
export default ChatBar;