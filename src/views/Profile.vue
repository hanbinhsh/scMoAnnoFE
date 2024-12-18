<template>
  <div class="main-page">
    <MainHeader></MainHeader>
    <section class="profile-section">
      <div>
        <!-- 背景图 -->
        <img src="@/assets/background/1.png" alt="mainpage" class="rotating-image"
          style="z-index: 5; top: 30%; left: 80%;" />
        <img src="@/assets/background/2.png" alt="mainpage" class="rotating-image"
          style="z-index: 4; top: 30%; left: 80%;" />
        <img src="@/assets/background/3.png" alt="mainpage" class="rotating-image"
          style="z-index: 1; top: 80%; left: 30%;" />
        <img src="@/assets/background/4.png" alt="mainpage" class="rotating-image"
          style="z-index: 3; top: 15%; left: 10%;" />
        <img src="@/assets/background/5.png" alt="mainpage" class="rotating-image"
          style="z-index: 2; top: 15%; left: 10%;" />
      </div>

      <!-- 用户信息卡片 -->
      <el-card class="user-card" shadow="hover" style="z-index: 100;">
        <div class="user-header">
          <!-- 显示头像 -->
          <el-avatar :src="userData.avatarBase64 ? 'data:image/jpeg;base64,' + userData.avatarBase64 : defaultAvatar"
            size="large"></el-avatar>
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
          <!-- 头像预览 -->
          <el-form-item label="Avatar">
            <el-avatar :src="avatarPreview" size="large" class="avatar-preview clickable-avatar" @click="triggerFileInput"></el-avatar>
            <input type="file" ref="fileInput" style="display: none;" @change="handleFileChange" />
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
import logo from '../assets/logo.png';

export default {
  name: "Profile",
  components: {
    MainHeader,
  },
  data() {
    return {
      editDialogVisible: false,
      User: null,
      avatarFile: null,
      defaultAvatar: logo,
      avatarPreview: '', // 用于头像预览的 Base64 字符串
      userData: JSON.parse(sessionStorage.getItem('userData')) || {},
    };
  },
  methods: {
    Operation() {
      this.editDialogVisible = true;
      this.User = { ...this.userData, psw: '' }; // 创建用户数据的副本，且密码初始为空
      this.avatarPreview = this.userData.avatarBase64 ? 'data:image/jpeg;base64,' + this.userData.avatarBase64 : '';
    },
    async confirmEdit() {
      try {
        const formData = new FormData();
        for (const key in this.User) {
          formData.append(key, this.User[key]);
        }
        if (this.avatarFile) {
          formData.append('avatar', this.avatarFile);
        }
        formData.delete('avatarBase64')
        await axios.post(`/api/updateUser`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        const response = await axios.post('/api/findUserByUserId', { userId: this.User.userId });
        const updatedUser = response.data;
        sessionStorage.setItem('userData', JSON.stringify(updatedUser));
        window.location.reload()
        ElMessage.success('User updated successfully.');
      } catch (error) {
        ElMessage.error('Failed to update user.');
        console.error("Edit failed:", error);
      } finally {
        this.editDialogVisible = false;
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.processImage(file);
      }
    },
    processImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const size = 256;

          // 计算缩放比例
          const scale = Math.max(img.width / size, img.height / size);
          const x = (img.width / 2) - (size / 2) * scale;
          const y = (img.height / 2) - (size / 2) * scale;

          canvas.width = size;
          canvas.height = size;
          ctx.drawImage(img, x, y, size * scale, size * scale, 0, 0, size, size);
          this.avatarPreview = canvas.toDataURL('image/jpeg');
          canvas.toBlob((blob) => {
            this.avatarFile = new File([blob], file.name, { type: 'image/jpeg' });
          });
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
  },
  mounted() {
    this.avatarPreview = this.userData.avatarBase64 ? 'data:image/jpeg;base64,' + this.userData.avatarBase64 : '';
  },
};
</script>

<style scoped>
.profile-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
}

.dark-mode .profile-section {
  background-color: #2c2c2c;
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

.dark-mode .user-info p {
  margin: 4px 0;
  color: #ddd;
}

.clickable-avatar {
  cursor: pointer;
  /* 让鼠标指针在悬停头像时变成点击状态 */
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
