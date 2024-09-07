<template>
  <div class="login-page">
    <div class="login-box">
      <div class="login-page-header">
        <div class="header-logo">
          <img class="logo" src="../assets/logo.png" alt="Logo" />
        </div>
        <h1 class="title">Sign in to scMoAnno</h1>
        <h4 class="subtitle">
          Don't have your account yet?
          <a href="/Register">Register now</a>
        </h4>
      </div>
      <div class="login-page-body">
        <el-form :model="loginForm" ref="loginForm">
          <el-form-item prop="username"
            :rules="[{ required: true, message: 'Please input username', trigger: 'blur' }]">
            <el-input v-model="loginForm.username" placeholder="Username" class="input-field"></el-input>
          </el-form-item>
          <el-form-item prop="password"
            :rules="[{ required: true, message: 'Please input password', trigger: 'blur' }]">
            <el-input v-model="loginForm.password" type="password" placeholder="Password"
              class="input-field"></el-input>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <el-button type="primary" class="submit-button" @click="submitForm('loginForm')">Sign in to
          scMoAnno</el-button>
        <div class="backHome">
          <a href="/HomeView">Home</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from 'vue-router';
const router = useRouter();
export default {
  name: "LoginView",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async submitForm() {
      const response = await axios.post('/api/login', { userName: this.loginForm.username, password: this.loginForm.password });
      if(response.data.code == 200) {
        sessionStorage.setItem('userData', JSON.stringify(response.data.data));
        window.location.href = '/HomeView';
      }       
      else
        this.$alert('<strong>' + response.data.msg + '</strong>', "login failed", {
          dangerouslyUseHTMLString: true
        });
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
  padding: 0 20px;
}

.login-box {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.header-logo .logo {
  width: 120px;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 14px;
  color: #888;
  margin-bottom: 30px;
}

.input-field {
  width: 100%;
  height: 40px;
  margin-bottom: 0px;
  border-radius: 4px;
}

.submit-button {
  width: 100%;
  height: 40px;
  margin-top: 20px;
  font-size: 16px;
}

.backHome {
  margin-top: 20px;
  font-size: 14px;
}

.backHome a {
  color: #409eff;
  text-decoration: none;
}

.backHome a:hover {
  text-decoration: underline;
}
</style>