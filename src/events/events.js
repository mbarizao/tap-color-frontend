import emitter from '.';

export const showAlert = (title, message, onClick = null) => {
  emitter.emit('alert', {
    visible: true,
    title,
    message,
    onClick,
  });
};

export const hideAlert = () => {
  emitter.emit('alert', {
    visible: false,
  });
};
