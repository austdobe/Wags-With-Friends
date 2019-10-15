// Get references to page elements
const $searchCriteria = $('#example-text');
const $submitBtn = $('#submit');
const $exampleList = $('#example-list');
// *TODO:
// Paola
const $zipCodeList = $('#example-list');
// *TODO:
// The API object contains methods for each kind of request we'll make
const API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        'Content-Type': 'application/json'
      },
      type: 'POST',
      url: 'api/examples',
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: 'api/examples',
      type: 'GET'
    });
  },
  // *TODO:
  // Paola
  getZipCode: function () {
    return $.ajax({
      url: 'api/zipCode',
      type: 'GET'
    });
  },
  // Paola
  // *TODO:
  deleteExample: function (id) {
    return $.ajax({
      url: 'api/examples/' + id,
      type: 'DELETE'
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
const refreshExamples = function () {
  API.getExamples().then(function (data) {
    const $examples = data.map(function (search) {
      const $a = $('<a>')
        .text(search.criteria)
        .attr('href', '/example/' + search.id);

      const $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': search.id
        })
        .append($a);

      const $button = $('<button>')
        .addClass('btn btn-danger float-right delete')
        .text('ｘ');

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
  // *TODO:
  // Paola
  API.getZipCode().then(function (data) {
    const $zipCodes = data.map(function (zipCode) {
      const $a = $('<a>')
        .text(zipCode.text)
        .attr('href', '/zipCode/' + zipCode.id);

      const $li = $('<li>')
        .attr({
          class: 'list-group-item',
          'data-id': zipCode.id
        })
        .append($a);

      const $button = $('<button>')
        .addClass('btn btn-danger float-right')
        .text('Message');

      $li.append($button);

      return $li;
    });

    $zipCodeList.empty();
    $zipCodeList.append($zipCodes);
  });
  // Paola
  // *TODO:
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
const handleFormSubmit = function (event) {
  event.preventDefault();

  const search = {
    criteria: $searchCriteria.val().trim()
  };

  if (!(search.criteria)) {
    alert('You must enter an example text and description!');
    return;
  }

  API.saveExample(search).then(function () {
    refreshExamples();
  });

  $searchCriteria.val('');
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
const handleDeleteBtnClick = function () {
  const idToDelete = $(this).parent().attr('data-id');

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on('click', handleFormSubmit);
$exampleList.on('click', '.delete', handleDeleteBtnClick);
