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

//Use Bower and use offline versions of CDNs and make available at '/vendor' directory
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

// Show Repo
app.get('/api/repos/:id', controllers.repos.show);

// Create Repo
app.post('/api/repos', controllers.repos.create);

// Update Repo
app.put('/api/repos/:id', controllers.repos.update);

// Destroy Repo
app.delete('/api/repos/:id', controllers.repos.destroy);

// Create Snippet
app.post('/api/repos/:id/snippets', controllers.reposSnippets.create);

// Update Snippet
app.put('/api/repos/:repo_id/snippets/:snippet_id', controllers.reposSnippets.update);

// Destroy Snippet
app.delete('/api/repos/:repo_id/snippets/:snippet_id', controllers.reposSnippets.destroy);

/**********
* SERVER *
**********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
