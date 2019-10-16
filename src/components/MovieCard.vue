<template>
    <div
        class="card"
        :style="{
            width: width + 'px',
            minHeight: 'calc(' + widht * 0.699 + ' + 3em)',

        }"
    >
        <div
                class="card_poster"
                :style="{
                    backgroundImage: 'url(' + movie.poster + ')',
                    height: width / 0.669 + 'px'
                }"
                @mouseover="hover = true"
                @mouseleave="hover = false, isDescriptionVisible = false"
        >
            <div class="card_icons">
                <svg
                        @click="isWish = !isWish"
                        v-if="isWish"
                        style="width:24px;height:24px"
                        viewBox="0 0 24 24"
                >
                    <path fill="#000000" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                </svg>
                <svg
                        @click="isWish = !isWish"
                        v-else
                        style="width:24px;height:24px"
                        viewBox="0 0 24 24"
                >
                    <path fill="#000000" d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
                </svg>
                <svg
                        style="width:24px;height:24px"
                        viewBox="0 0 24 24"
                >
                    <path fill="#000000" :d="rate" />
                </svg>
                <svg
                        @click="isDescriptionVisible = !isDescriptionVisible"
                        style="width:24px;height:24px"
                        viewBox="0 0 24 24"
                >
                    <path fill="#000000" d="M21,6V8H3V6H21M3,18H12V16H3V18M3,13H21V11H3V13Z" />
                </svg>
                <router-link
                        tag="svg"
                        :to="'/view/' + movie.id"
                        v-if="!isDescriptionVisible"
                        style="width:56px;height:56px"
                        viewBox="0 0 24 24"
                >
                    <path fill="#000000" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                </router-link>
            </div>
            <div
                v-if="hover && isDescriptionVisible"
                class="card_description"
                :style="{
                    width: (width - 24) + 'px'
                }"
            >
                <div class="text">
                    {{movie.description}}
                </div>
                <router-link
                        tag="span"
                        :to="'/view/' + movie.id"
                >
                    Подробнее...
                </router-link>
            </div>
        </div>
        <router-link
                tag="div"
                :to="'/view/' + movie.id"
                class="card_header"
        >
            {{movie.title}}
        </router-link>
        <router-link
                tag="div"
                :to="'/view/' + movie.id"
                class="card_subheader"
        >
            {{movie.year}}, {{nameGenreFromId(movie.genre[0])}}
        </router-link>
    </div>
</template>

<script>
    export default {
        props: [
            'movie', 'width'
        ],
        data: () => ({
            isWish: false,
            hover: false,
            isDescriptionVisible: false
        }),
        computed: {
            nameGenreFromId () {
                return id =>
                    this.$store.getters.getGenreNameById(id)
            },
            rate () {
                return this.$store.getters.getRateSvg(this.movie.rate)
            }
        },
        methods: {}
    }
</script>

<style scoped  lang="stylus">
    div.card
        &:hover
            cursor pointer
            div.card_poster
                div.card_icons
                    position absolute
                    left 0
                    top 0
                    display block
                    height 100%
                    width 100%
                    background-color rgba(25, 25, 25, 0.8)
                    svg
                        position absolute
                        path
                            fill white
                        $mg = 10px
                        &:nth-child(1)
                            top $mg
                            left $mg
                        &:nth-child(2)
                            &:hover
                                path
                                    fill white
                            top $mg
                            right $mg
                        &:nth-child(3)
                            bottom $mg
                            right $mg
                        &:nth-child(4)
                            top 50%
                            left 50%
                            transform translate(-50%, -50%)
                        &:hover
                            path
                                fill red
            div.card_header
                color red
            div.card_subheader
                color indianred
        position relative
        vertical-align top
        div.card_description
            position absolute
            bottom 44px
            left 12px
            color red
            font-size 14px
            line-height @font-size * 1.4
            height @line-height * 6
            white-space normal
            div.text
                color white
                height @line-height * 5
                overflow hidden
        div.card_poster
            display block
            background-color white
            background-size cover
            background-position center
            background-repeat no-repeat
            width 100%
            position relative
            div.card_icons
                display none
        div.card_header
            font-size 18px
            font-weight 400
            line-height @font-size * 1.2
            margin-top @font-size * 0.8
            white-space normal
        div.card_subheader
            margin-top 6px
            font-size 14px
            font-weight 300
            line-height @font-size * 1.2
</style>