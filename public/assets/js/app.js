$('#delete-user').on('click', function (event) {
  event.preventDefault();
  $('#err-msg').empty('');
  $('#delete-user-modal').modal('show');
});

$('#confirm-delete').on('click', function (event) {
  event.preventDefault();

  const id = $(this).data('id');

  const deleteUser = {
    email: $('#userEmail').val().trim(),
    password: $('#userPassword').val().trim()
  };

  if (deleteUser.email.length > 0 && deleteUser.password.length > 0) {
    $.ajax({
      type: 'POST',
      url: '/api/user/confirm',
      data: deleteUser
    }).then((result) => {
      if (result) {
        $.ajax(`/api/user/${id}`, {
          type: 'DELETE'
        }).then(() => {
          console.log('Deleted user', deleteUser);
          // Reload the page to get the updated list
          window.location.href = '/logout';
        });
      } else {
        $('#err-msg').empty('').text('Wrong credentials!');
      }
    });
  } else {
    console.log('fill out entire form');
    $('#err-msg').empty('').text('fill out entire form');
  }
});

$('#register').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/register';
});

$('#login-modal, #login-modal2').on('click', function (event) {
  event.preventDefault();
  $('#user-info').show();
});

$('#go-home').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/';
});

$('#login').on('click', function (event) {
  event.preventDefault();

  const user = {
    email: $('#email').val().trim(),
    password: $('#user_password').val().trim()
  };

  $.post('/api/login', user, (result) => {
    // console.log(result);
    if (result.loggedIn) {
      $(document.location).attr('href', '/dashboard');
    } else {
      $('#login-err-msg').empty('').text(result.error);
      $('#user-info').modal('hide');
    }
  });
});

$(document).ready(function () {
  //  Trianglify Background
  const bg = {
    setBg: function () {
      // Trianglify is a CDN and is coming back undefined in ESLint
      // eslint-disable-next-line no-undef
      const pattern = Trianglify({
        width: window.innerWidth,
        height: window.innerHeight,
        cell_size: 70,
        variance: '0.95',
        x_colors: ['#718AFF', '#A0F3FF', '#12ABF5', '#5450EB']
      });
      pattern.canvas(document.getElementById('canvas-basic'));
    }
  };

  bg.setBg();

  $(window).resize(function () {
    bg.setBg();
  });

  $('#user-edit').on('click', function () {
    event.preventDefault();
    $('#user-form-cont').attr('class', '');
    $(this).parent().parent().hide();
  });

  $('#cancel-edit').on('click', function () {
    $('#user-form-cont').addClass('hidden');
    $('#user-profile').show();
  });

  const registrationForm = $('#create-form');
  const updateForm = $('#user-form');

  const getValues = () => {
    const values = {
      firstName: $('#inputFirst').val().trim(),
      lastName: $('#inputLast').val().trim(),
      email: $('#inputEmail').val().trim(),
      password: $('#inputPassword').val().trim(),
      street: $('#street').val().trim(),
      city: $('#city').val().trim(),
      state: $('#state').val().trim(),
      zipcode: $('#zipCode').val().trim(),
      petName: $('#petName').val().trim(),
      pet: $('#petType').val().trim(),
      petAge: $('#petAge').val().trim()
    };
    return values;
  };

  const rules = {
    rules: {
      inputFirst: {
        required: true,
        minlength: 3
      },
      inputLast: {
        required: true,
        min: 3
      },
      inputEmail: {
        required: true,
        email: true
      },
      inputPassword: {
        required: true,
        min: 3
      },
      street: {
        required: true,
        min: 3
      },
      city: {
        required: true
      },
      state: {
        required: true
      },
      zipCode: {
        digits: true
      },
      petName: {
        required: true
      },
      petType: {
        required: true
      },
      petAge: {
        required: true,
        min: 3
      }
    }
  };

  $('#add-user').on('click', function (event) {
    event.preventDefault();
    registrationForm.validate(rules);
    if (registrationForm.valid()) {
      const newAccount = getValues();

      $.ajax({
        type: 'POST',
        url: '/api/register',
        data: newAccount
      }).then(() => {
        window.location.href = '/';
      });
    } else {
      console.log('**Please fill out entire form**');
      $('#create-err-msg').empty('').text('**Please fill out entire form**');
    }
  });

  $('#update-user').on('click', function (event) {
    event.preventDefault();
    updateForm.validate(rules);
    if (updateForm.valid()) {
      const id = $(this).data('id');
      // capture All changes
      const changeUser = getValues();

      $('#err-msg').empty('');
      // $('#change-user-modal').modal('show');
      console.log(changeUser);

      $.ajax({
        type: 'PUT',
        url: `/api/user/${id}`,
        data: changeUser
      }).then((result) => {
        console.log('Updated user:', result);
        // Reload the page to get the updated list
        window.location.href = '/logout';
      });
    } else {
      console.log('**Please fill out entire form**');
      $('#update-err-msg').empty('').text('**Please fill out entire form**');
    }
  });
});
