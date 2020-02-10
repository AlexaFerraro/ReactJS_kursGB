export const CHAT_REMOVE = '@@chat/CHAT_REMOVE';

export const chatRemove = (chatId) => ({
  type: CHAT_REMOVE,
  chatId,
});

export const MESSAGE_REMOVE = '@@message/MESSAGE_REMOVE';

export const messageRemove = (messageId) => ({
  type: MESSAGE_REMOVE,
  messageId,
});