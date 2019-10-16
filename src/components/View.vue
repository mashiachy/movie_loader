<template>
    <div>
        <div
                class="video_view"
                :style="{
                    backgroundImage: 'url(' + movie.backdrop + ')'
                }"
        >
            <div
                    class="container"
                    @mouseenter="isChoicesVisible = true"
                    @mouseleave="isChoicesVisible = false"
            >
                <iframe
                        :src="'https://www.youtube.com/embed/' + currentVideo.key + ''"
                        frameborder="0"
                        width="100%"
                        height="100%"
                ></iframe>
                <div
                        class="video_choices"
                        v-if="isChoicesVisible"
                >
                    <div
                            class="video_choice"
                            v-for="(video, i) in movie.videos"
                            :key="i"
                            :class="{'active_choice': currentVideoChoice === i}"
                            @click="currentVideoChoice = i"
                    >
                        {{video.name}}
                    </div>
                </div>
            </div>
        </div>
        <div
                class="container"
                v-if="getLoadingMovie"
        >
            <loader></loader>
        </div>
        <div
                class="container info_view"
                v-else
        >
            <div class="movie_info">
                <div class="info_header">
                    <h2>
                        <b>
                            {{movie.title}}
                        </b>
                        {{movie.year}}
                    </h2>
                </div>
                <div class="info_rate">
                    <h2>
                        {{movie.rate}}
                    </h2>
                </div>
                <div class="info_countries">
                    <span><b>Страны:</b></span>
                    <span
                            v-for="(country, i) in movie.countries"
                            :key="i"
                    >
                        {{country.name}}<span v-if="i !== (movie.countries.length - 1)">,</span>
                    </span>
                </div>
                <div class="info_genres">
                    <span><b>Жанры:</b></span>
                    <span
                            v-for="(genre, i) in movie.genre"
                            :key="i"
                    >
                        {{genre.name}}<span v-if="i !== (movie.genre.length - 1)">,</span>
                    </span>
                </div>
                <div class="info_description">
                    {{movie.description}}
                </div>
            </div>
            <div
                    class="poster"
                    :style="{
                        backgroundImage: 'url(' + movie.poster + ')'
                    }"
            ></div>
        </div>
        <div class="container similar_movies">
            <loader
                    v-if="getSimilarMoviesLoading"
            ></loader>
            <movie-carousel
                    v-else
                    :movies="similarMovies"
                    title="Похожие"
                    line-movies="6"
                    count-movies="20"
            ></movie-carousel>
        </div>
    </div>
</template>

<script>
    import movieCarousel from './MovieCarousel'
    import loader from './Loader'

    export default {
        name: 'View',
        props: [
            'id'
        ],
        data () {
            return {
                isChoicesVisible: false,
                currentVideoChoice: 0
            }
        },
        methods: {

        },
        components: {
            loader,
            movieCarousel
        },
        computed: {
            movie () {
                return this.$store.getters.currentMovie;
            },
            getLoadingMovie () {
                return this.$store.getters.getMovieLoading;
            },
            currentVideo () {
                return this.movie.videos[this.currentVideoChoice];
            },
            getSimilarMoviesLoading () {
                return this.$store.getters.getSimilarMoviesLoading;
            },
            similarMovies () {
                return this.$store.getters.getSimilarMovies;
            }
        },
        mounted () {
            this.$store.dispatch('fetchCurrentMovie', this.id);
            this.$store.dispatch('fetchSimilarMovies', this.id);
        },
        watch: {
            $route (toR, fromR) {
                this.id = toR.params['id'];
                this.$store.dispatch('fetchCurrentMovie', this.id);
                this.$store.dispatch('fetchSimilarMovies', this.id);
            }
        }
    }
</script>

<style scoped lang="stylus">
    div.video_view
        display block
        height 1440px * (9 / 16)
        background-color black
        background-size cover
        background-position center
        div.container
            height 100%
            position relative
            background-color rgba(16, 16, 16, 0.5)
            div.video_choices
                border-left white solid 2px
                display flex
                flex-direction column
                position absolute
                top 50%
                transform translateY(-50%)
                div.video_choice
                    cursor pointer
                    color white
                    padding 1em 2em
                    &:hover
                        background-color rgba(9, 9, 9, 0.75)
                div.active_choice
                    background-color rgba(5, 5, 5, 0.9)
    div.info_view
        display grid
        grid-template-columns 1fr 400px
        grid-column-gap 100px
        div.poster
            float right
            width 400px
            margin-top 2.656em
            background-size cover
            background-position center
            height (@width / 0.669)
        div.movie_info
            div.info_genres
                margin-top 0.5em
            div.info_description
                margin-top 1em
</style>