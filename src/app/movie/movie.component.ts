import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../movie';
import { VoteEvent } from '../vote.event';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit {

  @Input()
  movie:Movie;

  @Input()
  voted:boolean;

  @Output('onVote')
  voteEvent:EventEmitter<VoteEvent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


  onVote() {
    this.voteEvent.emit({movie:this.movie,voted:this.voted});
  }

  getButtonText() {
    if(this.movie.chosen?.isChosen){
      return 'Unvote';
    }
    return 'Vote';
  }

}
