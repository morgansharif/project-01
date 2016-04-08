var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SnippetSchema = new Schema ({
  title: String,
  desc: String,
  code: String,
  // repo: {type: Schema.Types.ObjectId, ref: "Repo"}
});

var Snippet = mongoose.model('Snippet', SnippetSchema);

// exports Snippet schema to be accessible to all files
module.exports = Snippet;
