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
    // *TODO:
    // Paola
    getZipCode: function (req, res) {
      console.log(req.user);

      if (req.pets.zipcode) {
        db.pets.findAll({}).then(function (dbPets) {
          res.json(dbPets);
        });
      } else {
        db.pets.findAll({
          where: {
            zipcode: '%27560%'
          }
        }).then(function (dbPets) {
          res.json(dbPets);
        });
      }
    },
    // Paola
    // *TODO:
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
