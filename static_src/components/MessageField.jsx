import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';
import Message from './Message';
import { sendMessage } from '../actions/messageActions';
import '../styles/styles.css';

class MessageField extends React.Component {

  static propTypes = {
    chatId:      PropTypes.number.isRequired,
    messages:    PropTypes.object.isRequired,
    chats:       PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
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

  componentDidUpdate(prevProps, prevState) {
    const { messages, chatId } = this.props;
    if (Object.keys(prevProps.messages).length < Object.keys(messages).length &&
        Object.values(messages)[Object.values(messages).length - 1].sender === 'me') {
          setTimeout(() =>
            this.handleSendMessage('Не приставай ко мне, я робот!', 'bot', chatId),
              1000);
    }
  }

  render() {
    const { chatId, messages, chats } = this.props;
    const messageElements = chats[chatId].messageList.map(messageId => (
      <Message
        key={ messageId }
        text={ messages[messageId].text }
        sender={ messages[messageId].sender }
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

const mapStateToProps = ({ chatReducer }) => ({
  chats: chatReducer.chats,
  messages: chatReducer.messages, 
});

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);