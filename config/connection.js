const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialnetDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;