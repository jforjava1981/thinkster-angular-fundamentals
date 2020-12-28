import { MoviesLoadedAction, UnVoteAction, VoteAction } from "./actions";
import { Movie } from './movie';
import { MovieState } from './movie.state';

 const updateMovies = function(movie:Movie,state:MovieState, updatedState:{isChosen:boolean,chosenText:string}):Array<Movie> {
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

const voteMovie = function(action:VoteAction, state:MovieState):MovieState {
    if(action.type === 'User Voted'){
      let moviesUpdated = updateMovies(action.payload.movie,state,{isChosen:true,chosenText:'Chosen!!'});
      return {...state,movies:moviesUpdated,voted:true};      
    }
    return state;    
  }

 const unVoteMovie = function(action:UnVoteAction, state:MovieState):MovieState {
    if(action.type === 'User UnVoted'){
      let  moviesUpdated = updateMovies(action.payload.movie,state,{isChosen:false,chosenText:''});
      return {...state,movies:moviesUpdated,voted:false};
    }
    return state;
  }

  const loadMovies = function(action:MoviesLoadedAction, state:MovieState):MovieState{
    if(action.type === 'Movies Loaded'){
      let  moviesUpdated = [...action.payload.movies];
      return {...state,movies:moviesUpdated};  
    }
    return state;
  }
  
  const reducers = [voteMovie,unVoteMovie,loadMovies] 
  export function getReducers(){
    return reducers;
  }
  