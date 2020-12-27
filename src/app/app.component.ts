import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './movie';
import { MovieState, MovieStateManager } from './movie.state';
import { VoteEvent } from './vote.event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  
    movieState$:Observable<MovieState>;

    constructor(private movieStateManager:MovieStateManager){
    }

    ngOnInit(){
      this.movieState$ = this.movieStateManager.movieState$;
    }
   
    vote(voteEvent:VoteEvent):void{      
      this.movieStateManager.voteForMovie(voteEvent.movie,voteEvent.voted)
    }
    
    movieTracker(index:number,movie:Movie){
      return movie.title;
    }
}
