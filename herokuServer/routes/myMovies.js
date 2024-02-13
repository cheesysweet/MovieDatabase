const express = require('express');
var moviesSchema = require("../models/movies");
var myMoviesSchema = require("../models/myMovies");
const router = express.Router();


// Gets all liked movies
router.route("").get(function(req, res) {
    movieList = []

    myMoviesSchema.find(async function(err, movies) {
        if (err) {
        res.status(404).send(err);
        }
        for (let i=0; i<movies.length; i++) {
            await myMoviesSchema.findOne({_id: movies[i]._id}).populate("Information").then(movie => movieList.push(movie));
        }
    res.status(200).json(movieList)
})
})


// adds a movie to my movies database
router.route("").post(function(req, res) {
    var movie = new moviesSchema();
    var newMovie = new myMoviesSchema();
    var mvi = req.body;

    myMoviesSchema.findOne({ Title: mvi.Title }, function(err, myMovie) { // finds out if the movie is allready added in my movies
        if (err) {
        res.status(404).send(err);
        } else if (myMovie === null) {
        moviesSchema.findOne({ Title: mvi.Title }, async function(err, myMovies) { // finds out if the movie exists in the movie database
            if (err) {
            res.status(404).send(err);
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
                movie.serie = "";
        
            await movie.save(function(err) {
                if (err) {
                res.status(404).send(err);
                }
            })
            } else {
            movie = myMovies; // if the movie exists store the id
            } // stores data for a new movie in my movies
            newMovie.Title = mvi.Title
            newMovie.Status = 0;
            newMovie.Information = movie._id;

            await newMovie.save(function(err) {
            if (err) {
                res.status(404).send(err);
            }
            })
            res.status(200).json(newMovie)
        })
        } else {
        res.status(404).json({ "message" : "movie with title: " + mvi.Title + " already exists"});
        }
    })
})

// Deletes a movie with title
router.route("/:id").delete(function(req, res) {
    const movie = req.params.id;

    myMoviesSchema.findOne({ Title: movie }, function(err, mvi) {
        if (err) {
        res.status(404).send(err);
        }
        if (mvi !== null) {
        myMoviesSchema.findOneAndDelete({
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

// changes the Status of a movie
router.route("/:id").put(function(req, res) {
    const title = req.params.id
    const stat = req.body.status

    myMoviesSchema.findOneAndUpdate({ Title: title }, { $set: { Status: stat}}, function(err, movie) {
        if (err) {
        res.status(404).json({ "error" : "movie not found"});
        }
        res.status(200).json(movie);
    });

})

module.exports = router;