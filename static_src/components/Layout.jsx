import React from 'react';
import MessageField from './MessageField';
import ChatList from './ChatList';
import Header from './Header';

export default class Layout extends React.Component {

  render() {
    return <div className="background-field">
        <Header/>
      <div className="body-block">
        <ChatList/>
        <MessageField/>
      </div>
    </div>
  }
}

