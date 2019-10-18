require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const moment = require('moment');
const helmet = require('helmet');
const PORT = process.env.PORT || 3333;
const app = express();
const db = require('./models');

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

if (app.get('env') !== 'test') {
  app.use(morgan('dev')); // Hook up the HTTP logger
}

app.use(express.static('public'));

require('./config/passport')(db, app, passport); // pass passport for configuration

// Define our routes
app.use('/api', require('./routes/apiRoutes')(passport, db));
app.use(require('./routes/htmlRoutes')(db));

// Secure express app
app.use(helmet.hsts({
  maxAge: moment.duration(1, 'years').asMilliseconds()
}));

// catch 404 and forward to error handler
if (app.get('env') !== 'development') {
  app.use((req, res, next) => {
    const err = new Error('Not Found: ' + req.url);
    err.status = 404;
    next(err);
  });
}

const syncOptions = {
  force: process.env.FORCE_SYNC === 'true'
};

if (app.get('env') === 'test') {
  syncOptions.force = true;
}

db.sequelize.sync(syncOptions).then(() => {
  if (app.get('env') !== 'test' || syncOptions.force) {
    require('./db/seed')(db);
  }

  app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
  });
});

// // Paola
// const http = require('http');
// const server = http.createServer(app);
// const io = require('socket.io').listen(server);
// io.on('connection', (socket) => {
//   console.log('New user connected');

// //   // default username
//   socket.username = 'Anonymous';

//   // listen on new_message
//   socket.on('new_message', (data) => {
//   // broadcast the new message
//     io.sockets.emit('new_message', { message: data.message, username: socket.username });
//   });

//   // listen on typing
//   socket.on('typing', (data) => {
//     socket.broadcast.emit('typing', { username: socket.username });
//   });
// });

// Paola

module.exports = app;
