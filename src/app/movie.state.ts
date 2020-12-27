import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { concatMap, map, reduce, scan } from 'rxjs/operators';
import { Action, UnVoteAction, VoteAction } from './actions';
import { Movie } from './movie';
import { getReducers } from './movie.reducer';
import { MovieService } from './movie.service';

export interface MovieState {
    movies:Array<Movie>;
    voted:boolean
}

@Injectable({
    providedIn:'root'
})
export class MovieStateManager {
    
    private actionSubject:BehaviorSubject<Action>;
    movieState$:Observable<MovieState>;

    constructor(private movieService:MovieService){
        let initialState : MovieState = {
            movies : this.movieService.getMovies(),
            voted: false
        };    
        this.actionSubject = new BehaviorSubject<Action>({type:'init',payload:{}}); 
        this.movieState$ = this.actionSubject.asObservable()
        .pipe(
          concatMap(action => from(getReducers()).pipe(
                              map(reducer => [action,reducer]),
                              reduce((acc,
                                nextActionReducer:[Action,Function]) => nextActionReducer[1](nextActionReducer[0],acc),initialState),
                              )),
          scan((accState,next) => { return {...accState,...next}},initialState));                                                    

    }

    voteForMovie(movie:Movie,voted:boolean){
        let action:VoteAction|UnVoteAction = voted ? {type:'User UnVoted',payload:{movie,voted}}
        :{type:'User Voted',payload:{movie,voted}};
  
        this.actionSubject.next(action);
    }    
}
