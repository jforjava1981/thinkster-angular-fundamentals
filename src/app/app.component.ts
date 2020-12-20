import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Movie } from './movie';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent {
 
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

    private stateSubject:Subject<{movies:Array<Movie>,voted:boolean}>;
    
    initialState : {movies:Array<Movie>,voted:boolean} = {
      movies : this.movies,
      voted: false
    }     

    state$:Observable<{movies:Array<Movie>,voted:boolean}>;

    constructor(){
      this.stateSubject = 
       new BehaviorSubject<{movies:Array<Movie>,voted:boolean}> (this.initialState);
       this.state$ = this.stateSubject.asObservable(); 
    }

    private updateMovies(movie:Movie, updatedState:{isChosen:boolean,chosenText:string}):Array<Movie> {
      return this.initialState.movies.map(currentMovie => {
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

    private voteMovie(movie:Movie) {
      let moviesUpdated = this.updateMovies(movie,{isChosen:true,chosenText:'Chosen!!'});
      return {...this.initialState,movies:moviesUpdated,voted:true};      
    }

    unVoteMovie(movie:Movie) {
      let  moviesUpdated = this.updateMovies(movie,{isChosen:false,chosenText:''});
      return {...this.initialState,movies:moviesUpdated,voted:false};
    }

    onVote(movie:Movie,voted:boolean) {
      let newState;
      if(voted === true) { //already voted
        newState = this.unVoteMovie(movie);
      }else{
        newState = this.voteMovie(movie);
      }
      this.stateSubject.next(newState);
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
