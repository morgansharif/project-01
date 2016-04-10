var db = require('../models');


function index(req, res) {
  // FILL ME IN !
}

// POST /api/repos/:id/snippets
function create(req, res) {
  console.log("POST /api/repos/"+req.params.id+"/snippets TRIGGERED");
  var newSnippet = new db.Snippet({
    title: "New Snippet",
    desc: "Snippet Description",
    code: "//Your Code Here"
  });
  console.log('new snippet: ', newSnippet);
  db.Repo.findById(req.params.id, function (err, foundRepo){
    if (err){return console.log("delete error: ", err);}
    foundRepo.snippets.push(newSnippet);
    foundRepo.save(function (err, savedRepo) {
      res.json(newSnippet);
    });
  });
}

function show(req, res) {
  // FILL ME IN !
}

function destroy(req, res) {
  // FILL ME IN !
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
