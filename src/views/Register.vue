<template>
    <div class="gray-bg">
      <el-row class="middle-box text-center loginscreen animated fadeInDown" type="flex" justify="center">
        <el-col :span="4">
          <img style="width: 300px;height: 250px;object-fit: cover;" src="../assets/logo.png" alt="" class="img-responsive">
        </el-col>
      </el-row>
      <el-row class="text-center loginscreen animated fadeInDown" style="max-width: 600px;margin: 0 auto;">
        <el-col :span="24">
          <el-card class="ibox">
            <template #header>
              <div class="ibox-content">
                <h2>Sign up for a scMoAnno account</h2>
                <p>Sign up for an account to log in to the system</p>
              </div>
            </template>
            <el-steps :active="activeStep" finish-status="success">
              <el-step title="Account"></el-step>
              <el-step title="Information"></el-step>
              <el-step title="Agreement"></el-step>
              <el-step title="Submit"></el-step>
            </el-steps>
            <el-form ref="Form" :model="form" label-width="80px">
              <div v-if="activeStep === 0">
                <el-form-item label="UserName" prop="userName" :rules="[{validator: userName, trigger: 'blur'}]">
                  <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password" :rules="[{validator: validatePass, trigger: 'blur' }]">
                  <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Confirm" prop="confirm" :rules="[{validator: validatePass2, trigger: 'blur' }]">
                  <el-input type="password" v-model="form.confirm" autocomplete="off"></el-input>
                </el-form-item>
              </div>
              <div v-if="activeStep === 1">
                <el-form-item label="Phone" prop="phone" :rules="[{validator: phone, trigger: 'blur' },]" >
                  <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email" :rules="[{validator: email, trigger: 'blur' }]">
                  <el-input v-model="form.email"></el-input>
                </el-form-item>
              </div>
              <el-row v-if="activeStep === 2">
                <el-checkbox v-model="form.acceptTerms">I agree<a href="#"> User Agreement</a> and <a href="#">Privacy Policy</a></el-checkbox>
              </el-row>
            </el-form>
            <el-row type="flex" justify="space-between">
                <el-row>
                    <el-button v-if="activeStep>0" style="margin-top: 12px" @click="previous">Previous step</el-button>
                </el-row>
                <el-row>
                    <el-button v-if="activeStep<3" style="margin-top: 12px" @click="next">Next step</el-button>
                </el-row>
                <el-row v-if="activeStep === 3">
                    <el-button style="margin-top: 12px" type="primary" @click="submitForm">Submit </el-button>
                </el-row>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="text-center loginscreen animated fadeInDown" style="max-width: 500px;margin: 0 auto;">
        <el-col :span="24">
          <p class="text-muted text-center"><small>Already have an account?</small></p>
          <el-button type="text" @click="goToLogin">login</el-button>
          <el-button type="text" @click="goToHome">Return to Home</el-button>
        </el-col>
      </el-row>
    </div>
</template>
  

<script>
import { ref } from 'vue';
import { reactive } from 'vue';
import axios from "axios";
import { useRouter } from 'vue-router';

export default {
    name: 'RegisterForm',
    setup() {
        const form = reactive({
            userName: '',
            password: '',
            checkPass: '',
            phone: '',
            email: '',
            isAdmin: 0,
            acceptTerms: false
        });
        const activeStep = ref(0);
        const goToHome = () =>{
          router.push({ name: 'Login' });
        };
        const goToLogin = () =>{
          router.push({ name: 'HomeView' });
        };
        const next = () => {
            if(activeStep.value===0){
                if (form.userName && form.password && form.confirm) {
                    if(form.password === form.confirm){
                        activeStep.value++;
                    }
                } else {
                    alert('Please fill in the information!');
                    return false;
                }
            } else if (activeStep.value === 1) {
                if (form.phone && form.email) {
                  const reg = /^[1][3-9][0-9]{9}$/;
                  const emailRegExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
                  const emailRegExp1 = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                  if (!reg.test(form.phone) || !emailRegExp.test(form.email) || !emailRegExp1.test(form.email)) {
                    console.log('Error submit!!');
                    return false;
                  } else {
                    activeStep.value++;
                  }
                  // activeStep.value++;
                } else {
                    console.log('Error submit!!');
                    return false;
                }
            } else if (activeStep.value === 2) {
                if (form.acceptTerms) {
                    activeStep.value++;
                } else {
                    alert("Please accept the terms and policiesc!");
                    console.log('Error submit!!');
                    return false;
                }
            }
        };
        const previous = () => {
            activeStep.value--
        };
        const userName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter a username'))
            } else {
                callback()
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please input the password'))
            } else {
                callback()
            }
        };
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please input the password again'))
            } else if (value !== form.password) {
                callback(new Error("Two inputs don't match!"))
            } else {
                callback()
            }
        };
        const phone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter a phone number'))
            } else if(value){
                const reg = /^[1][3-9][0-9]{9}$/;
                if (!reg.test(value)){
                  callback(new Error('Please input correct phone number'))
                }
            }
            else {
                callback()
            }
        };
        const email = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your email'))
            } else if(value){
                const emailRegExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
                const emailRegExp1 = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (!emailRegExp.test(value) || !emailRegExp1.test(value)){
                  callback(new Error('Please input correct email address'))
                }
            }
              else {
                callback()
            }
        };
        const router = useRouter();
        const submitForm = () => {
          const formData  = {
            userName: form.userName,
            psw: form.password,
            email: form.email,
            isAdmin: form.isAdmin,
            phone: form.phone
          };
          try {
            // 使用 axios.post 方法发送 POST 请求
            axios.post("/api/register", formData)
              .then(response => {
                if (response.data.code === 1) {
                  // 如果返回码是1，表示成功
                  activeStep.value++
                  alert("Registration is successful");
                  setTimeout(() => {
                    router.push({ name: 'Login' });
                  }, 2000);
                } else {
                  console.error("Registration failed:", response.data.msg);
                  alert(response.data.msg);
                }
              })
              .catch(error => {
                console.error("Registration failed:", error);
              });
          } catch (error) {
            console.error("Registration failed:", error);
          }
            
        };
        return {
            form,
            activeStep,
            submitForm,
            next,
            previous,
            userName,
            validatePass,
            validatePass2,
            phone,
            email,
            goToHome,
            goToLogin,

        };
    }
}
</script>