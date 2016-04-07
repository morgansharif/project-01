var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SnippetSchema = new Schema ({
  title: String,
  desc: Number,
  code: String
});

var Snippet = mongoose.model('Snippet', SnippetSchema);

// exports Snippet schema to be accessible to all files
module.exports = Snippet;
