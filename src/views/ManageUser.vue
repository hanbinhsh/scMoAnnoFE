<template>
    <div class="main-page">
      <MainHeader></MainHeader>
      <section class="fullscreen-section">
        <!-- 任务列表表格 -->
        <el-table :data="userList" style="width: 100%">
          <el-table-column prop="userName" label="User Name" sortable></el-table-column>
          <el-table-column prop="email" label="Email" sortable></el-table-column>
          <el-table-column prop="phone" label="Phone" sortable></el-table-column>
          <el-table-column prop="isAdmin" label="Admin" sortable></el-table-column>
        </el-table>
      </section>
    </div>
  </template>
  
  <script>
  import MainHeader from "../components/MainHeader.vue";
  import axios from "axios";
  
  export default {
    name: "WorkSpace",
    components: {
      MainHeader,
    },
    data() {
      return {
        userList: [], // 用于存储任务数据
      };
    },
    methods: {
      // 获取任务数据
      async fetchUserList() {
        try {
          const response = await axios.get("/api/findUsers"); // 这里假设有一个 API 路径 `/api/tasks` 返回任务数据
          if (response.data.code === 200) {
            // 如果返回码是200，表示成功，获取data部分
            this.userList = response.data.data;
          } else {
            console.error("Failed to fetch task list:", response.data.msg);
          }
        } catch (error) {
          console.error("Failed to fetch task list:", error);
        }
      },
    },
    mounted() {
      this.fetchUserList(); // 组件挂载后获取任务数据
    },
  };
  </script>
  
  <style scoped>
  .fullscreen-section {
    display: block;
    height: 100vh;
    background-color: #f0f0f0;
    position: relative;
    scroll-snap-align: none;
    padding: 30px;
    margin-top: 60px;
  }
  </style>
  