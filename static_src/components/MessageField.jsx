import React from 'react';
import PropTypes from 'prop-types';
import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';
import Message from './Message';
import '../styles/styles.css';

export default class MessageField extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.state;
    this.textInput = React.createRef();
  }
  static propTypes = {
    chatId: PropTypes.number.isRequired,
  };

  style = {
    margin: '0px',
    fontSize: '22px',
    width: '100%'
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.sendMessage(this.state.input, 'me')
    }
  };

  sendMessage = (message, sender) => {
    const { messages, chats, input } = this.state;
    const { chatId } = this.props;

    if (input.length > 0 || sender === 'bot') {
      const messageId = Object.keys(messages).length + 1;
      this.setState({
        messages: {...messages,
          [messageId]: {text: message, sender: sender}},
        chats: {...chats,
          [chatId]: { ...chats[chatId],
            messageList: [...chats[chatId]['messageList'], messageId]
          }
        },
      })
    }
    if (sender === 'me') {
      this.setState({ input: '' })
    }
  };

  componentDidMount() {
    this.textInput.current.focus();
  }

  componentDidUpdate(prevProps, prevState) {
    const { messages } = this.state;
    if (Object.keys(prevState.messages).length < Object.keys(messages).length &&
      Object.values(messages)[Object.values(messages).length - 1].sender !== 'bot' ) {
        setTimeout(() =>
          this.sendMessage('Не приставай ко мне, я робот!', 'bot'), 1000);
    }
  }

  render() {
    const { messages, chats } = this.state;
    const { chatId } = this.props;

    const messageElements = chats[chatId].messageList.map((messageId, index) => (
      <Message
        key={ index }
        text={ messages[messageId].text }
        sender={ messages[messageId].sender }
      />));

      return  <div className="layout">
                <div className="message-field" >
                  { messageElements }
                </div>
                <div style={ { width: '95%', display: 'flex' } }>
                  <TextField  style={ this.style }
                            fullWidth={ true }
                            name="input"
                            hintText="Введите сообщение"
                            ref={ this.textInput }
                            onChange={ this.handleChange }
                            value={ this.state.input }
                            onKeyUp={ this.handleKeyUp } />
                  <FloatingActionButton onClick={ () => this.sendMessage(this.state.input, 'me') }>
                    <SendIcon/>
                  </FloatingActionButton>
                </div>
              </div>
  }
}
