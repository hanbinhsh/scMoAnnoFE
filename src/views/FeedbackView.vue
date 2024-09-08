<template>
  <el-container class="main-page">
    <MainHeader></MainHeader>
    <el-main class="fullscreen-section">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-card class="feedback-card">
            <div slot="header" class="card-header">
              <span>Feedback</span>
            </div>
            <div class="card-body">
              <p class="feedback-text">You can submit your feedback below, and we will send your message to:</p>
              <p class="contact-info">John Doe, john.doe@example.com or Jane Smith, jane.smith@example.com</p>
              <el-form ref="feedbackForm" :model="feedbackForm" label-width="120px" class="feedback-form">
                <el-form-item label="Name">
                  <el-input v-model="feedbackForm.name" placeholder="Your Name" class="input-field"></el-input>
                </el-form-item>
                <el-form-item label="E-Mail">
                  <el-input v-model="feedbackForm.email" placeholder="Your Email" class="input-field"></el-input>
                </el-form-item>
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
import MainHeader from "../components/MainHeader.vue"
export default {
  components: {
    MainHeader
  },
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
.nav-button {
  color: white;
  font-weight: bold;
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
