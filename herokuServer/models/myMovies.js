const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var myMoviesSchema = new Schema({
    Title: { type: String, required: true },
    Status: Number,
    Information: { type: mongoose.Schema.Types.ObjectId, ref: 'movies' } // populate with information thats stored in movies
})

module.exports = mongoose.model('myMovies', myMoviesSchema);