import { Movie } from './movie';

export interface VoteEvent{
    movie:Movie;
    voted:boolean
}