module.exports = function (db) {
  return {
    // Get all examples INCLUDES HOW TO CHANGE FOR ADMIN
    getExamples: function (req, res) {
      console.log(req.session.passport.user.isAdmin);

      if (req.session.passport.user.isAdmin) {
        db.User.findAll({}).then(function (dbExamples) {
          res.json(dbExamples);
        });
      } else {
        db.User.findAll({ where: { zipcode: req.session.passport.user.zipcode } }).then(function (dbExamples) {
          res.json(dbExamples);
        });
      }
    },
    // Create a new example
    createExample: function (req, res) {
      db.Search.create(req.body).then(function (dbExample) {
        res.json(dbExample);
      });
    },
    // Delete an example by id
    deleteExample: function (req, res) {
      db.Search.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
        res.json(dbExample);
      });
    }
  };
};
