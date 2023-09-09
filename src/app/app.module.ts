import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from 
'@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { GoogleMapsModule } from '@angular/google-maps'
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { FormComponent } from './form/form.component';
import { ResTableComponent } from './res-table/res-table.component';
import { DetailsComponent } from './details/details.component';
import { CallBackendService } from './call-backend.service';
@NgModule({
  declarations: [
    AppComponent,
    // TopBarComponent,
    SearchComponent,
    FavoriteComponent,
    FormComponent,
    ResTableComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule,
    RouterModule,
    GoogleMapsModule,
    MatAutocompleteModule,
    MatInputModule ,
    MatIconModule ,
    MatButtonModule ,
    MatProgressSpinnerModule,
    // RouterModule.forRoot([
    //   { path: '', redirectTo: '/search', pathMatch: 'full'},
    //   { path: '/seasrch', component: SearchComponent},
    //   { path: '/favorite', component: FavoriteComponent},
    // ])
  ],
  providers: [CallBackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
