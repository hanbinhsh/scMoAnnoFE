<template>
    <div class="main-page">
      <MainHeader></MainHeader>
      <section class="fullscreen-section">
        <el-descriptions title="User Information" direction="vertical" :column="4" border>
      <template #extra>
        <el-button type="primary" size="small" @click="Operation()">Operatiion</el-button> <!-- 操作按钮 -->
      </template>
      <el-descriptions-item label="User Name">{{ userData.userName }}</el-descriptions-item>
      <el-descriptions-item label="Email" :span="2">{{ userData.email }}</el-descriptions-item>
      <el-descriptions-item label="Phone">{{ userData.phone }}</el-descriptions-item>
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
     Operation(){
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:
            /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确',
        })
          .then(({ value }) => {
            this.$message({
              type: 'success',
              message: '你的邮箱是: ' + value,
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入',
            })
          })
     }
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
  