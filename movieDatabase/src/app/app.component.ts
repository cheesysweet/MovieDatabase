import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  heading = 'Movie Database';
  heading2 = 'my movies';
  heading3 = 'Administraion';

  constructor(private router: Router) {}

  // Displays different headers and nav links depending on current route
  hasRoute(route: string) {
    return this.router.url === route;
  }
}
