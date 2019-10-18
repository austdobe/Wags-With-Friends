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

  const handleMsgSubmit = function (event) {
    console.log('works');
    event.preventDefault();
    const messageSent = {
      message: $('#messagePost').val().trim(),
      userId: $('#messagePost').data('reciver'),
      senderId: $('#messagePost').data('sender')
    };

    messageAPI.saveMessage(messageSent);
  };

  $submitBTN.on('click', handleMsgSubmit);