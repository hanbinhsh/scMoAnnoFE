<template>
    <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" :ellipsis="false"
        @select="handleSelect">
        <el-menu-item index="0">
            <img style="width: 50px" src="../assets/logo.png" alt="logo" />
        </el-menu-item>
        <el-menu-item index="1">Login</el-menu-item>
        <el-menu-item index="2">Register</el-menu-item>
        <el-sub-menu index="3">
            <template #title>Workspace</template>
            <el-menu-item index="3-1">item one</el-menu-item>
            <el-menu-item index="3-2">item two</el-menu-item>
            <el-menu-item index="3-3">item three</el-menu-item>
        </el-sub-menu>
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