<template>
    <div class="carousel_wrap">
        <h3>{{title}}</h3>
        <div
                class="line_card carousel"
                :style="{
                    left: '-' + curState * (1440 + 30) + 'px'
                }"
        >
            <movie-card
                    v-for="movie in movies"
                    :key="movie.id"
                    :movie="movie"
                    :width="((1440 + 30) / lineMovies - 30)"
                    :style="{
                        display: 'inline-block',
                        marginRight: '30px'
                    }"
            ></movie-card>
        </div>
        <div class="nav_carousel">
            <a
                    @click="scrollCarousel(-1)"
                    :data-active="curState !== 0"
            >
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                </svg>
            </a>
            <a
                    @click="scrollCarousel(1)"
                    :data-active="curState !== countStates"
            >
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#000000" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
            </a>
        </div>
    </div>
</template>

<script>
    import movieCard from './MovieCard'
    export default {
        name: "MovieCarousel",
        props: [
            'title', 'countMovies', 'movies', 'lineMovies'
        ],
        data () {
            return {
                curState: 0
            }
        },
        computed: {
            countStates () {
                return Math.floor(this.movies.length / this.lineMovies)
            }
        },
        components: {
            movieCard
        },
        methods: {
            scrollCarousel(side) {
                if (!(this.curState === 0 && side === -1 ||
                      this.curState === this.countStates && side === 1)) {
                    this.curState += side;
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    div.carousel_wrap
        overflow hidden
        position relative
        div.carousel
            position relative
            top 0
            left 0
            white-space nowrap
            transition left .4s
        div.nav_carousel
            position absolute
            top 56px
            right 0
            a
                background-color lightgray
                svg
                    path
                        fill darkgrey
                &[data-active="true"]
                    cursor pointer
                    background-color white
                    svg
                        path
                            fill black
                    &:hover
                    &:active
                        svg
                            path
                                fill red
                    &:active
                        background-color darkgray
                display inline-block
                height 24px
                width 24px
                &:nth-child(1)
                    border-bottom-left-radius 3px
                    border-top-left-radius 3px
                    border-right 1px solid black
                &:nth-child(2)
                    border-bottom-right-radius 3px
                    border-top-right-radius 3px
                    border-left 1px solid black
</style>