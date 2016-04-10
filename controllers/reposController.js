var db = require('../models');

// POST /api/repos
function create(req, res) {
  var repo_name = req.body.name;
  if (!repo_name){repo_name = "<untitled repo>";}
  var newRepo = new db.Repo({name: repo_name});
  newRepo.save(function(err, repo){
    if (err) {return console.log("save error: " + err);}
    res.json(repo);
  });
}

// GET /api/repos/:id/snippets
function show(req, res) {
  db.Repo.findOne({_id: req.params.id}, function(err, foundRepo){
    if (err){return console.log("error: ", err);}
    res.json(foundRepo);
  });
}

//DELETE /api/repos/:id
function destroy(req, res) {
  db.Repo.findByIdAndRemove(req.params.id, function (err, removedRepo){
    if (err){return console.log("delete error: ", err);}
    res.json(removedRepo);
  });
}

//PUT /api/repos/:id
function update(req, res) {
  db.Repo.findOne({_id: req.params.id}, function(err, foundRepo){
    if (err){return console.log("error: ", err);}
    if(req.body.name){
      foundRepo.name = req.body.name;
    }else {
      foundRepo.name = "<untitled repo>";
    }
    foundRepo.save(function (err, savedRepo){
      res.json(foundRepo.name);
    });
  });
}


// export public methods here
module.exports = {
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
