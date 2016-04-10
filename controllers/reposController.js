var db = require('../models');

// POST /api/repos
function create(req, res) {
  console.log("POST '/api/repos' TRIGGERED");
  console.log('->req:', req.body);
  var repo_name = req.body.name;
  if (!repo_name){repo_name = "<untitled repo>";}
  var newRepo = new db.Repo({name: repo_name});
  newRepo.save(function(err, repo){
    if (err) {return console.log("save error: " + err);}
    console.log('--res:',repo);
    res.json(repo);
  });
}

// GET /api/repos/:id/snippets
function show(req, res) {
  console.log('GET /api/repos/:id TRIGGERED');
  console.log('->req: id:', req.params.id);
  db.Repo.findOne({_id: req.params.id}, function(err, foundRepo){
    if (err){return console.log("error: ", err);}
    console.log('--found repo:', (foundRepo || "no repo found"));
    console.log('<-res: repo:', foundRepo);
    res.json(foundRepo);
  });
}

function destroy(req, res) {
  console.log("DELETE /api/repos/" + req.params.id + "TRIGGERED");
  db.Repo.findByIdAndRemove(req.params.id, function (err, removedRepo){
    if (err){return console.log("delete error: ", err);}
    console.log("removed: " +removedRepo.name);
    res.json(removedRepo);
  });
}

//PUT /api/repos/:id
function update(req, res) {
  console.log("PUT '/api/repos' TRIGGERED");
  db.Repo.findOne({_id: req.params.id}, function(err, foundRepo){
    if (err){return console.log("error: ", err);}
    console.log('--found repo:',foundRepo.name);
    if(req.body.name){
      foundRepo.name = req.body.name;
    }else {
      foundRepo.name = "<untitled repo>";
    }
    foundRepo.save(function (err, savedRepo){
      console.log('<-res: repo:', foundRepo.name);
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
