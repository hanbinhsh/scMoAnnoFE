<template>
    <div class="main-page">
      <MainHeader></MainHeader>
      <section class="fullscreen-section">
      <el-descriptions class="margin-top" title="User Information" :column="3" :size="size" border>
      <template #extra>
        <el-button type="primary" size="small">Operatiion</el-button> <!-- 操作按钮 -->
      </template>
      <el-descriptions-item>
        <template #label>
            <i class="el-icon-user" ></i>
            User Name
        </template>
        {{ userData.userName }}
      </el-descriptions-item>
      <el-descriptions-item>
      <template #label>
        <i class="el-icon-mail"></i>
        Email
      </template>
      {{ userData.email }}
      </el-descriptions-item>
      <el-descriptions-item>
      <template #label>
        <i class="el-icon-mobile-phone"></i>
        Phone
      </template>
      {{ userData.phone }}
      </el-descriptions-item>
      </el-descriptions>
    </section>
    </div>
</template>
  
  <script>
  import MainHeader from "../components/MainHeader.vue";
  import axios from "axios";
  
  export default {
    name: "Profile",
    components: {
      MainHeader,
    },
    data() {
      return {
        userData: JSON.parse(sessionStorage.getItem('userData')) || {},//存用户信息
      };
    },
    methods: {
     
    },
    mounted() {

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
  