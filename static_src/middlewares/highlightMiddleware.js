import { SEND_MESSAGE } from '../actions/messageActions';
import { onLightChat, offLightChat } from '../actions/lightActions';

export default store => next => (action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      if (action.sender !== 'me') {
        store.dispatch(onLightChat(action.chatId));
        setTimeout(() => 
          store.dispatch(offLightChat(action.chatId)),
        500);
      }
  }
  return next(action)
}