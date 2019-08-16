const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  url: String,
  id: String,
  repoName: String,
  username: String,
  forkCount: Number,
  watcherCount: Number,
  pic: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {

  var dataToLoad = {
    url: data.html_url,
    id: data.id,
    repoName: data.name,
    username: data.owner.login,
    forkCount: data.forks_count,
    watcherCount: data.watchers,
    pic: data.owner.avatar_url
  }

  Repo.findOneAndUpdate({id: data.id}, dataToLoad, {upsert: true}, (err) => {
    if (err) {
      throw err;
    }
  });
}

let getAllRepos = (callback) => {
  console.log('hit');
  Repo.find({}, (err, docs) => {
    if (err) {
      throw err;
    }
    callback(docs);
  })
  .sort({forkCount: -1, watcherCount: -1})
  .limit(25);
}

module.exports.save = save;
module.exports.getAllRepos = getAllRepos;