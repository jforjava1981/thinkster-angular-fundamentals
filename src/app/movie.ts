export interface Movie {
    title:string,
    url:string,
    chosen?: {
        isChosen:boolean,
        chosenText:string
    }
    
}