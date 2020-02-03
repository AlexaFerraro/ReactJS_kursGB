import React from 'react';
import PropTypes from "prop-types";
import MessageField from './MessageField';
import ChatList from './ChatList';
import Header from './Header';

export default class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state =
    {
      chats: {
        1: {title: 'Чат 1', messageList: [1]},
        2: {title: 'Чат 2', messageList: [2]},
        3: {title: 'Чат 3', messageList: []},
      },
      messages: {
        1: { text: "Привет!", sender: 'bot' },
        2: { text: "Здравствуйте!", sender: 'bot' },
      },
      input: ''
    };
  }

  static propTypes = {
    chatId: PropTypes.number,
  };

  static defaultProps = {
    chatId: 1,
  };

  render() {
    return <div className="background-field">
      <Header chatId={ this.props.chatId }/>
        <div className="body-block">
          <ChatList state={ this.state } chatId={ this.props.chatId }/>
          <MessageField chatId={ this.props.chatId } state={ this.state }/>
        </div>
    </div>
  }
}

