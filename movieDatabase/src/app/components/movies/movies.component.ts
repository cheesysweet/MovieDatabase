import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: any; // list of searched movies
  marvelMovies: any; // list of marvel movies
  DCMovies: any; // list of dc movies

  constructor(private movieService: BackendService) { }

  // fills in the marvel and dc movie list when the page loads
  ngOnInit(): void { 
    this.movieService.getDatabase().subscribe(movie => this.marvelMovies = movie.filter((mvi: {serie: String}) => mvi.serie === "Marvel"));
    this.movieService.getDatabase().subscribe(movie => this.DCMovies = movie.filter((mvi: {serie: String}) => mvi.serie === "DC"));
  }
  
  // gets movies from imdb using name of movies
  getMovies(movie: string) {
    this.movieService.getMovies(movie).subscribe(movie => this.movies = movie.Search);
  }
  
  // add movie to my movies using information about the movie from imdb
  addMovie(movie: any) {
    this.movieService.getMovieSpec(movie.imdbID).subscribe(movie => 
      this.movieService.addMyMovie(movie).subscribe());
  }
}
