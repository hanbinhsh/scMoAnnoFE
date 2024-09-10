<template>
    <el-menu :default-active="activeIndex" class="el-menu main-header" mode="horizontal" :ellipsis="false"
        @select="handleSelect" :router="true">
        <el-menu-item index="HomeView" :class="{ 'is-active': activeIndex === 'HomeView' }">
            <img style="width: 50px" src="../assets/logo.png" alt="logo" />
        </el-menu-item>
        <el-menu-item index="Login" :class="{ 'is-active': activeIndex === 'Login' }" v-if="!userData.userName">
            Login
        </el-menu-item>
        <el-menu-item index="Register" :class="{ 'is-active': activeIndex === 'Register' }" v-if="!userData.userName">
            Register
        </el-menu-item>
        <el-sub-menu v-if="userData.userName" index="">
            <template #title>
                <el-avatar
                    :src="userData.avatarBase64 ? 'data:image/jpeg;base64,' + userData.avatarBase64 : defaultAvatar"
                    size="small"></el-avatar>&nbsp;
                {{ userData.userName }}
            </template>
            <el-menu-item index="Profile" :class="{ 'is-active': activeIndex === 'Profile' }"
                id="Profile">Profile</el-menu-item>
            <el-menu-item @click="logout()">Log out</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="ManageUser" :class="{ 'is-active': activeIndex === 'ManageUser' }"
            v-if="userData?.isAdmin">
            <strong>ManageUser</strong>
        </el-menu-item>
        <el-menu-item index="ManageTasks" :class="{ 'is-active': activeIndex === 'ManageTasks' }"
            v-if="userData?.isAdmin">
            <strong>ManageTasks</strong>
        </el-menu-item>
        <el-menu-item index="ManageFeedback" :class="{ 'is-active': activeIndex === 'ManageFeedback' }"
            v-if="userData.userName && userData.isAdmin">
            <strong>ManageTasks</strong>
        </el-menu-item>
        <el-menu-item index="WorkSpace" :class="{ 'is-active': activeIndex === 'WorkSpace' }" id="WorkSpase"
            v-if="userData.userName">
            WorkSpace
        </el-menu-item>
        <el-menu-item index="Upload" :class="{ 'is-active': activeIndex === 'Upload' }" v-if="userData.userName">
            Upload
        </el-menu-item>
        <el-menu-item index="Example" :class="{ 'is-active': activeIndex === 'Example' }">
            Example
        </el-menu-item>
        <el-menu-item index="Feedback" :class="{ 'is-active': activeIndex === 'Feedback' }" v-if="userData.userName">
            Feedback
        </el-menu-item>
    </el-menu>
</template>

<script>
import logo from '../assets/logo.png';

export default {
    name: "MainHeader",
    data() {
        return {
            activeIndex: "", // 当前激活的菜单项
            defaultAvatar: logo,
            userData: JSON.parse(sessionStorage.getItem('userData')) || {},
        };
    },
    methods: {
        handleSelect(index) {
            this.activeIndex = index; // 选择菜单项时更新当前激活项
        },
        logout() {
            window.sessionStorage.clear();
            this.$router.push('/Login');
        }
    },
    watch: {
        // 监听路由变化，更新激活菜单项
        $route(to) {
            this.activeIndex = to.name;
        },
    },
    mounted() {
        this.activeIndex = this.$route.name;
    },
};
</script>

<style scoped>
.el-menu--horizontal>.el-menu-item:nth-child(1) {
    margin-right: auto;
}

.el-menu {
    position: fixed;
    z-index: 1000;
    width: 100%;
    border-bottom: 0px;
}

.main-header {
    background: linear-gradient(0deg, rgba(255, 255, 255, 0), #ffffff);
}
</style>