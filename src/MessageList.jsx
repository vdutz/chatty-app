import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    let messages = this.props.messages;
    let messageItems = messages.map((message) =>
      <Message url={message.url} color={message.color} type={message.type} username={message.username} content={message.content} key={message.id} />
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