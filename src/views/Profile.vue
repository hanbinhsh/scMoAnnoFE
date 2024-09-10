<template>
  <div class="main-page">
    <MainHeader></MainHeader>
    <section class="profile-section">
      <!-- 背景图片 -->
      <div>
        <img src="@/assets/background/1.png" alt="旋转的图片" class="rotating-image" style="z-index: 5; top: 30%; left: 80%;" />
        <img src="@/assets/background/2.png" alt="旋转的图片" class="rotating-image" style="z-index: 4; top: 30%; left: 80%;" />
        <img src="@/assets/background/3.png" alt="旋转的图片" class="rotating-image" style="z-index: 1; top: 80%; left: 30%;" />
        <img src="@/assets/background/4.png" alt="旋转的图片" class="rotating-image" style="z-index: 3; top: 15%; left: 10%;" />
        <img src="@/assets/background/5.png" alt="旋转的图片" class="rotating-image" style="z-index: 2; top: 15%; left: 10%;" />
      </div>

      <!-- 用户信息卡片 -->
      <el-card class="user-card" shadow="hover" style="z-index: 100;">
        <div class="user-header">
          <!-- 显示头像 -->
          <el-avatar :src="userData.avatar" size="large"></el-avatar>
          <div class="user-info">
            <h2>{{ userData.userName }}</h2>
            <p>{{ userData.email }}</p>
            <p>{{ userData.phone }}</p>
          </div>
        </div>
        <el-button type="primary" size="small" @click="Operation()">Edit Information</el-button>
      </el-card>

      <!-- 编辑对话框 -->
      <el-dialog v-model="editDialogVisible" title="Edit Information" width="500" align-center>
        <el-form :model="User" label-width="100px" label-position="left">
          <!-- 上传头像预览 -->
          <el-form-item label="Avatar">
            <!-- 点击头像预览触发文件选择 -->
            <el-avatar :src="avatarPreview || User.avatar" class="clickable-avatar" @click="triggerFileInput" size="large"></el-avatar>
            <!-- 隐藏的文件输入框 -->
            <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" style="display: none;" />
          </el-form-item>
          <el-form-item label="User Name">
            <el-input v-model="User.userName"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="User.psw" type="password" show-password placeholder="Enter new password"></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="User.email"></el-input>
          </el-form-item>
          <el-form-item label="Phone">
            <el-input v-model="User.phone"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="editDialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="confirmEdit">Save</el-button>
          </div>
        </template>
      </el-dialog>
    </section>
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
      userData: JSON.parse(sessionStorage.getItem('userData')) || {}, // 存储用户信息
      avatarFile: null, // 存储用户选择的头像文件
      avatarPreview: '', // 头像预览URL
    };
  },
  methods: {
    Operation() {
      this.editDialogVisible = true;
      this.User = { ...this.userData, psw: '' }; // 创建用户数据的副本，且密码初始为空
      this.avatarPreview = this.userData.avatar; // 初始化头像预览
    },
    triggerFileInput() {
      this.$refs.fileInput.click(); // 触发隐藏的文件输入框
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.avatarFile = file;
        this.avatarPreview = URL.createObjectURL(file); // 显示头像预览
      }
    },
    async confirmEdit() {
      try {
        // 如果选择了头像文件，则上传文件
        if (this.avatarFile) {
          const formData = new FormData();
          formData.append('avatar', this.avatarFile);
          const uploadResponse = await axios.post(`/api/uploadAvatar`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          this.User.avatar = uploadResponse.data.url; // 更新用户头像URL
        }

        // 保存其他用户信息
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
    }
  },
};
</script>

<style scoped>
.profile-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
  background-color: #f9f9f9;
  padding: 20px;
}

.user-card {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.user-header .el-avatar {
  margin-right: 20px;
}

.user-info h2 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.user-info p {
  margin: 4px 0;
  color: #555;
}

.clickable-avatar {
  cursor: pointer; /* 让鼠标指针在悬停头像时变成点击状态 */
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.el-button {
  margin-left: 10px;
}
</style>
