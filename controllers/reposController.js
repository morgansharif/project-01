var db = require('../models');

function index(req, res) {
  // FILL ME IN !
}

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
