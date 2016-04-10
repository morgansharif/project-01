var db = require('../models');

// POST /api/repos/:id/snippets
function create(req, res) {
  var newSnippet = new db.Snippet({
    title: "New Snippet",
    desc: "Snippet Description",
    code: "//Your Code Here"
  });
  db.Repo.findById(req.params.id, function (err, foundRepo){
    if (err){return console.log("delete error: ", err);}
    foundRepo.snippets.push(newSnippet);
    foundRepo.save(function (err, savedRepo) {
      res.json(newSnippet);
    });
  });
}

// DELETE /api/repos/:repo_id/snippets/:snippet_id
function destroy(req, res) {
  db.Repo.findOne({_id: req.params.repo_id}, function(err, foundRepo){
    if (err){return console.log("error: ", err);}
    var deletedSnippet = foundRepo.snippets.id(req.params.snippet_id);
    deletedSnippet.remove();
    foundRepo.save();
    res.json(deletedSnippet);
  });
}

function update(req, res) {
  db.Repo.findOne({_id: req.params.repo_id}, function(err, foundRepo){
    if (err){return console.log("error: ", err);}
    var foundSnippet = foundRepo.snippets.id(req.params.snippet_id);
    foundSnippet.title = req.body.title;
    foundSnippet.desc = req.body.desc;
    foundSnippet.code = req.body.code;
    foundRepo.save(function (err, savedSnippet){
      console.log('<-res: snippet:', foundSnippet.title);
      res.json(foundSnippet);
    });
  });
}

// export public methods here
module.exports = {
  create: create,
  destroy: destroy,
  update: update
};
