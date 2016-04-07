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

// GET all snippets
// app.get('/api/repos/:id/snippets',
// req.params.id

// POST new repo
// app.post('api/repos'
// req.body.name

// PUT update repo name
// app.put('/api/repos/:id'
// req.params.id
// req.body.name

// POST new snippet
// app.get('/api/repos/:id/snippets'
// req.params.id
// req.body (title/desc/code)

// PUT existing snippet
// app.put('api/repos/:repo_id/snippets/:snippet_id'
// req.params.repo_id
// req.params.snippet_id
// req.body (title/desc/code)

// DELETE existing repo
// app.delete('api/repos/:id'
// req.params.id

// DELETE existing snippet
// app.delete('api/repos/:repo_id/snippets/snippet_id'
// req.params.id


/**********
* SERVER *
**********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
