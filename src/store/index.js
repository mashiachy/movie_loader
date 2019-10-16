import Vue from 'vue'
import Vuex from 'vuex'
import movies from './movies'
import currentMovie from "./currentMovie";
import rateIcons from './icon_rates'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        movies,
        currentMovie,
        rateIcons
    }
})