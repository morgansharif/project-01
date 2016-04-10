//SERVER

//require express
var express = require('express');

//create new express app called "app"
var app = express(),
    db = require('./models');

// require body-parser
var bodyParser = require('body-parser');
// serve static files from public folder
app.use(express.static(__dirname + '/public'));

//body parser config
app.use(bodyParser.urlencoded({extended: true}));

// We'll serve jQuery and bootstrap from a local bower cache avoiding CDNs
// We're placing these under /vendor to differentiate them from our own assets
app.use('/vendor', express.static(__dirname + '/bower_components'));


//require controllers
var controllers = require('./controllers');

/**********
* ROUTES *
**********/

/*
 * HTML Endpoints
 */


 app.get('/', function homepage (req, res) {
   res.sendFile(__dirname + '/views/index.html');
 });

 /*
 * JSON API Endpoints
 */

 //look at api
 app.get('/api', controllers.api.index);

// GET repo (and all its snippets)
app.get('/api/repos/:id', controllers.repos.show);
// function(req, res){
//   console.log('GET /api/repos/:id/snippets TRIGGERED');
//   console.log('->req: id:', req.params.id);
//   db.Repo.findOne({_id: req.params.id}, function(err, foundRepo){
//     if (err){return console.log("error: ", err);}
//     console.log('--found repo:', (foundRepo || "no repo found"));
//     console.log('<-res: repo:', foundRepo);
//     res.json(foundRepo);
//   });
// });

// POST new repo
app.post('/api/repos', function(req, res){
  console.log("POST '/api/repos' TRIGGERED");
  console.log('->req:', req.body);
  var repo_name = req.body.name;
  if (!repo_name){
  repo_name = "<untitled repo>";
  }
  var newRepo = new db.Repo({name: repo_name});
  newRepo.save(function(err, repo){
    if (err) {return console.log("save error: " + err);}
    console.log('--res:',repo);
    res.json(repo);
  });
});


// PUT update repo name --Return foundRepo.name
app.put('/api/repos/:id', function(req, res){
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
});


// DELETE existing repo
app.delete('/api/repos/:id', function (req, res){
  console.log("DELETE /api/repos/" + req.params.id + "TRIGGERED");
  db.Repo.findByIdAndRemove(req.params.id, function (err, removedRepo){
    if (err){return console.log("delete error: ", err);}
    res.json(removedRepo);
  });
});

// POST new snippet
app.post('/api/repos/:id/snippets', function (req, res){
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
});

// PUT existing snippet
app.put('/api/repos/:repo_id/snippets/:snippet_id', function (req, res){
  console.log("PUT '/api/repos/" + req.params.repo_id + "snippets/" + req.params.snippet_id + "' TRIGGERED");
  db.Repo.findOne({_id: req.params.repo_id}, function(err, foundRepo){
    if (err){return console.log("error: ", err);}
    console.log('--found repo:',foundRepo.name);
    var foundSnippet = foundRepo.snippets.id(req.params.snippet_id);
    console.log('--found snippet: '+ foundSnippet.title);
    foundSnippet.title = req.body.title;
    foundSnippet.desc = req.body.desc;
    foundSnippet.code = req.body.code;
    foundRepo.save(function (err, savedSnippet){
      console.log('<-res: snippet:', foundSnippet.title);
      res.json(foundSnippet);
    });
  });
});


// DELETE existing snippet
app.delete('/api/repos/:repo_id/snippets/:snippet_id', function (req, res){
  db.Repo.findOne({_id: req.params.repo_id}, function(err, foundRepo){
    if (err){return console.log("error: ", err);}
    var deletedSnippet = foundRepo.snippets.id(req.params.snippet_id);
    deletedSnippet.remove();
    foundRepo.save();
    res.json(deletedSnippet);
  });
});

/**********
* SERVER *
**********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
