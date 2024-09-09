<template>
    <div class="main-page">
      <MainHeader></MainHeader>
      <section class="fullscreen-section">
        <el-descriptions title="User Information" direction="vertical" :column="5" border>
      <el-descriptions-item label="User Name">{{ userData.userName }}</el-descriptions-item>
      <el-descriptions-item label="Email" :span="2">{{ userData.email }}</el-descriptions-item>
      <el-descriptions-item label="Phone">{{ userData.phone }}</el-descriptions-item>
      <el-descriptions-item label="Operation">
        <div>
        <el-button type="primary" size="small" @click="Operation()">Information Change</el-button>
        </div>
      </el-descriptions-item>
      </el-descriptions>
    </section>
    <!-- 编辑对话框 -->
    <el-dialog v-model="editDialogVisible" title="Information Change" width="500">
      <el-form :model="User" label-width="100px" label-position="left">
        <el-form-item label="User Name" class="form-item">
          <el-input v-model="User.userName" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="Password" class="form-item">
          <el-input
            v-model="User.psw"
            type="password"
            show-password
            placeholder="Enter new password"
            class="form-input"
          ></el-input>
        </el-form-item>
        <el-form-item label="Email" class="form-item">
          <el-input v-model="User.email" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="Phone" class="form-item">
          <el-input v-model="User.phone" class="form-input"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirmEdit">Save</el-button>
        </div>
      </template>
    </el-dialog>
    </div>
</template>
  
  <script>

import MainHeader from "../components/MainHeader.vue";
import axios from "axios";
import { ElMessage } from 'element-plus';

  export default {
    name: "Profile",
    components: {
      MainHeader,
    },
    data() {
      return {
        editDialogVisible: false,
        User: null,
        userData: JSON.parse(sessionStorage.getItem('userData')) || {},//存用户信息
      };
    },
    methods: {
     Operation(){
      this.editDialogVisible = true;
      this.User = { ...this.userData, psw: '' }; // 创建用户数据的副本，且密码初始为空
     },
     async confirmEdit() {
      try {
        await axios.post(`/api/updateUser`, this.User);
        const response = await axios.post('/api/findUserByUserId', { userId: this.User.userId });
        sessionStorage.setItem('userData', JSON.stringify(response.data.data));
        window.location.reload();
        ElMessage.success('User updated successfully.');
      } catch (error) {
        ElMessage.error('Failed to update user.');
        console.error("Edit failed:", error);
      } finally {
        this.editDialogVisible = false;
      }
    },
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
  