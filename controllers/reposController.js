var db = require('../models');


// GET /api/albums
function index(req, res) {
    console.log("GET '/api/albums' TRIGGERED");
    db.Album.find(function (err, albums){
      if (err){console.log('--error: ', err);}
      // console.log('--res:',albums);
      res.json(albums);
    });
}

//POST /api/albums  create ONE ALBUM
function create(req, res) {
    console.log("POST '/api/albums' TRIGGERED");
    console.log('--req:', req.body);
    var newAlbum = new db.Album(req.body);
    if (newAlbum.genres){
      // console.log('--genres PASSED');
      newAlbum.genres = req.body.genres.split(", ");
      // console.log('updated genres', newAlbum.genres);
    }
    newAlbum.save(function(err, album){
    if (err) {return console.log("save error: " + err);}
    console.log('--res:',album);
    res.json(album);
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
