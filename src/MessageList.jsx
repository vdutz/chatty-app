import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    // console.log("Rendering <MessageList/>");
    const messages = this.props.messages
    const messageItems = messages.map((message) =>
      <Message color={message.color} type={message.type} username={message.username} content={message.content} key={message.id} />
    );
    return (
      <div>
        <main className="messages">
          {messageItems}
        </main>
      </div>
    );
  }
}

export default MessageList;