<template>
    <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" :ellipsis="false"
        @select="handleSelect" router="true">
        <el-menu-item index="HomeView">
            <img style="width: 50px" src="../assets/logo.png" alt="logo" />
        </el-menu-item>
        <el-menu-item index="login">Login</el-menu-item>
        <el-menu-item index="2">Register</el-menu-item>
        <el-menu-item index="WorkSpace">Workspace</el-menu-item>
    </el-menu>
</template>

<style>
.el-menu--horizontal>.el-menu-item:nth-child(1) {
    margin-right: auto;
}
.el-menu{
    position: fixed;
    z-index: 1000;
    width: 100%;
}
</style>

<script>
export default {
    name: 'MainHeader'
}
</script>