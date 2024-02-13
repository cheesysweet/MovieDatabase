import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent } from './components/movies/movies.component';
import { MyMoviesComponent } from './components/my-movies/my-movies.component';
import { AdministationComponent } from './components/administation/administation.component';

const routes: Routes = [
  {path: '', component: MoviesComponent},
  {path: 'my-movies', component: MyMoviesComponent},
  {path: 'administration', component: AdministationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
