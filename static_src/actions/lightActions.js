export const ON_LIGHT = '@@chat/ON_LIGHT';

export const onLightChat = (chatId) => ({
  type: ON_LIGHT,
  chatId,
});

export const OFF_LIGHT = '@@chat/OFF_LIGHT';

export const offLightChat = (chatId) => ({
  type: OFF_LIGHT,
  chatId,
});