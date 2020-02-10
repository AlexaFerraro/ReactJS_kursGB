import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { List, ListItem } from 'material-ui/List';
import { TextField } from 'material-ui';
import Paper from 'material-ui/Paper'
import ContentSend from 'material-ui/svg-icons/content/send';
import AddIcon from 'material-ui/svg-icons/content/add';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { addChat } from '../actions/chatActions';
import { chatRemove } from '../actions/removeActions';

class ChatList extends React.Component {

  static propTypes = {
    chats: PropTypes.object.isRequired,
    addChat: PropTypes.func.isRequired,
    chatRemove: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    loadEffect: PropTypes.arrayOf(PropTypes.number).isRequired,
  };

  state = {
    input: '',
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      this.handleAddChat();
    }
  };

  handleAddChat = () => {
    if (this.state.input.length > 0) {
      this.props.addChat(this.state.input);
      this.setState({ input: '' });
    }
  };

  chatRemove = (chatId) => {
    //this.props.chatRemove(chatId);
    console.log('remove '+ chatId);
  }

  handleNavigate = (link) => {
    this.props.push(link);
  };

  render() {
    const { chats, loadEffect } = this.props;
    const chatElements = Object.keys(chats).map(chatId => (
      <ListItem
        style={ loadEffect.indexOf(Number(chatId)) >= 0 ? { backgroundColor: 'lightblue' } : {} }
        key={ chatId }
        primaryText={ chats[chatId].title }
        leftIcon={ <ContentSend /> } 
        rightIcon={ <NavigationClose 
          onClick={ () => this.chatRemove(chatId) }
        /> }
        onClick={ () => this.handleNavigate(`/chat/${chatId}`) }
      />
    ));

    return <div className="chatlist-field">
        <Paper className="paper">
          <List>
            { chatElements }
            <ListItem
              key="Add new chat"
              leftIcon={ <AddIcon /> }
              onClick={ this.handleAddChat }
              style={ { height: '60px' } }
              children= {
                <TextField
                  key="textField"
                  fullWidth
                  name="input"
                  hintText="Добавить новый чат"
                  onChange={ this.handleChange }
                  value={ this.state.input }
                  onKeyUp={ this.handleKeyUp }
                />}
              />
          </List>
        </Paper>
    </div>
  }
}

const mapStateToProps = ({ chatReducer }) => ({
  chats: chatReducer.chats,
  loadEffect: chatReducer.loadEffect,
  chatRemove: chatReducer.chatRemove,
});

const mapDispatchToProps = dispatch => bindActionCreators({ addChat, push, chatRemove }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);