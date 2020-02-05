import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MessageField from './MessageField';
import ChatList from './ChatList';
import Header from './Header';
import { sendMessage } from '../actions/messageActions';

class Layout extends React.Component {

  static propTypes = {
    chatId: PropTypes.number
  };

  static defaultProps = {
    chatId: 1
  };

  render() {
    return (
      <div className="background-field">
        <Header chatId={ this.props.chatId } />
        <div className="body-block">
          <ChatList/>
          <MessageField
            chatId={ this.props.chatId }
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);