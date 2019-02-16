import NetworkAPI from "./NetworkAPI";

/**
 * 初始化路由
 * @param router 路由对象
 * @param store vuex仓库对象
 */
export const initMenu = (router, store)=> {
    if (store.state.routes.length > 0) {
        return;
    }
    // 请求路由列表，请求工具随意使用
    NetworkAPI.post("test",null, (data) => {
        console.log(data);
        let fmtRoutes = formatRoutes(data,0);
        console.log(fmtRoutes);
        router.addRoutes(fmtRoutes);
        store.commit('initMenu', fmtRoutes);
    })
};

/**
 * 将JSON数组数组转为路由数组  一级目录没有组件对应，每个一级目录都对应使用中间组件进行过渡，中间组件再使用路由显示二级目录组件
 * 只有一级目录不需要level参数
 * @param routes JSON数组
 * @param level 数组层级，0为master层，1为一级目录层，直接使用中间组件，2为二级目录层根据一级目录去找文件夹下的组件
 * @return {Array}
 */
export const formatRoutes = (routes, level)=> {
    let fmRoutes = [];
    routes.forEach(router=> {
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;
        console.log(children);
        if (children && children instanceof Array) {
            children = formatRoutes(children,level + 1);
        }
        let fmRouter = {
            path: path,
            // 根据获取到的数据，找到路由对应的组件，匹配组件根据实际情况而定，比如：导航只有一级不需要使用中间的过渡组件
            // 使用了node.js的require.resolve 方法操作文件
            component(resolve){
                console.log(component + level);
                if (component.startsWith("Master")) {
                    require(['../page/Master.vue'], resolve)
                } else if (level === 1) {
                        require(['../page/Test.vue'], resolve)
                } else {
                    require(['../page/' + meta.fatherName + '/' + component + '.vue'], resolve);
                    // console.log(meta.fatherName)
                    // if (meta.fatherName === 'Home') {
                    //     console.log(123)
                    //     require(['../page/home/' + component + '.vue'], resolve)
                    // } else if (meta.fatherName === 'Test1') {
                    //     require(['../page/test1/' + component + '.vue'], resolve)
                    // } else if (meta.fatherName === 'Test2') {
                    //     require(['../page/test2/' + component + '.vue'], resolve)
                    // } else if (meta.fatherName === 'Test3') {
                    //     require(['../page/test3/' + component + '.vue'], resolve)
                    // }
                }
            },
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children
        };
        fmRoutes.push(fmRouter);
    });
    return fmRoutes;
};
