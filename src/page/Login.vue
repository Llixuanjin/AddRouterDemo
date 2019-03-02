<template>
    <div style="text-align: center; padding-top: 60px">
    <button @click="jumpMaster" style="font-size: 22px; padding: 5px 30px">登录</button>
    </div>
</template>

<script>
    export default {
        name: "Login",
        methods: {
            jumpMaster() {
                this.$router.push('/master');
            }
        }
    }
</script>

<style scoped>

</style>
