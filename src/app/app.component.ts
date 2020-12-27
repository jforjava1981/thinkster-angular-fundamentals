import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './movie';
import { MovieService } from './movie.service';
import { MovieState } from './movie.state';
import { VoteEvent } from './vote.event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  
    movieState$:Observable<MovieState>;

    constructor(private movieService:MovieService){
    }

    ngOnInit(){
      this.movieState$ = this.movieService.movieState$;
    }
   
    vote(voteEvent:VoteEvent):void{      
      this.movieService.voteForMovie(voteEvent.movie,voteEvent.voted)
    }
    
    movieTracker(index:number,movie:Movie){
      return movie.title;
    }
}
