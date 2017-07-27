import React, {Component} from 'react';

class Message extends Component {
  render() {
    // console.log("Rendering <Message/>");
    let colorStyle = {color:this.props.color}
    switch(this.props.type) {
      case "incomingMessage":
        return (
          <div className="message">
            <span className="message-username" style={colorStyle}>{this.props.username}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
        );
        break;
      case "incomingNotification":
        return (
          <div className="message system">
            {this.props.content}.
          </div>
        );
        break;
      default:
        throw new Error("Unknown event type " + this.props.type)
    }
  }
}
export default Message;