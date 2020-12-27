import { Injectable } from "@angular/core";
import { BehaviorSubject, from, Observable } from 'rxjs';
import { concatMap, map, reduce, scan } from 'rxjs/operators';
import { Action, UnVoteAction, VoteAction } from './actions';
import { Movie } from './movie';
import { MovieState } from './movie.state';

@Injectable({
    providedIn:'root'
})
export class MovieService {
    
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

    movieState$:Observable<MovieState>;

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
          let moviesUpdated = MovieService.updateMovies(action.payload.movie,state,{isChosen:true,chosenText:'Chosen!!'});
          return {...state,movies:moviesUpdated,voted:true};      
        }
        return state;    
      }
  
      private unVoteMovie(action:UnVoteAction, state:MovieState):MovieState {
        if(action.type === 'User UnVoted'){
          let  moviesUpdated = MovieService.updateMovies(action.payload.movie,state,{isChosen:false,chosenText:''});
          return {...state,movies:moviesUpdated,voted:false};
        }
        return state;
      }
  

    constructor(){
        let reducers = [this.voteMovie,this.unVoteMovie];
        let initialState : MovieState = {
            movies : this.movies,
            voted: false
        }    
        this.actionSubject = new BehaviorSubject<Action>({type:'init',payload:{}}); 
        this.movieState$ = this.actionSubject.asObservable()
        .pipe(
          concatMap(action => from(reducers).pipe(
            map(reducer => [action,reducer]),
            reduce((acc,
              next:[Action,Function]) => next[1](next[0],acc),initialState),
            )),
          scan((accState,next) => { return {...accState,...next}},initialState));                                                    

    }

    voteForMovie(movie:Movie,voted:boolean){
      let action:VoteAction|UnVoteAction = voted ? {type:'User UnVoted',payload:{movie,voted}}
      :{type:'User Voted',payload:{movie,voted}};

      this.actionSubject.next(action);
    }
}