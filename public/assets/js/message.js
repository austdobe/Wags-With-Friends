  const messageAPI = {
    saveMessage: function (message) {
      return $.ajax({
        headers: {
          'Content-Type': 'application/json'
        },
        type: 'POST',
        url: 'api/messages',
        data: JSON.stringify(message)
      });
    },
    getMessage: function () {
      return $.ajax({
        url: 'api/messages',
        type: 'GET'
      });
    },
    deleteMessage: function (id) {
      return $.ajax({
        url: 'api/messages' + id,
        type: 'DELETE'
      });
    }
  };

  const $submitBTN = $('#submit');

<<<<<<< HEAD
// identifiers need # or .
$('submitMsg').on('click', function (event) {
  event.preventDefault();
=======
  const handleMsgSubmit = function (event) {
    console.log('works');
    event.preventDefault();
    const messageSent = {
      message: $('#messagePost').val().trim(),
      userId: $('#messagePost').data('reciver'),
      senderId: $('#messagePost').data('sender')
    };
>>>>>>> 035771194f96d4c13ed87f41c04ce2c35fd0102d

    messageAPI.saveMessage(messageSent);
  };

<<<<<<< HEAD
  messageAPI.saveMessage(message);
});

$(document).on('click', '.message', function () {
  const recipient = $(this).data('recipient-id');
  $('#message-submit').attr('data-recipient-id', recipient);
  console.log('hello');
});
=======
  $submitBTN.on('click', handleMsgSubmit);
>>>>>>> 035771194f96d4c13ed87f41c04ce2c35fd0102d
