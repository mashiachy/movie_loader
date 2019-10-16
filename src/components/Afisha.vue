<template>
    <div class="container afisha-wrap">
        <h2>Афиша</h2>
        <loader
            v-if="getLoading"
        ></loader>
        <movie-carousel
            v-else
            :movies="moviesForLine"
            title="Сейчас в кино"
            count-movies="20"
            line-movies="6"
        ></movie-carousel>
        <genre-choices
            @updategenres="updateGenres"
        ></genre-choices>
        <movie-grid
            title="Ваша подборка"
            :movies="moviesForGrid"
            columns="6"
        ></movie-grid>
    </div>
</template>

<script>
    import movieCarousel from './MovieCarousel'
    import movieGrid from './MovieGrid'
    import genreChoices from './GenreChoicer'
    import loader from './Loader'

    export default {
        name: 'Afisha',
        data: () => ({
            genre: [35]
        }),
        components: {
            movieCarousel,
            genreChoices,
            movieGrid,
            loader
        },
        methods: {
            updateGenres(payload) {
                this.genre = payload;
                this.$store.dispatch('fetchFilmsByGenre', this.genre);
            }
        },
        computed: {
            moviesForLine() {
                return this.$store.getters.nowPlayingMovies;
            },
            moviesForGrid() {
                return this.$store.getters.currentGenresMovies;
            },
            getLoading() {
                return this.$store.getters.getNowPlayingLoading;
            }
        },
        created () {
            this.$store.dispatch('fetchNowPlayingFilms');
            this.$store.dispatch('fetchGenres');
        },
        mounted () {
            this.$store.dispatch('fetchFilmsByGenre', this.genre);
        }
    }
</script>

<style scoped>

</style>