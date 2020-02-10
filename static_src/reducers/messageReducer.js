import update from 'react-addons-update';
import { SEND_MESSAGE } from '../actions/messageActions';
import { MESSAGE_REMOVE, CHAT_REMOVE } from '../actions/removeActions';

const initialStore = {
  messages: {
    1: { text: 'Привет!', sender: 'bot' },
    2: { text: 'Здравствуйте!', sender: 'bot' },
  },
};

export default function messageReducer(store = initialStore, action) {
  switch (action.type) {
    case SEND_MESSAGE: {
      return update(store, {
        messages: { $merge: {
          [action.messageId]: {
            text: action.text,
            sender: action.sender,
        } } },
      });
    }
    case MESSAGE_REMOVE: {
      const messageId = Number(action.messageId);
      return update(store, {
        messages: { $set: {
          [messageId]: {} 
        } },
      });
    }
    case CHAT_REMOVE: {
      const chatId = Number(action.chatId);
      return update(store, {
        messages: { $set: {
          [chatId]: {} 
        } },
      });
    }
    default:
      return store;
  }
}