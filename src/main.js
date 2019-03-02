// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import networkAPI from './assets/NetworkAPI';
import iView from 'iview';
import {initMenu, formatRoutes} from './assets/addRouter'

import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.prototype.NetworkAPI = networkAPI;

Vue.use(iView);

router.beforeEach((to, from, next) => {
    if (to.name === 'Login') {
        next();
        return;
    }
    // 判断登录状态
    let name = store.state.user.name;
    if (name === '未登录') {
        if (to.meta.requireAuth || to.name == null) {
            next({path: '/', query: {redirect: to.path}})
        } else {
            next();
        }
    } else {
        initMenu(router, store);
        console.log(to)
        store.commit('updateRoutesName', to.matched);
        next();
    }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
