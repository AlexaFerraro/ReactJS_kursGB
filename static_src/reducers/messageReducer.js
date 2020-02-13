import update from 'react-addons-update';
import { SEND_MESSAGE } from '../actions/messageActions';
import { START_CHATS_LOADING, SUCCESS_CHATS_LOADING, ERROR_CHATS_LOADING } from '../actions/chatActions';
import { MESSAGE_REMOVE, START_CHAT_REMOVE, SUCCESS_CHAT_REMOVE, ERROR_CHAT_REMOVE } from '../actions/removeActions';

const initialStore = {
  messages: {},
  removed: [],
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
      const messages = store.messages;
      delete messages[action.messageId];
      return update(store, {
        messages: { $set: messages },
        removed: { $set: [...store.removed, action.messageId] }
      });
    }
    case START_CHAT_REMOVE: {
      return store;
    }
    case SUCCESS_CHAT_REMOVE: {
      const messages = store.messages;
      const messageList = action.payload.messageList;
      messageList.map(id => delete store.messages[id.id]);
      return update(store, {
        messages: { $set: messages }
      });
    }
    case ERROR_CHAT_REMOVE: {
      console.log('Error chat remove');
    }
    case START_CHATS_LOADING: {
      return update(store, {
        isLoading: { $set: true },
      });
    }
    case SUCCESS_CHATS_LOADING: {
      return update(store, {
        messages: { $set: action.payload.entities.messages },
      });
    }
    case ERROR_CHATS_LOADING: {
      return update(store, {
        isLoading: { $set: false },
      });
    }
    default:
      return store;
  }
}