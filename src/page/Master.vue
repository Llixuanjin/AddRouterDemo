<template>
    <div class="layout">
        <Layout>
            <Sider ref="side" width="250" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <left-nav :is-collapsed="isCollapsed"></left-nav>
            </Sider>
            <Layout class="right-content">
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu"
                          size="24"></Icon>
                    <Breadcrumb>
                        <BreadcrumbItem v-for="(item, index) in routesName" to="/">
                            {{item.name}}
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px', height: '100%'}">
                    <router-view class="page-body"></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    import LeftNav from '@/components/LeftNav';
    export default {
        name: 'Master',
        data () {
            return {
                isCollapsed: false,

                // 用户名-显示
                staffName: '个人中心',
            };
        },
        components: {
            'left-nav': LeftNav
        },
        created () {
        },
        computed: {
            // 图标变化
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },

            // 路由地址数组
            routesName () {
                return this.$store.state.routesName
            }
        },
        methods: {
            collapsedSider () {
                this.$refs.side.toggleCollapse();
            },
        }
    };
</script>

<style scoped>
    .right-content {
        z-index: 100;
        overflow: hidden;
    }

    .master-user-info {
        display: inline-block;
        float: right;
        height: 64px;
        line-height: 64px;
        margin-right: 20px;
    }

    .master-user-info div {
        vertical-align: top;
        padding: 0 10px;
        display: inline-block;
    }

    .master-loginout {
        font-size: 14px;
        padding-left: 0;
        padding-right: 0;
    }

    .master-loginout:focus {
        box-shadow: none;
    }

    .master-user-select div {
        display: inline-block;
    }

    .master-user-select div:first-child i, span {
        display: inline-block;
        vertical-align: top;
    }

    .layout {
        height: 100%;
        background: #f5f7f9;
        position: relative;
        overflow: hidden;
    }

    .layout > div {
        height: 100%;
    }

    .layout-header-bar {
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .layout-header-bar div{
        display: inline-block;
    }

    .menu-icon {
        transition: all .3s;
    }

    .rotate-icon {
        transform: rotate(-90deg);
    }
</style>
