import 'axios'

const axios = require('axios').default;
const base_url = 'https://api.themoviedb.org/3';
const api_key = 'fdabea380fa6fc40a9af9256aa903b7c';
const language = 'ru-RU';
const region = 'RU';


export default {
    getNowPlaying(page) {
        return axios.get(base_url + '/movie/now_playing', {
            params: {
                api_key,
                language,
                page,
                region
            }
        })
    },
    getMovieById(id) {
        return axios.get(base_url + '/movie/' + id, {
            params: {
                api_key,
                language,
                append_to_response: 'videos'
            }
        })
    },
    getMoviesByGenresId(genre_id, page) {
        return axios.get(base_url + '/discover/movie', {
            params: {
                api_key,
                language,
                region,
                sort_by: 'popularity.desc',
                page,
                with_genres: genre_id.join(',')
            }
        })
    },
    getSimilarMoviesById(id, page) {
        return axios.get(base_url + '/movie/' + id + '/similar', {
            params: {
                api_key,
                language,
                page
            }
        })
    },
    getGenres() {
        return axios.get(base_url + '/genre/movie/list', {
            params: {
                api_key,
                language
            }
        })
    }
}