import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Master from '@/page/Master'
import Index from "@/page/home/Index";
import Test from "@/page/Test";
import Test11 from "@/page/test1/Test11";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
        meta:{
            'keepAlive': false,
            'requireAuth': true
        }
    },
      // {
      //     id: 2,
      //     path: "/master",
      //     component: Master,
      //     name: "员工资料",
      //     iconCls: "fa fa-user-circle-o",
      //     children: [
      //         {
      //             id: 0,
      //             path: "home",
      //             component: Test,
      //             name: "系统管理",
      //             iconCls: null,
      //             children: [{
      //                 id: 0,
      //                 path: "index",
      //                 component: Index,
      //                 name: "Index",
      //                 iconCls: null,
      //                 meta: {
      //                     "keepAlive": false,
      //                     "requireAuth": true
      //                 }
      //             }],
      //             meta: {
      //                 "keepAlive": false,
      //                 "requireAuth": true
      //             }
      //         }]
      // }
  ]
})
