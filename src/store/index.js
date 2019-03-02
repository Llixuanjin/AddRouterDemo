import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {
            name: window.localStorage.getItem('user' || '[]') == null ? '没有登录' : JSON.parse(window.localStorage.getItem('user' || '[]')).name,
            userface: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).userface
        },
        routes: [],

        routesName: [],
    },
    mutations: {
        login(state, user){
            state.user = user;
            window.localStorage.setItem('user', JSON.stringify(user));
        },
        logout(state){
            window.localStorage.removeItem('user');
        },
        initMenu(state, fmtRoutes){
            state.routes = fmtRoutes;
        },

        updateRoutesName (state, routesName) {
            state.routesName = routesName
        }
    }
});
