// seed.js

var db = require("./models");



var repoList = [
  {
  name: "Morgan's Repo"
  },
  {
  name: "Bobs's Repo"
  },
  {
  name: "Emily's Repo"
  }
];

var snippetList = [
  {
    title: "Ajax Call",
    desc: "This is a boilerplate ajax call to be used to hit an endpoint and recieve all data.",
    code: "  $.ajax({\r\n    method: \'GET\',\r\n    url: \'/api/stuff\',\r\n    success: handleSuccess,\r\n    failure: handleFailure,\r\n  });"
  },
  {
    title: "Node Server Boilerplate",
    desc: "This is the boilerplate header of a node.js server using express.",
    code: "//node server boilerplate\r\n//require express in our app\r\nvar express = require(\'express\');\r\n// generate a new express app and call it \'app\'\r\nvar app = express(),\r\n    db = require(\'./models\');\r\n\r\n// require body-parser\r\nvar bodyParser = require(\'body-parser\');\r\n\r\n// serve static files from public folder\r\napp.use(express.static(__dirname + \'/public\'));\r\n\r\n//body parser config\r\napp.use(bodyParser.urlencoded({extended: true}));\r\n\r\n// We\'ll serve jQuery and bootstrap from a local bower cache avoiding CDNs\r\n// We\'re placing these under /vendor to differentiate them from our own assets\r\napp.use(\'/vendor\', express.static(__dirname + \'/bower_components\'));\r\n\r\nvar controllers = require(\'./controllers\');\r\n  });"
  },
  {
    title: "Bootstrap Jumbotron example",
    desc: "Example of a bootstrap jumbotron div.",
    code: '    <!-- start jumbotron-->\r\n    <div class="jumbotron hidden">\r\n      <div class="container">\r\n        <h1>Snippets</h1><br />\r\n        <!-- start input-group -->\r\n        <div class="col-sm-6 col-sm-offset-3">\r\n          <div class="input-group">\r\n            <input type="text" class="form-control" placeholder="Login with repo id...">\r\n            <span class="input-group-btn">\r\n              <button class="btn btn-default" type="button">Login</button>\r\n            </span>\r\n          </div>\r\n        </div>\r\n        <!-- /input-group -->\r\n      </div>\r\n    </div>\r\n    <!-- end jumbotron -->'
  },
  {
    title: "API controller setup",
    desc: "This code shows what is needed for a basic /api endpoint between files on the server..",
    code: '// --- inside /controllers/apiController.js\r\nfunction index(req, res) {\r\n  res.json({\r\n    message: "Welcome to tunely!",\r\n    documentation_url: "https://github.com/tgaff/tunely/api.md",\r\n    base_url: "http://tunely.herokuapp.com",\r\n    endpoints: [\r\n      {method: "GET", path: "/api", description: "Describes available endpoints"}\r\n    ]\r\n  });\r\n}\r\nmodule.exports.index = index;\r\n\r\n// --- inside /controllers/index.js\r\nmodule.exports.api = require(\'./apiController\');\r\n\r\n// --- inside server.js\r\napp.get(\'/api\', controllers.api.index);'
  }
];






repoList.forEach(function(repo) {
  repo.snippets = snippetList;
  console.log('REPO', repo);
});

//clear all existing albums from db
db.Repo.remove({}, function(err, repos){
  db.Repo.create(repoList, function(err, repos){
    if (err) { return console.log('ERROR', err); }
    console.log("all repos:", repos);
    console.log("created", repos.length, "repos");
    process.exit();
  });
});
