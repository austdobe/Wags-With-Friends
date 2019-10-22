const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const db = require('../models');
const expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

let request;

describe('POST /api/register', function () {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function () {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it('should create a user', function (done) {
    // Create an object to send to the endpoint
    const reqBody = {
      firstName: 'Jon',
      lastName: 'Sims',
      email: 'j0nny@gmail.com',
      password: 'green99',
      isAdmin: false,
      pet: 'cat',
      petAge: 5,
      petName: 'Coffee',
      address: '3 Morristown Cir',
      zipcode: 27705,
      city: 'Durham',
      state: 'NC'
    };

    // POST the request body to the server
    request
      .post('/api/register')
      .send(reqBody)
      .end(function (err, res) {
        const responseStatus = res.status;
        const responseBody = res.body;

        // Run assertions on the response

        // eslint-disable-next-line no-unused-expressions
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an('object')
          .that.includes({ message: 'Registered successfully.' });

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });
});
