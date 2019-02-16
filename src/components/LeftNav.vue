<template>
    <div>
        <Menu theme="dark" width="250  " class="collapsed-menu" v-show="!isCollapsed"
              :open-names="['1']" accordion>
            <div class="master-logo">
                彩云凭证业务服务平台
            </div>
            <Submenu v-for="item in navList[0].children" :name="item.name" :key="item.id" >
                <template slot="title">
                    <Icon type="ios-paper"/>
                    <span>{{item.name}}</span>
                </template>
                <MenuItem v-for="childItem in item.children" :key="childItem.id" :to="{ path: '/master/' + item.path+ '/' + childItem.path }" :name="childItem.name" >{{childItem.name}}</MenuItem>
            </Submenu>
        </Menu>
        <div id="navShrink" class="master-menu-collapse" v-show="isCollapsed">
            <div class="master-logo">
                <span>彩</span>
            </div>
            <div class="master-menu-collapse-list">
                <div class="master-menu-collapse-item">
                    <Dropdown>
                        <a href="javascript:void(0)">
                            <Icon type="ios-settings"/>
                        </a>
                        <DropdownMenu class="ivu-select-dropdown" slot="list">
                            <DropdownItem>
                                理想回家
                            </DropdownItem>
                            <DropdownItem>
                                理想回家
                            </DropdownItem>
                            <DropdownItem>
                                理想回家
                            </DropdownItem>
                            <DropdownItem>
                                理想回家
                            </DropdownItem>
                            <DropdownItem>
                                理想回家
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LeftNav',
    data () {
        return {

        };
    },
    computed: {
        navList(){
            console.log(this.$store.state.routes.children);
            return this.$store.state.routes
        }
    },
    props: {
    // 控制是否展开导航
        isCollapsed: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style scoped lang="less">
    .master-logo {
        height: 64px;
        background: #fff;
        border-right: 1px solid #eee;
        line-height: 64px;
        font-size: 22px;
        text-align: center
    }

    .master-menu-collapse-list {
        text-align: center;

        i {
            font-size: 28px;
            display: inline-block;
            padding: 10px 0;
            color: #fff;
        }
    }

    .master-menu-collapse-item:hover {
        background-color: rgba(255, 255, 255, .2);
    }

    .collapsed-menu {
        z-index: 1;
        width: 250px;
    }
</style>

<style lang="less">
    /* 对iview中的下拉组件样式重置，添加自己的样式条件，使这条改变不会作用到全局上 */
    .master-menu-collapse-list {
        .ivu-dropdown {
            position: relative;
        }
    }

    .master-menu-collapse-list {
        .ivu-dropdown {
            .ivu-select-dropdown {
                top: 0 !important;
                left: 30px !important;
            }
        }
    }
</style>
