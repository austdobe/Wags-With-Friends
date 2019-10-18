const $submitBTN = $('#submit');

const handleMsgSubmit = function (event) {
  console.log('works');
  event.preventDefault();
  const messageSent = {
    message: $('#messagePost').val().trim(),
    userId: $('#messagePost').data('reciver'),
    senderId: $('#messagePost').data('sender')
  };

  $.ajax({
    type: 'POST',
    url: '/api/messages',
    data: messageSent
  });
};

$submitBTN.on('click', handleMsgSubmit);
