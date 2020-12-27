import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map,reduce,scan,concatMap } from 'rxjs/operators';
import { Action, VoteAction, UnVoteAction } from './actions';
import { MovieState } from './movie.state';
import { Movie } from './movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
 
  private movies:Array<Movie> = [{
    url : "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY67_CR0,0,45,67_AL_.jpg",
    title:"Shawshank's redemption"
   },{
     url : "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY67_CR1,0,45,67_AL_.jpg",
     title:"The Godfather"
    },{
     url : "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UY67_CR0,0,45,67_AL_.jpg",
     title:"The Dark Knight"
    },{
     url : "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_UX45_CR0,0,45,67_AL_.jpg",
     title:"12 Angry Men"
    }];

    private actionSubject:BehaviorSubject<Action>;

    state$:Observable<MovieState>;

    constructor(){
       this.actionSubject = new BehaviorSubject<Action>({type:'init',payload:{}}); 
    }

    ngOnInit(){
      let reducers = [this.voteMovie,this.unVoteMovie];
      let initialState : MovieState = {
        movies : this.movies,
        voted: false
      };
      this.state$ = this.actionSubject.asObservable()
                  .pipe(
                    concatMap(action => from(reducers).pipe(
                      map(reducer => [action,reducer]),
                      reduce((acc,
                        next:[Action,Function]) => next[1](next[0],acc),initialState),
                      )),
                    scan((accState,next) => { return {...accState,...next}},initialState));                                                    
    }

    private static updateMovies(movie:Movie,state:MovieState, updatedState:{isChosen:boolean,chosenText:string}):Array<Movie> {
      return state.movies.map(currentMovie => {
        if(currentMovie.title !== movie.title) {
          return currentMovie;
        }
        return {
          ...currentMovie,
          ...movie,
          ...{chosen:updatedState}
        }
      });
    }

    private voteMovie(action:VoteAction, state:MovieState):MovieState {
      if(action.type === 'User Voted'){
        let moviesUpdated = AppComponent.updateMovies(action.payload.movie,state,{isChosen:true,chosenText:'Chosen!!'});
        return {...state,movies:moviesUpdated,voted:true};      
      }
      return state;    
    }

    unVoteMovie(action:UnVoteAction, state:MovieState):MovieState {
      if(action.type === 'User UnVoted'){
        let  moviesUpdated = AppComponent.updateMovies(action.payload.movie,state,{isChosen:false,chosenText:''});
        return {...state,movies:moviesUpdated,voted:false};
      }
      return state;
    }

    onVote(movie:Movie,voted:boolean):void{
      let action:VoteAction|UnVoteAction = voted ? {type:'User UnVoted',payload:{movie,voted}}
      :{type:'User Voted',payload:{movie,voted}};
      this.actionSubject.next(action);
    }
    
    getButtonText(movie) {
      if(movie.chosen?.isChosen){
        return 'Unvote';
      }
      return 'Vote';
    }

    movieTracker(index:number,movie:Movie){
      return movie.title;
    }
}
