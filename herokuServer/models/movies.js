const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var moviesSchema = new Schema({
    Title: { type: String, required: true },
    Actors: String,
    Awards: String,
    BoxOffice: String,
    Country: String,
    Director: String,
    Genre: String,
    Language: String,
    Plot: String,
    Poster: String,
    Rated: String,
    Released: String,
    Runtime: String,
    Type: String,
    Writer: String,
    Year: String,
    imdbID: { type: String, required: true },
    imdbRating: String,
    serie: String,
})

module.exports = mongoose.model('movies', moviesSchema);
