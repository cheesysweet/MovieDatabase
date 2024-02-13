const express = require('express');
var moviesSchema = require("../models/movies");
const router = express.Router();

// Gets all movies
router.route("").get((req, res) => {
    moviesSchema.find(function(err, movies) {
      if (err) {
        res.status(404).send(err);
      }
      res.status(200).json(movies)
    });
})

// Deletes a movie with title
router.route("/:id").delete(function(req, res) {
  const movie = req.params.id;

  moviesSchema.findOne({ Title: movie }, function(err, mvi) {
      if (err) {
      res.status(404).send(err);
      }
      if (mvi !== null) {
      moviesSchema.findOneAndDelete({
          Title: movie
      }, function(err, movie) {
          if (err) {
          res.status(404).send(err)
          }
          res.status(200).json(movie)
      });
      } else {
      res.status(404).json({ "message" : "movie with title: " + movie.Title + " don´t exists"})
      }
  })
})

// adds a movie to my movies database
router.route("/:id").post(function(req, res) {
  var movie = new moviesSchema();
  var mvi = req.body;


      moviesSchema.findOne({ Title: mvi.Title }, async function(err, myMovies) { // finds out if the movie exists in the movie database
          if (err) {
          res.send(err);
          } else if (myMovies === null) { // stores a new movie (is needed so populate will work)
          movie.Title = mvi.Title;
          movie.Actors = mvi.Actors;
          movie.Awards = mvi.Awards;
          movie.BoxOffice = mvi.BoxOffice;
          movie.Country = mvi.Country;
          movie.Director = mvi.Director;
          movie.Genre = mvi.Genre;
          movie.Language = mvi.Language;
          movie.Plot = mvi.Plot;
          movie.Poster = mvi.Poster;
          movie.Rated = mvi.Rated;
          movie.Released = mvi.Released;
          movie.Runtime = mvi.Runtime;
          movie.Type = mvi.Type;
          movie.Writer = mvi.Writer;
          movie.Year = mvi.Year;
          movie.imdbID = mvi.imdbID;
          movie.imdbRating = mvi.imdbRating;
          movie.serie = req.params.id;
      
          await movie.save(function(err) {
              if (err) {
              res.status(404).send(err);
              }
          })
          res.status(200).json(movie);
      } else {
      res.status(404).json({ "message" : "movie with title: " + mvi.Title + " already exists"});
      }
  })
})


module.exports = router
