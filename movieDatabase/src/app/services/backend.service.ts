import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private moviesUrl = 'http://www.omdbapi.com/?apikey=9aa03196&';
  private herokuUrl = 'https://movie-database-anby2001.herokuapp.com/';

  constructor(private http:HttpClient) { }

  //Searches for movies on imdb for a movie with name.
  getMovies(movie: string): Observable<any> {
    const url = `${this.moviesUrl}s=${movie}`;
    return this.http.get<any>(url);
  }

  //Gets information of a movie with imdbID
  getMovieSpec(movie: string): Observable<any>{
    const url = `${this.moviesUrl}i=${movie}`;
    return this.http.get<any>(url);
  }

  //adds a movie to movie collection
  addMovie(movie: any, serie: string): Observable<any> {
    const url = `${this.herokuUrl}api/movies/${serie}`;
    return this.http.post<any>(url, movie)
  }

  //adds a movie to myMovies collection
  addMyMovie(movie: any): Observable<any> {
    const url = `${this.herokuUrl}api/my/movies`;
    return this.http.post<any>(url, movie)
  }

  //fetches the movies database
  getDatabase(): Observable<any> {
    const url = `${this.herokuUrl}api/movies`;
    return this.http.get<any>(url);
  }

  //delets a movie from movies collection with stated title
  deleteMovie(movie: string): Observable<any> {
    const url = `${this.herokuUrl}api/movies/${movie}`;
    return this.http.delete<any>(url);
  }

  //fetches database of my movies
  getMyMovies(): Observable<any> {
    const url = `${this.herokuUrl}api/my/movies`;
    return this.http.get<any>(url);
  }

  //delets a movie from myMovies collection with stated title
  deleteMyMovie(movie: string): Observable<any> {
    const url = `${this.herokuUrl}api/my/movies/${movie}`;
    return this.http.delete<any>(url);
  }

  //changes status of a movie in myMovies collection with stated title to watched or not
  changeMyStatus(movie: any): Observable<any>{
    const url = `${this.herokuUrl}api/my/movies/${movie.Title}`;
    return this.http.put<any>(url, {"status": movie.Status});
  }

}
