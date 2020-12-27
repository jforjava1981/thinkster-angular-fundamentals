import { Movie } from './movie';

export interface Action {
    type:string;
    payload:any;
}

export interface VoteAction extends Action{
    type:'User Voted',
    payload:{movie:Movie,voted:boolean}
}

export interface UnVoteAction extends Action{
    type:'User UnVoted',
    payload:{movie:Movie,voted:boolean}
}