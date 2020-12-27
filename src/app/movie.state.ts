import { Movie } from './movie';
export interface MovieState {
    movies:Array<Movie>;
    voted:boolean
}