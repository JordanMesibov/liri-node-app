require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// The spotify-this-song command can only capture song titles that are one word in length at the moment, because I am only capturing the process.argv[3] in the query of the .search aspect of the function. I will go back and fix this later, after I get the rest of the necessary functions working.
if (process.argv[2] === "spotify-this-song") {
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

// bands in town and concert-this

var axios = require("axios");
var moment = require("moment");
var bandsILike = require("./bands.js");

if (process.argv[2] === "concert-this") {
  let userInput = process.argv[3];
  axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=" + process.env.bandsILike_ID)
    .then(function (response) {
        console.log(JSON.stringify(response.data, null, 2));
    
    ,
    console.log(JSON.stringify(response.data[0].venue.name));
    console.log(JSON.stringify(response.data[0].venue.country));
    console.log(JSON.stringify(response.data[0].venue.city));
    console.log(JSON.stringify(response.data[0].datetime));
  }

// //   })
//     ).catch(function (err) {
//       console.log("concert-this error", err);
//     });
// // }