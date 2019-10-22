const router = require('express').Router();
const helpers = require('./../config/handlebars');

module.exports = (db) => {
  // Load register page
  router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      res.render('register');
    }
  });

  // Load profile page
  router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id
        }
      }).then(() => {
        const user = {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          // custom helper to select user's state, pet type in dropdowns
          helpers: {
            select: helpers.select
          }
        };
        res.render('profile', user);
      });
    } else {
      res.redirect('/');
    }
  });

  // Load dashboard page
  router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('dashboard', user);
    } else {
      res.render('dashboard');
    }
  });

  // Load dashboard page
  router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('dashboard', user);
    } else {
      res.render('dashboard');
    }
  });

  // ---------------------------------

  router.get('/search', function (req, res) {
    // eslint-disable-next-line no-var
    var userZip;
    if (req.isAuthenticated()) {
      userZip = req.session.passport.user;
      db.User.findAll({ where: {
        zipcode: req.session.passport.user.zipcode
      } }).then(function (results) {
        const filteredResults = results.filter(function (d) {
          if (d.id !== req.session.passport.user.id) {
            return d;
          }
        });

        if (filteredResults.length > 0) {
          res.render('search', {
            matches: true,
            results: filteredResults,
            userInfo: userZip,
            isloggedin: req.isAuthenticated(),
            helpers: {
              ifEquals: helpers.ifEquals
            }
          });
        } else {
          res.render('search', {
            matches: false,
            userInfo: userZip,
            isloggedin: req.isAuthenticated()
          });
        }
        // console.log(userZip);
      });
    } else {
      res.redirect('/');
    }
  });
  router.get('/profile/:id', function (req, res) {
    if (req.isAuthenticated()) {
      db.User.findOne({ where: {
        id: req.params.id
      } }).then(function (results) {
        res.render('viewPage', {
          userInfo: results,
          isloggedin: req.isAuthenticated()
        });
      });
    } else {
      res.redirect('/');
    }
  });

  router.get('/inbox', function (req, res) {
    if (req.isAuthenticated()) {
      db.Message.findAll({
        where: {
          userId: req.session.passport.user.id
        }
      }).then(function (results) {
        if (results.length > 0) {
          console.log(results);
          res.render('viewMessage', {
            messages: true,
            userInfo: req.session.passport.user,
            results: results,
            isloggedin: req.isAuthenticated()
          });
        } else {
          res.render('viewMessage', {
            messages: false,
            userInfo: req.session.passport.user,
            isloggedin: req.isAuthenticated()
          });
        }
      });
    } else {
      res.redirect('/');
    }
  });

  router.get('/message/:id', function (req, res) {
    // eslint-disable-next-line no-var
    var userId;
    if (req.isAuthenticated()) {
      userId = req.session.passport.user;
      res.render('message', {
        sender: userId,
        receving: req.params.id
      });
    } else {
      res.redirect('/');
    }
  });

  // ---------------------------------------

  // Logout
  router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.redirect('/');
    });
  });

  // Render 404 page for any unmatched routes
  router.get('*', function (req, res) {
    res.render('404');
  });

  return router;
};
