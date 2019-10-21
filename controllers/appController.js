module.exports = function (db) {
  return {
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
    createMessage: function (req, res) {
      db.Message.create(req.body).then(function (result) {
        res.json(result);
      });
    },
    deleteMessage: function (req, res) {
      db.Message.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
        res.json(dbExample);
      });
    }
  };
};
