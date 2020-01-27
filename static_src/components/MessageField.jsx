import React from 'react';
import Message from './Message';

export default class MessageField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      athtor: ['Akira']
    };
    
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  onChange(e) {
    this.val = e.target.value;
  }

  handleClick = (e) => {
    this.setState({ messages: [ ...this.state.messages, this.val + " (" + this.state.athtor + ")" ] });
    this.state.data = [ ...this.state.messages, this.val ];
  };

  componentDidUpdate() {
    if (this.state.data.length === this.state.messages.length) {
      setTimeout(() =>
        this.setState(
          { messages: [ ...this.state.messages, this.state.athtor + ', не приставай ко мне, я робот!' ] }),
        1000);
    }
  }

  render() {
    const messageElements = this.state.messages.map((text, index) => (
      <Message key={ index } text={ text } />));
  
      return <div>
        { messageElements }
        <p>
          <label>Сообщение:</label><br />
          <input type="text" onChange={ this.onChange } />
          <button type="submit" onClick={ this.handleClick }>Отправить сообщение</button>
        </p>
        </div>
  }


  // state = {
  //   messages: ['Привет!', 'Как дела?'],
  //   me: 'Me'
  // };

  // handleClick = () => {
  //   this.setState({ messages: [ ...this.state.messages, 'Нормально' ] });
  //   this.state.data = [ ...this.state.messages, 'Нормально' ];
  // };

  // componentDidUpdate() {
  //   if (this.state.data.length === this.state.messages.length) {
  //     setTimeout(() =>
  //       this.setState(
  //         { messages: [ ...this.state.messages, 'Не приставай ко мне, я робот!' ] }),
  //       1000);
  //   }
  // }

  // render() {
  //   const messageElements = this.state.messages.map((text, index) => (
  //     <Message key={ index } text={ text } />));

  //     return <div>
  //       { messageElements }
  //       <button onClick={ this.handleClick }>Отправить сообщение</button>
  //     </div>
  // }
}
