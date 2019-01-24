require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

if (process.argv[2] === "spotify-this-song") {
  spotify
    .search({ type: 'track', query: process.argv[3], limit: 1 })
    .then(function(response) {
      console.log(response.tracks.items);
    })
    .catch(function(err) {
      console.log(err);
    });
  }
