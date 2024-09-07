<template>
    <div class="login-page">
        <div class="login-box">
            <div class="login-page-header">
                <div class="header-logo">
                    <img style="width: 120px" src="../assets/logo.png">
                </div>

                <h1 style="font-weight:500;">Sign in to scMoAnno</h1>
                <h4 style="font-weight:500;">Don't have your account yet? <a href="/Register">Register now</a></h4>
            </div>
            <div class="login-page-body">
                <div class="username-input">
                    <div class="input-message" style="font-weight:bold;">username</div>
                    <input class="username" v-modle="loginForm.username">
                </div>
                <div class="password-input">
                    <div class="input-message" style="font-weight:bold;">password</div>
                    <input class="password" v-modle="loginForm.password" type="password">
                </div>
                <el-divider></el-divider>
                <div class="submit">
                    <input class="submit" type="submit" value="Sign in to scMoAnna" @click="submitForm('loginForm')">
                </div>
                <div class="backHome">
                    <a href="/HomeWiew">Home</a>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
export default {
    name: 'LoginView',
    data() {
        return {
            loginForm: {
                username: '',
                password: '',
            },
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('提交成功!');
                    
                } else {
                    console.log('error submit!!');
                    return false;


                }
            });
        },
    }
}
</script>

<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    margin: 0;
}

.login-box {
    border: solid 1px lightgrey;
    width: 600px;
    height: 700px;
    padding-top: 20px;
    padding-right: 20px;
}

.login-page-header {
    text-align: center;
}

.header-logo {
    margin: 20px;
}

.login-page-body {
    text-align: center;
}

.input-message {
    margin-left: -450px;
}

.username {
    width: 520px;
    height: 40px;
    margin: 20px;
    font-size: 20px;
}

.password {
    width: 520px;
    height: 40px;
    margin: 20px;
    font-size: 20px;
}

.password-input {
    margin-top: 20px;
}

.submit {
    width: 520px;
    height: 40px;
    margin-left: 20px;
    font-size: 20px;

}
.backHome {
    margin:20px;
}
</style>