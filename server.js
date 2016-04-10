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

// GET API
app.get('/api', controllers.api.index);

// GET repo
app.get('/api/repos/:id', controllers.repos.show);

// POST repo
app.post('/api/repos', controllers.repos.create);

// PUT repo name
app.put('/api/repos/:id', controllers.repos.update);

// DELETE repo
app.delete('/api/repos/:id', controllers.repos.destroy);

// POST snippet
app.post('/api/repos/:id/snippets', controllers.reposSnippets.create);

// PUT snippet
app.put('/api/repos/:repo_id/snippets/:snippet_id', controllers.reposSnippets.update);

// DELETE snippet
app.delete('/api/repos/:repo_id/snippets/:snippet_id', controllers.reposSnippets.destroy);

/**********
* SERVER *
**********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
