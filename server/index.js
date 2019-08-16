const express = require('express');
let app = express();
const helper = require('../helpers/github.js')
const dbHelper = require('../database/index.js')

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var searchTerm = req.body.term;

  helper.getReposByUsername(searchTerm, (results) => {
    var json = JSON.parse(results);

    for (var i = 0; i < json.length; i++) {
      dbHelper.save(json[i]);
    }
    res.end("Done insert for: " + searchTerm);
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  dbHelper.getAllRepos((data) => {
    console.log("DATA:", data)
    res.json(data)
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

