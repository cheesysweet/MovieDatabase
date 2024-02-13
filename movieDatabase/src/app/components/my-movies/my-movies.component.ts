import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.css']
})
export class MyMoviesComponent implements OnInit {
  myMovies: any; // stores my movies
  

  constructor(private movieService: BackendService) { }

  // loads all movies that are added to the my movies DB
  ngOnInit(): void {
    this.movieService.getMyMovies().subscribe(movie => this.myMovies = movie);
  }

  // deletes a movie using title
  deleteMovie(movieTitle: string) {
    this.movieService.deleteMyMovie(movieTitle).subscribe(() => this.myMovies = this.myMovies.filter((mvi: { Title: String; }) => mvi.Title !== movieTitle))
  }

  // changes the status of the movie
  changeStatus(movie: any) {
    this.movieService.changeMyStatus(movie).subscribe();
  }

}
