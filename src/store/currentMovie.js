import tmdbApi from '@/api_lib'
import FullMovieInfo from "@/movies_classes/movie_full_info";
import MovieInfo from "@/movies_classes/movie_info";

export default {
    state: {
        movieLoading: false,
        movieInfo: null,
        similarMovies: [],
        similarMoviesLoading: false
    },
    actions: {
        async fetchCurrentMovie ({commit}, payload) {
            try {
                commit('setMovieLoading', true);
                const resp = await tmdbApi.getMovieById(payload);
                let videos = [];
                resp.data.videos.results.forEach(video => {
                    videos.push({
                        name: video.name,
                        site: video.site,
                        key: video.key
                    });
                });
                commit('setCurrentMovie', {
                    id: resp.data.id,
                    title: resp.data.title,
                    poster: resp.data.poster_path,
                    backdrop: resp.data.backdrop_path,
                    date: resp.data.release_date,
                    genre: resp.data.genres,
                    rate: resp.data.vote_average,
                    description: resp.data.overview,
                    videos,
                    countries: resp.data.production_countries
                });
                commit('setMovieLoading', false);
            } catch (error) {
                commit('setMovieLoading', false);
            }
        },
        async fetchSimilarMovies ({commit}, payload) {
            try {
                commit('setSimilarMoviesLoading', true);
                commit('setEmptySimilarMovies', true);
                const resp = await tmdbApi.getSimilarMoviesById(payload, 1);
                console.log(resp.data.results);
                resp.data.results.forEach(movie => {
                    commit('addSimilarMovie', {
                        id: movie.id,
                        title: movie.title,
                        poster: movie.poster_path,
                        date: movie.release_date,
                        genre: movie.genre_ids,
                        rate: movie.vote_average,
                        description: movie.overview
                    })
                });
                commit('setSimilarMoviesLoading', false);
            } catch (error) {
                commit('setSimilarMoviesLoading', false);
            }
        }
    },
    mutations: {
        setMovieLoading (state, payload) {
            state.movieLoading = payload
        },
        setCurrentMovie (state, payload) {
            state.movieInfo = new FullMovieInfo(
                payload.id,
                payload.title,
                payload.poster,
                payload.backdrop,
                payload.date,
                payload.genre,
                payload.rate,
                payload.description,
                payload.videos,
                payload.countries
            )
        },
        addSimilarMovie (state, payload) {
            state.similarMovies.push(new MovieInfo(
                payload.id,
                payload.title,
                payload.poster,
                payload.date,
                payload.genre,
                payload.rate,
                payload.description
            ))
        },
        setEmptySimilarMovies(state) {
            state.similarMovies.splice(0, state.similarMovies.length);
        }
    },
    getters: {
        currentMovie (state) {
            return state.movieInfo;
        },
        getMovieLoading (state) {
            return state.movieLoading;
        },
        getSimilarMovies (state) {
            return state.similarMovies;
        }
    }
}