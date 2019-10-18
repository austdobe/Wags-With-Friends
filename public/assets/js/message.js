const messageButtonHandler = function (event) {
  const recipient = $(this).data('recipient-id');
  $('#message-submit').attr('data-recipient-id', recipient);
};

const messageSubmitHandler = function (event) {
  event.preventDefault();
  const recipient = $(this).data('recipient-id');
  const sender = $(this).data('sender-id');
  const message = $('#message-text').val().trim();
  const senderName = $(this).data('sender-name');

  const messageObj = {
    message: message,
    userId: recipient,
    senderId: sender,
    senderName: senderName
  };

  $.ajax({
    type: 'POST',
    url: '/api/messages',
    data: messageObj
  });
};

const messageDeleteHandler = function (event) {
  event.preventDefault();

  const messageId = $(this).data('message-id');
  $.ajax({
    type: 'DELETE',
    url: '/api/messages/' + messageId
  });
  location.reload();
};

$(document).on('click', '.message', messageButtonHandler);
$(document).on('click', '#message-submit', messageSubmitHandler);
$(document).on('click', '.delete-message', messageDeleteHandler);
