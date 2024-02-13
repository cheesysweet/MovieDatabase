import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-administation',
  templateUrl: './administation.component.html',
  styleUrls: ['./administation.component.css']
})
export class AdministationComponent implements OnInit {
  movies: any; // list of all stored movies
  movieDatabase: any; // list of all movies from the database

  TitleName: string = 'ImdbID ';
  SerieName: string = 'Movie serie ';
  Title: string = '';
  Serie: string = '';

  constructor(private movieService: BackendService) { }

  // loads the movies from the database
  ngOnInit(): void {
    this.movieService.getDatabase().subscribe(movie => this.movieDatabase = movie);
  }

  // Gets movies from omdbapi containing searched name
  getMovies(movie: string) {
    this.movieService.getMovies(movie).subscribe(movie => this.movies = movie.Search);
  }

  // Deletes move with title from movie and myMovies collections
  deleteMovie(movieTitle: string) {
    this.movieService.deleteMovie(movieTitle).subscribe(() => this.movieDatabase = this.movieDatabase.filter((mvi: { Title: String; }) => mvi.Title !== movieTitle));
    this.movieService.deleteMyMovie(movieTitle).subscribe();
  }

  // Adds a new movie to movie collection
  addMovie() {
      this.movieService.getMovieSpec(this.Title).subscribe(movie => 
        this.movieService.addMovie(movie, this.Serie).subscribe());
  }

  // Sets title to imdbID if imdbID from a movie has been pressed
  click(imdbID: string) {
    this.Title = imdbID;
  }

}
