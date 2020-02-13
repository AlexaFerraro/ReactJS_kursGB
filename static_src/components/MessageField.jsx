import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField, FloatingActionButton } from 'material-ui';
import CircularProgress from 'material-ui/CircularProgress';  
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import SendIcon from 'material-ui/svg-icons/content/send';
import Message from './Message';
import { sendMessage } from '../actions/messageActions';
import { loadChats } from '../actions/chatActions';
import { messageRemove } from '../actions/removeActions';
import '../styles/styles.css';

class MessageField extends React.Component {

  static propTypes = {
    chatId:      PropTypes.number.isRequired,
    messages:    PropTypes.object.isRequired,
    chats:       PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    messageRemove: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    removed: PropTypes.arrayOf(PropTypes.number).isRequired,
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
    const messageId = this.getNewId(99999);
    if (this.state.input.length > 0 || sender === 'bot') {
      this.props.sendMessage(messageId, message, sender, chatId);
    }
    if (sender === 'me') {
      this.setState({ input: '' });
    }
  };

  getNewId = (max) => {
    const messageId = Math.floor(Math.random() * Math.floor(max));
    const messages = Object.keys(this.props.messages);
    if (messages.indexOf(messageId) == -1) {
      return messageId;
    } else {
      this.getNewId(max);
    }
  }

  messageRemove = (messageId, chatId) => {
    this.props.messageRemove(messageId, chatId);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleKeyUp = (e) => {
    if (e.keyCode === 13) { 
      this.handleSendMessage(this.state.input, 'me', this.props.chatId);
    }
  };

  async componentDidMount() {
    await this.props.loadChats();
    this.textInput.current.focus();
  }

  render() {
    if (this.props.isLoading) {
      return <CircularProgress />
    }
    const { chatId, messages, chats, removed } = this.props;
    const messageElements = chats[chatId].messageList.map(messageId => (
      <Message
        key={ messageId }
        text={ messages[messageId].text }
        sender={ messages[messageId].sender }
        style={ removed.indexOf(Number(messageId)) >= 0 ? { className: 'hidden'} : {}}
        func={ <NavigationClose
          onClick={ () => this.messageRemove(messageId, chatId) }
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
  isLoading: chatReducer.isLoading,
  removed: messageReducer.removed,
});

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage, messageRemove, loadChats }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);