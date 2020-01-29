import React from 'react';
import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';
import Message from './Message';
import '../styles/styles.css';

export default class MessageField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [{ text: 'Привет', author: 'bot' }, { text: 'Как дела?', author: 'bot' }],
      input: ''
    };
    this.textInput = React.createRef();
    
    this.handleClick = this.handleClick.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  style = {
    margin: '0px',
    fontSize: '22px',
    width: '100%'
  }

  handleClick = (message) => {
    this.sendMessage(message);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleKeyUp = (e, message) => {
    if (e.keyCode === 13) {
      this.sendMessage(message);
    }
  };

  sendMessage = (message) => {
    this.setState({ 
      messages: [ ...this.state.messages, {text: message, author: 'me'} ],
      input: ''
    });
  };

  componentDidMount() {
    this.textInput.current.focus();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.messages !==  this.state.messages) {
      if (this.state.messages[this.state.messages.length - 1].author !== 'bot' ) {
        setTimeout(() =>
          this.setState(
            { messages: [ ...this.state.messages, {text:'Не приставай ко мне, я робот!', author: 'bot'} ] }),
          1000);
      }
    }
  }

  render() {
    const messageElements = this.state.messages.map((messages, index) => (
      <Message key={ index } text={ messages.text } author={ messages.author }/>));

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
                            onKeyUp={ (e) => this.handleKeyUp(e, this.state.input) } />
                  <FloatingActionButton onClick={ () => this.handleClick(this.state.input) }>
                    <SendIcon/>
                  </FloatingActionButton>
                </div>
              </div>
  }
}
