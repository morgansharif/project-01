var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/project-01");

module.exports.Repo = require('./repo');
// module.exports.Snippet = require('./snippet');
