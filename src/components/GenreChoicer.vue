<template>
    <div class="choicer_wrap">
        <h3>Жанры фильмов</h3>
        <loader v-if="getLoading"></loader>
        <div v-else>
            <div
                    class="choice_item"
                    v-for="choice in choices"
                    :key="choice.id"
                    :class="{'active_item': (choiced.indexOf(choice.id) !== -1) }"
                    @click="addChoice(choice.id)"
            >
                {{choice.name}}
            </div>
        </div>
    </div>
</template>

<script>
    import loader from './Loader'
    export default {
        name: "GenreChoicer",
        components: {
            loader,
        },
        data () {
            return {
                choiced: [35]
            }
        },
        computed: {
            choices() {
                return this.$store.getters.getGenres
            },
            getLoading() {
                return this.$store.getters.getGenreLoading;
            }
        },
        methods: {
            addChoice (id) {
                if (this.choiced.indexOf(id) === -1)
                    this.choiced.push(id);
                else
                    this.choiced.splice(this.choiced.indexOf(id), 1);
                this.$emit('updategenres', this.choiced);
            }
        }
    }
</script>

<style scoped lang="stylus">
    div.choicer_wrap
        div.choice_item
            display inline-block
            padding 1em 4em 1em 0
            &:hover
                color red
                cursor pointer
        div.active_item
            color red
            font-weight bold
</style>