import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from "@/page/Login";

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta:{
            'requireAuth': false
        }
    },
      {
          path: '/login',
          name: 'Login',
          component: Login,
          meta:{
              'requireAuth': false
          }
      },
  ]
})
