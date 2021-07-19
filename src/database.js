const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notes-app', { useNewUrlParser : true, useUnifiedTopology : true })
  .then((db) => {console.log('Database connected')})
  .catch(err => {console.log(err)});

module.exports;