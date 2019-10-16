import tmdbApi from '@/api_lib'
import MovieInfo from "@/movies_classes/movie_info";

export default {
    state: {
        nowPlayingLoading: false,
        currentGenresLoading: false,
        genresLoading: false,
        nowPlayingMovies: [],
        currentGenresMovies: [],
        genres: []
    },
    actions: {
        async fetchGenres({commit}) {
            try {
                commit('setGenresLoading', true);
                const resp = await tmdbApi.getGenres();
                commit('setGenres', resp.data.genres);
                commit('setGenresLoading', false);
            } catch (error) {
                commit('setGenresLoading', true);
            }
        },
        async fetchNowPlayingFilms ({commit}) {
            try {
                commit('setNowPlayingLoading', true);
                commit('setEmptyNowPlayingFilms');
                const resp = await tmdbApi.getNowPlaying(1);
                resp.data.results.forEach(movie => {
                    commit('addNewNowPlayingFilm', {
                        id: movie.id,
                        title: movie.title,
                        poster: movie.poster_path,
                        date: movie.release_date,
                        genre: movie.genre_ids,
                        rate: movie.vote_average,
                        description: movie.overview
                    })
                });
                commit('setNowPlayingLoading', false);
            } catch (error) {
                commit('setNowPlayingLoading', true);
            }
        },
        async fetchFilmsByGenre ({commit}, payload) {
            try {
                commit('setCurrentGenresLoading', true);
                commit('setEmptyGenresFilms');
                const resp = await tmdbApi.getMoviesByGenresId(payload, 1);
                resp.data.results.forEach(movie => {
                    commit('addNewCurrentGenresFilm', {
                        id: movie.id,
                        title: movie.title,
                        poster: movie.poster_path,
                        date: movie.release_date,
                        genre: movie.genre_ids,
                        rate: movie.vote_average,
                        description: movie.overview
                    })
                });
                commit('setCurrentGenresLoading', false);
            } catch (error) {
                commit('setCurrentGenresLoading', false);
            }
        }
    },
    mutations: {
        addNewNowPlayingFilm (state, payload) {
            state.nowPlayingMovies.push(new MovieInfo(
                payload.id,
                payload.title,
                payload.poster,
                payload.date,
                payload.genre,
                payload.rate,
                payload.description
            ))
        },
        addNewCurrentGenresFilm (state, payload) {
            state.currentGenresMovies.push(new MovieInfo(
                payload.id,
                payload.title,
                payload.poster,
                payload.date,
                payload.genre,
                payload.rate,
                payload.description
            ))
        },
        setEmptyNowPlayingFilms (state) {
            state.nowPlayingMovies.splice(0, state.nowPlayingMovies.length);
        },
        setEmptyGenresFilms (state) {
            state.currentGenresMovies.splice(0, state.currentGenresMovies.length);
        },
        setGenres (state, payload) {
            state.genres = payload;
        },
        setNowPlayingLoading (state, payload) {
            state.nowPlayingLoading = payload
        },
        setCurrentGenresLoading (state, payload) {
            state.currentGenresLoading = payload
        },
        setGenresLoading (state, payload) {
            state.genresLoading = payload
        }
    },
    getters: {
        currentGenresMovies(state) {
            return state.currentGenresMovies;
        },
        nowPlayingMovies(state) {
            return state.nowPlayingMovies;
        },
        getGenres(state) {
            return state.genres;
        },
        getGenreNameById(state) {
            return id => {
                return state.genres.find(genre => genre.id == id).name
            }
        },
        getNowPlayingLoading(state) {
            return state.nowPlayingLoading;
        },
        getGenreLoading(state) {
            return state.genresLoading;
        },
        getCurrentGenresLoading(state) {
            return state.currentGenresLoading;
        }
    }
}