var db = require('../models');

function index(req, res) {
  // FILL ME IN !
}

function create(req, res) {
  // FILL ME IN !
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
