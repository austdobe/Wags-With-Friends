<<<<<<< HEAD

$(document).ready(() => {
  // Connect to the socket.io server
  const socket = io.connect();
});
=======
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
io.on('connection', (socket) => {
  console.log('New user connected');
});

const chat = function () {
// make connection
  const socket = io.connect('http://localhost:3333');

  // buttons and inputs
  // const username = $('#username');
  const feedback = $('#feedback');
  const message = $('#message');
  const sendMessage = $('#send_message');
  const chatArea = $('#chatArea');

  // Emit message
  sendMessage.click(function () {
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

module.exports = chat;
>>>>>>> b24f0eab5f2956d0f38cffd39e5b6d1ffe7b4292
