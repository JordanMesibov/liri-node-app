require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

let userCommand = process.argv[2];
let userCommand2 = process.argv[3];
// The spotify-this-song command can only capture song titles that are one word in length at the moment, because I am only capturing the process.argv[3] in the query of the .search aspect of the function. I will go back and fix this later, after I get the rest of the necessary functions working.
function spotifyCommand() {

  spotify
    .search({
      type: 'track',
      query: process.argv[3],
      limit: 1
    })
    .then(function (response) {
      let song = response.tracks.items[0]
      console.log(`=====================================
Artist: ${song.album.artists[0].name}
Song Title: ${song.name}
Preview Link from Spotify: ${song.preview_url}
Album: ${song.album.name}
=====================================`);
    })
    .catch(function (err) {
      console.log(err);
    });
}

// // movie-this omdb api section
// var axios = require("axios");
function omdbCommand() {
  console.log("This works");


  axios.get("http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy").then(
    function (response) {
      console.log(response.data);
      console.log(`================
Movie title: ${response.data.Title}
The year it came out: ${response.data.Released}
The movie's rating: ${response.data.imdbRating}
The Rotten Tomatoes rating: ${response.data.Ratings[1].Value}
==================`);

    })
}


function bandsCommand() {
  console.log("Bands AYYYY");
  axios.get("https://rest.bandsintown.com/artists/" + userCommand2 + "/events?app_id=codingbootcamp")
    .then(function (response) {
      // console.log(JSON.stringify(response.data, null, 2));

      console.log(response.data[0].venue.name);
      console.log(response.data[0].venue.country);
      console.log(response.data[0].venue.city);
      console.log(moment(response.data[0].datetime).format('MMMM DD YYYY'));
    })
}

function doWhatCommand() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    let array = data.split(",");
    console.log(array);
    let userCommand2 = array[1];
    console.log(userCommand);
    console.log(userCommand2);
    spotify
    .search({
      type: 'track',
      query: userCommand2,
      limit: 1
    })
    .then(function (response) {
      let song = response.tracks.items[0]
      console.log(`=====================================
Artist: ${song.album.artists[0].name}
Song Title: ${song.name}
Preview Link from Spotify: ${song.preview_url}
Album: ${song.album.name}
=====================================`);
    })
    .catch(function (err) {
      console.log(err);
    });
  })
}


switch (userCommand) {
  case "spotify-this-song":
    return spotifyCommand();

  case "movie-this":
    return omdbCommand();

  case "concert-this":
    return bandsCommand();

  case "do-what-it-says":
    return doWhatCommand();
}