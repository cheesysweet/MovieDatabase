import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() findMovie: EventEmitter<any> = new EventEmitter();

  searchName: string = 'Search for move: ';
  search: string = '';

  constructor() { }

  ngOnInit(): void {}

  // Emits a seach with specifid string
  searching() {
    this.findMovie.emit(this.search);
  }

}
