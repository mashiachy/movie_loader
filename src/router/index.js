import Vue from 'vue';
import Router from 'vue-router';
import Afisha from "@/components/Afisha";
import View from "@/components/View";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/afisha',
            name: 'afisha',
            component: Afisha
        },
        {
            path: '/view/:id',
            name: 'view',
            component: View,
            props: true
        }
    ],
    mode: 'history'
})