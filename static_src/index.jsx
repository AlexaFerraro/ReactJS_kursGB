import React from 'react';
import ReactDOM from 'react-dom';

const messages = ['Привет', 'Как дела?'];

const addMessage = () => {
  messages.push('Отлично!');
  ReactDOM.render(
    <MessageField messages = { messages } />,
    document.getElementById('root')
  );
}

const Message = (props) => <div>{props.text}</div>;

const MessageField = (props) => <div>
  <h1>Кажется мы начали писать чат на React</h1>
  { props.messages.map(message => <Message text = { message } />) }
  <button onClick={addMessage}>Ответить</button>
</div>

ReactDOM.render(
  <MessageField messages = { messages } />,
  document.getElementById('root'),
);