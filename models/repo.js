var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Snippet = require('./snippet');

var RepoSchema = new Schema ({
  name: String,
  snippets: [ Snippet.schema ]
});

var Repo = mongoose.model('Repo', RepoSchema);

// exports Repo schema to be accessible to all files
module.exports = Repo;
