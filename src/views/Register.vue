<template>
    <div class="gray-bg">
      <el-row class="middle-box text-center loginscreen animated fadeInDown">
        <el-col :span="24">
          <img style="width: 300px;height: 250px;object-fit: cover;" src="../assets/logo.png" alt="" class="img-responsive">
        </el-col>
      </el-row>
      <el-row class="text-center loginscreen animated fadeInDown" style="max-width: 600px;margin: 0 auto;">
        <el-col :span="24">
          <el-card class="ibox">
            <template #header>
              <div class="ibox-content">
                <h2>注册文档之翼账号</h2>
                <p>注册账号以管理文件</p>
              </div>
            </template>
            <el-steps :active="activeStep" finish-status="success">
              <el-step title="账户"></el-step>
              <el-step title="个人信息"></el-step>
              <el-step title="用户协议"></el-step>
              <el-step title="提交注册"></el-step>
            </el-steps>
            <el-form ref="form" :model="form" label-width="80px">
              <div v-if="activeStep === 0">
                <el-form-item label="用户名 *" prop="userName" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
                  <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码 *" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
                  <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码 *" prop="confirm" :rules="[{ required: true, message: '请再次输入密码', trigger: 'blur' }]">
                  <el-input type="password" v-model="form.confirm"></el-input>
                </el-form-item>
              </div>
              <div v-if="activeStep === 1">
                <el-form-item label="姓名 *" prop="name" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="电话号码 *" prop="phone" :rules="[{ required: true, message: '请输入电话号码', trigger: 'blur' }]">
                  <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="电子邮件 *" prop="email" :rules="[{ required: true, message: '请输入电子邮件', trigger: 'blur' }]">
                  <el-input v-model="form.email"></el-input>
                </el-form-item>
              </div>
              <div v-if="activeStep === 2">
                <el-checkbox v-model="form.acceptTerms">我同意<a href="#">用户协议</a>和<a href="#">隐私政策</a></el-checkbox>
              </div>
              <div v-if="activeStep === 3">
                <el-button type="primary" @click="submitForm">提交注册</el-button>
              </div>
            </el-form>
            <el-button style="margin-top: 12px" @click="next">Next step</el-button>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="text-center loginscreen animated fadeInDown" style="max-width: 500px;margin: 0 auto;">
        <el-col :span="24">
          <p class="text-muted text-center"><small>已有帐号?</small></p>
          <el-button type="text" href="login">登录</el-button>
          <el-button type="text" href="/">返回首页</el-button>
        </el-col>
      </el-row>
    </div>
</template>
  
<script>
import { ref } from 'vue';
// import toastr from "../assets/js/plugins/toastr/toastr.min.js"
// toastr.options = {
//     "closeButton": true,
//     "debug": false,
//     "progressBar": true,
//     "preventDuplicates": true,
//     "positionClass": "toast-bottom-center",
//     "onclick": null,
//     "showDuration": "400",
//     "hideDuration": "1000",
//     "timeOut": "3000",
//     "extendedTimeOut": "1000",
//     "showEasing": "swing",
//     "hideEasing": "linear",
//     "showMethod": "fadeIn",
//     "hideMethod": "fadeOut"
// }
  
export default {
    name: 'RegisterForm',
    setup() {
        const form = ref({
            userName: '',
            password: '',
            confirm: '',
            name: '',
            phone: '',
            email: '',
            isAdmin: false,
            acceptTerms: false
        });
        const activeStep = ref(0);
        const next = () => {
            if (activeStep.value++ > 2) activeStep.value = 0
        }
        const submitForm = () => {
        // Form submission logic here
        };
        return {
            form,
            activeStep,
            submitForm,
            next
        };
    }
}
</script>