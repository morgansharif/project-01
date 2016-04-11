var mongoose = require('mongoose');
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "mongodb://localhost/project-01");


module.exports.Repo = require('./repo');
module.exports.Snippet = require('./snippet');
