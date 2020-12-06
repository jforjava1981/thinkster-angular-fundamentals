import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MovieDisplayComponent } from './movie-display/movie-display.component';
import { FlopVotesComponent } from './flop-votes/flop-votes.component';
import { RentalCartComponent } from './rental-cart/rental-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieDisplayComponent,
    FlopVotesComponent,
    RentalCartComponent    
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
