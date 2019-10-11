module.exports = function (db) {
  return {
    // Get all examples
    getExamples: function (req, res) {
      console.log(req.user);

      if (req.user.isAdmin) {
        db.Example.findAll({}).then(function (dbExamples) {
          res.json(dbExamples);
        });
      } else {
        db.Example.findAll({
          where: {
            UserId: req.user
          }
        }).then(function (dbExamples) {
          res.json(dbExamples);
        });
      }
    },
    // Create a new example
    createExample: function (req, res) {
      db.Example.create(req.body).then(function (dbExample) {
        res.json(dbExample);
      });
    },
    // Delete an example by id
    deleteExample: function (req, res) {
      db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
        res.json(dbExample);
      });
    }
  };
};
