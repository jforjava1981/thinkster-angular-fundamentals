import { Injectable } from '@angular/core';
import { BehaviorSubject, concat, from, merge, Observable } from 'rxjs';
import { concatMap, map, mergeAll, reduce, scan, tap } from 'rxjs/operators';
import { Action, UnVoteAction, VoteAction } from './actions';
import { Movie } from './movie';
import { MovieEffects } from './movie.effects';
import { getReducers } from './movie.reducer';

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
    actions$:Observable<Action>;

    constructor(private movieEffects:MovieEffects){
        this.actionSubject = new BehaviorSubject<Action>({type:'init',payload:{}});
        this.actions$  = this.actionSubject.asObservable();
        
        let effects$ = this.actionSubject.asObservable().pipe(this.movieEffects.loadMovieEffect());
        this.movieState$ = merge(this.actions$,effects$)        
        .pipe(
          concatMap(action => from(getReducers())
                              .pipe(
                                map(reducer => [action,reducer])                                
                              )),                              
          scan((accState:MovieState,nextActionReducer:[Action,(action:Action,state:MovieState)=>MovieState]) => {
            return {...accState,...nextActionReducer[1](nextActionReducer[0],accState)};
          },{movies:[],voted:false}));                                                    
    }

    voteForMovie(movie:Movie,voted:boolean){
        let action:VoteAction|UnVoteAction = voted ? {type:'User UnVoted',payload:{movie,voted}}
        :{type:'User Voted',payload:{movie,voted}};
        this.actionSubject.next(action);
    }    
}
