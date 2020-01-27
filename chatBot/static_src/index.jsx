import React from 'react';
import ReactDOM from 'react-dom';

const messages = [];

const chatBot = {
  athtor: 'bot',
  text: [
          'Привет!', 
          'Все отлично! Спасибо', 
          'Я не знаю что вам ответить'
        ]
};
   
class Item extends React.Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}
       
class ItemsList extends React.Component {
  render() {
    return(
      <div>
        {
          this.props.data.text.map(function(text){
          return <Item key={text} name={text} />
          })
        }
        <p>{this.props.data.athtor}</p>
      </div>
    );
  }
}

const Message = (props) => <div>{props.text}</div>;

const MessageField = (props) => <div>
  { props.messages.map(message => <Message text = { message } />) }
</div>

// ReactDOM.render(
//   <ItemsList data={chatBot} />,
//   document.getElementById('root')
// )

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: ''};

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }
  onChange(e) {
    var val = e.target.value;
    this.setState({message: val});
  }

  handleSubmit(e) {
    e.preventDefault();
    messages.push(this.state.message);
  }

  componentDidUpdate(prevState){
    if (prevState.messages !== this.state.message) {
      console.log(messages);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div><MessageField messages = { messages } /></div>
        <p>
          <label>Сообщение:</label><br />
          <input type="text" value={this.state.name} onClick={this.onChange}/>
        </p>
        <input type="submit" value="Отправить" />
      </form>
    );
  }
}

ReactDOM.render(
  <UserForm />,
  document.getElementById('root')
)

// ReactDOM.render(
//   <MessageField messages = { messages } />,
//   document.getElementById('root')
// )