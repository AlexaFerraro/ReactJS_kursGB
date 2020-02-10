import update from 'react-addons-update';
import { SEND_MESSAGE } from '../actions/messageActions';
import { ADD_CHAT } from '../actions/chatActions';
import { ON_LIGHT, OFF_LIGHT } from '../actions/lightActions';
import { CHAT_REMOVE } from '../actions/removeActions';

const initialStore = {
  chats: {
    1: {title: 'Чат 1', messageList: [1]},
    2: {title: 'Чат 2', messageList: [2]},
    3: {title: 'Чат 3', messageList: []},
  },
  loadEffect: []
};

export default function chatReducer(store = initialStore, action) {
  switch (action.type) {
    case SEND_MESSAGE: {
      return update(store, {
        chats: { $merge: { 
          [action.chatId]: {
            title: store.chats[action.chatId].title,
            messageList: [...store.chats[action.chatId].messageList, action.messageId],
        } } }
      });
    }
    case ON_LIGHT: {
      const chatId = Number(action.chatId);
      return update(store, {
        loadEffect: { $set: [...store.loadEffect, chatId] }
      });
    }
    case OFF_LIGHT: {
      const chatId = Number(action.chatId);
      const loadEffect = [...store.loadEffect];
      delete loadEffect[loadEffect.indexOf(chatId)];
      return update(store, {
        loadEffect: { $set: loadEffect }
      });
    }
    case ADD_CHAT: {
      const chatId = Object.keys(store.chats).length + 1;
      return update(store, {
        chats: { $merge: {
          [chatId]: {
            title: action.title, messageList: []
        } } },
      });
    }
    case CHAT_REMOVE: {
      const chatId = Number(action.chatId);
      return update(store, {
        chats: { $set: {
          [chatId]: {} 
        } },
      });
    }
    default:
      return store;
  }
}