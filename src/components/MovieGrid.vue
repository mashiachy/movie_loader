<template>
    <div>
        <h3>{{title}}</h3>
        <loader v-if="getLoading"></loader>
        <div
                v-else
                class="grid_wrap"
                :style="{
                    gridTemplateColumns: 'repeat(' + columns + ', 1fr)'
                }"
        >
            <movie-card
                    v-for="movie in movies"
                    :key="movie.id"
                    :movie="movie"
                    :width="((1440 + 30) / columns - 30)"
                    :style="{
                        display: 'block',
                    }"
            ></movie-card>
        </div>
    </div>
</template>

<script>
    import movieCard from './MovieCard'
    import loader from './Loader'

    export default {
        name: "MovieGrid",
        props: [
            'title', 'movies', 'columns'
        ],
        components: {
            movieCard,
            loader
        },
        data () {
            return {

            }
        },
        computed: {
            getLoading() {
                return this.$store.getters.getCurrentGenresLoading
            }
        }
    }
</script>

<style scoped lang="stylus">
    div.grid_wrap
        display grid
        grid-column-gap 30px
        grid-row-gap 30px
</style>