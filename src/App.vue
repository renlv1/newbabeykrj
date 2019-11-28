<template>
    <div id="app">
        <input type="text" name="username" style="display:none;">
        <input type="checkbox" style="display:none;">
        <input type="password" name="password" style="display:none;">
        <v-header></v-header>
        <router-view/>
    </div>
</template>

<style lang="less">
    @import 'assets/css/reset.css';
    @import 'assets/css/common.less';

    #app {
        font-size: 0.24rem;
        color: #060f26;
    }
</style>

<script>
    import vHeader from '../src/components/header'

    export default {
        components: {
            vHeader
        }
    }
</script>
