import { Injectable } from '@angular/core';
import { merge, MonoTypeOperatorFunction, Observable, of, OperatorFunction } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { Action, MoviesLoadedAction } from './actions';
import { MovieService } from './movie.service';

@Injectable({
    providedIn:'root'
})
export class MovieEffects{

    constructor(private movieService:MovieService) {}

    loadMovieEffect():MonoTypeOperatorFunction<Action>{
        let movies$ = this.movieService.getMovies()
        .pipe(map(movies => ({type:'Movies Loaded',payload:{movies}})));
        return source$ => {
            return source$.pipe(filter(action => action.type === 'init'),              
            mergeMap(action => {               
                    return movies$;
            }));
        }
    }
}