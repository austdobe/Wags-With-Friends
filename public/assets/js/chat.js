ocket.on('typing', (data) => {
    feedback.html('<p><i>' + data.username + ' is typing a message...' + '</i></p>');
  });
};
<<<<<<< HEAD
  const feedback = $('#feedback')
=======
  const feedback = $("#feedback");
>>>>>>> 5cde7cfa4c56bdc3b67490264c25c1a1c1b77237
  const message = $('#message');
  const send_message = $('#send_message');
  const chatArea = $('#chatArea');

  // Emit message
  send_message.click(function () {
    socket.emit('new_message', { message: message.val() });
  });

  // Listen on new_message
  socket.on('new_message', (data) => {
    message.val('');
    chatArea.append('<p class="message">' + data.username + ':' + data.message + '</p>');
  });

  // Emit typing
  message.bind('keypress', () => {
    socket.emit('typing');
  });

  // Listen on typing
  socket.on('typing', (data) => {
    feedback.html('<p><i>' + data.username + ' is typing a message...' + '</i></p>');
  });
};
