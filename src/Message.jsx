import React, {Component} from 'react';
import ReactDOM from 'react-dom'

class Message extends Component {

  componentDidMount() {
    // Scrolls to the bottom of the message thread when a new message is posted
    console.log("Message component did mount fired.");
    var node = ReactDOM.findDOMNode(this);
    node.scrollIntoView();
  }

  render() {
    let colorStyle = {color:this.props.color};
    let image;
    if (this.props.url === "/") {
      image = <span>{undefined}</span>
    } else {
      image = <img className="message-image" src={this.props.url} />
    }
    switch(this.props.type) {
      case "incomingMessage":
        return (
          <div className="message">
            <span className="message-username" style={colorStyle}>{this.props.username}</span>
            <span className="message-content">{this.props.content}{image}</span>
          </div>
        );
        break;
      case "incomingNotification":
        return (
          <div className="message system">
            {this.props.content}
          </div>
        );
        break;
      default:
        throw new Error("Unknown event type " + this.props.type);
    }
  }
}
export default Message;