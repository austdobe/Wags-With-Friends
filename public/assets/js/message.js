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
