import React from 'react';
import PropTypes from 'prop-types';
import Chat from './Chat';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper'
import ContentSend from 'material-ui/svg-icons/content/send';


export default class ChatList extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.state;
    this.chatNumber = Object.keys(this.state.chats).length;
  }

  static propTypes = {
    chatId: PropTypes.number.isRequired,
  };

  getChat() {
    const { chats} = this.state;
    this.chatNumber++;

    this.setState({
      chats: {
      ...chats, [this.chatNumber]: {title: "Чат " + this.chatNumber, messageList: []}}
    });

    const keys = Object.keys(this.state.chats);
    const params = {
      path: "/chat/" + this.chatNumber + "/",
      title: "Chat " + this.chatNumber
    }

    return this.chatElements = <Chat
        key={ keys }
        path={ params.path }
        title={ params.title }
      />;
  }

  componentDidUpdate(prevProps, prevState) {
    const { chats } = this.state;
    if (Object.keys(prevState.chats).length < Object.keys(chats).length) {
      console.log(chats);
    }
  }

  render() {

    return <div className="chatlist-field">
        <Paper className="paper">
          <List>
            <Link to="/chat/1/">
              <ListItem primaryText="Chat 1" leftIcon={< ContentSend />}/>
            </Link>
            <Link to="/chat/2/">
              <ListItem primaryText="Chat 2" leftIcon={< ContentSend />}/>
            </Link>
            <Link to="/chat/3/">
              <ListItem primaryText="Chat 3" leftIcon={< ContentSend />}/>
            </Link>
            { this.chatElements }
            <input type="submit" value="Add new Chat" onClick={ () => this.getChat() }/>
          </List>
        </Paper>
    </div>
  }
}