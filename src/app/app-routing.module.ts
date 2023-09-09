import { FavoriteComponent } from './favorite/favorite.component';
import { SearchComponent } from './search/search.component';
// import { TopBarComponent } from './top-bar/top-bar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full'},
  // { path: '**', redirectTo: 'search', pathMatch: 'full'},
  { path:'search',component: SearchComponent},
  { path:'favorite',component: FavoriteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
