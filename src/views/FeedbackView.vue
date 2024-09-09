<template>
  <el-container class="container">
    <el-header class="header">
      <!-- 导航栏内容 -->
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">Home</el-menu-item>
        <el-menu-item index="2">Products</el-menu-item>
        <el-menu-item index="3">Services</el-menu-item>
        <el-menu-item index="4">Contact Us</el-menu-item>
        <el-menu-item index="5" style="float: right;">
          <el-button type="text" class="nav-button">Login</el-button>
        </el-menu-item>
        <el-menu-item index="6" style="float: right;">
          <el-button type="text" class="nav-button">Register</el-button>
        </el-menu-item>
      </el-menu>
    </el-header>

    <el-main class="main-content">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-card class="feedback-card">
            <div slot="header" class="card-header">
              <span>Feedback</span>
            </div>
            <div class="card-body">
              <p class="feedback-text">You can submit your feedback below, and we will get your message</p>
              <el-form ref="feedbackForm" :model="feedbackForm" label-width="120px" class="feedback-form">
                <el-form-item label="Subject">
                  <el-input v-model="feedbackForm.subject" placeholder="Subject" class="input-field"></el-input>
                </el-form-item>
                <el-form-item label="Message">
                  <el-input type="textarea" :rows="4" v-model="feedbackForm.message" placeholder="Your Message" class="textarea-field"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm" class="submit-button">Send Message</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      feedbackForm: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    };
  },
  methods: {
    submitForm() {
      // 这里可以添加发送表单数据的逻辑
      console.log('Feedback submitted:', this.feedbackForm);
      // 重置表单
      this.$refs.feedbackForm.resetFields();
    }
  }
};
</script>

<style scoped>
.container {
  font-family: 'Arial', sans-serif;
}

.header {
  background-color: #409eff;
  color: white;
  padding: 0 50px;
}

.nav-button {
  color: white;
  font-weight: bold;
}

.main-content {
  padding: 50px;
}

.feedback-card {
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.card-body {
  padding: 20px;
}

.feedback-text {
  color: #666;
  font-size: 16px;
}

.contact-info {
  color: #409eff;
  font-size: 14px;
  margin-bottom: 20px;
}

.input-field,
.textarea-field {
  border-radius: 4px;
}

.submit-button {
  width: 100%;
  border-radius: 4px;
  font-size: 16px;
  padding: 10px 20px;
}
</style>
