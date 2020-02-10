import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField, FloatingActionButton } from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import SendIcon from 'material-ui/svg-icons/content/send';
import Message from './Message';
import { sendMessage } from '../actions/messageActions';
import { messageRemove } from '../actions/removeActions';
import '../styles/styles.css';

class MessageField extends React.Component {

  static propTypes = {
    chatId:      PropTypes.number.isRequired,
    messages:    PropTypes.object.isRequired,
    chats:       PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    messageRemove: PropTypes.func.isRequired,
  };

  state = {
    input: '',
  };

  textInput = React.createRef();

  style = {
    margin: '0px',
    fontSize: '22px',
    width: '100%'
  }

  handleSendMessage = (message, sender, chatId) => {
    const messageId = Object.keys(this.props.messages).length + 1;
    if (this.state.input.length > 0 || sender === 'bot') {
      this.props.sendMessage(messageId, message, sender, chatId);
    }
    if (sender === 'me') {
      this.setState({ input: '' });
    }
  };

  messageRemove = (messageId) => {
    //this.props.messageRemove(messageId);
    console.log('remove '+ messageId);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleKeyUp = (e) => {
    if (e.keyCode === 13) { 
      this.handleSendMessage(this.state.input, 'me', this.props.chatId);
    }
  };

  componentDidMount() {
    this.textInput.current.focus();
  }

  render() {
    const { chatId, messages, chats } = this.props;
    const messageElements = chats[chatId].messageList.map(messageId => (
      <Message
        key={ messageId }
        text={ messages[messageId].text }
        sender={ messages[messageId].sender }
        func={ <NavigationClose
          onClick={ () => this.messageRemove(messageId) }
        /> }
      />
    ));

      return  <div className="layout">
                <div className="message-field" >
                  { messageElements }
                </div>
                <div style={ { width: '95%', display: 'flex' } }>
                  <TextField  
                    style={ this.style }
                    fullWidth={ true }
                    name="input"
                    hintText="Введите сообщение"
                    ref={ this.textInput }
                    onChange={ this.handleChange }
                    value={ this.state.input }
                    onKeyUp={ this.handleKeyUp }
                  />
                  <FloatingActionButton onClick={ () => this.handleSendMessage(this.state.input, 'me') }>
                    <SendIcon/>
                  </FloatingActionButton>
                </div>
              </div>
  }
}

const mapStateToProps = ({ chatReducer, messageReducer }) => ({
  chats: chatReducer.chats,
  messages: messageReducer.messages, 
  messageRemove: messageReducer.messageRemove,
});

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage, messageRemove }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);