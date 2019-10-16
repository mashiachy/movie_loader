export default class FullMovieInfo {
    constructor(id, title, poster, backdrop, date, genre, rate, description, videos, countries) {
        this.id = id;
        this.title = title;
        this.poster = 'https://image.tmdb.org/t/p/w500' + poster;
        this.backdrop = 'https://image.tmdb.org/t/p/original' + backdrop;
        this.year = date.slice(0, 4);
        this.genre = genre;
        this.rate = rate;
        this.description = description;
        this.videos = videos;
        this.countries = countries;
    }
}