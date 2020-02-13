import { RSAA, getJSON } from 'redux-api-middleware';

export const START_CHAT_REMOVE = '@@chat/START_CHAT_REMOVE';
export const SUCCESS_CHAT_REMOVE = '@@chat/SUCCESS_CHAT_REMOVE';
export const ERROR_CHAT_REMOVE = '@@chat/ERROR_CHAT_REMOVE';

export const chatRemove = (chatId) => ({
  [RSAA]: {
    endpoint: '/api/chats.json',
    method: 'GET',
    types: [
      START_CHAT_REMOVE,
      {
        type: SUCCESS_CHAT_REMOVE,
        payload: (action, state, res) => getJSON(res).then(
          json => json[chatId-1]
        ),
      },
      ERROR_CHAT_REMOVE,
    ],
  },
});

export const MESSAGE_REMOVE = '@@message/MESSAGE_REMOVE';

export const messageRemove = (messageId, chatId) => ({
  type: MESSAGE_REMOVE,
  messageId,
  chatId,
});