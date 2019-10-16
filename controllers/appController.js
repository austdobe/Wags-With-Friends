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
    // *TODO:
    // Paola
    getZipCode: function (req, res) {
      console.log(req.user);

      if (req.pets.zipcode) {
        db.pets.findAll({}).then(function (dbPets) {
          res.json(dbPets);
        });
        // Paola
      } else {
        db.pets.findAll({
          where: {
            zipcode: '%27560%'
          }
        }).then(function (dbPets) {
          res.json(dbPets);
        });
      }
      const chat = function () {
        const express = require('express');
        const app = express();
        const http = require('http');
        const server = http.createServer(app);
        const io = require('socket.io').listen(server);
        io.on('connection', (socket) => {
          console.log('New user connected!!!');
        });
    }
    // Paola
    // *TODO:
    // Create a new example
    createExample: function (req, res) {
      db.Search.create(req.body).then(function (dbExample) {
        res.json(dbExample);
      });
    }
    // Delete an example by id
    deleteExample: function (req, res) {
      db.Search.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
        res.json(dbExample);
      });
    }
  },
}}
