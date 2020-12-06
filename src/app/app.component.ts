import { Component } from '@angular/core';
import { Movie } from './movie';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  movies:Array<Movie> = [{
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

    voted:boolean = false;

    constructor(){
    }
    
    
    onVote(movie:Movie) {
      if(this.voted === true) { //already voted
        this.voted = false;
        movie.chosen.isChosen = false;
        movie.chosen.chosenText = "";
      }else{
        this.voted = true;
        movie.chosen = {isChosen:true, chosenText:'Chosen!!'};
      }
    }
    
    getButtonText(movie) {
      if(movie.chosen?.isChosen){
        return 'Unvote';
      }
      return 'Vote';
    }

}
