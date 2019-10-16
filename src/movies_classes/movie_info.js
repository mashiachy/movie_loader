export default class MovieInfo {
    constructor(id, title, poster, date, genre, rate, description) {
        this.id = id;
        this.title = title;
        this.poster = 'https://image.tmdb.org/t/p/w342' + poster;
        this.year = date.slice(0, 4);
        this.genre = genre;
        this.rate = rate;
        this.description = description;
    }
}