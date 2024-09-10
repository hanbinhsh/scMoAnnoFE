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
              <p class="feedback-text">You can submit your feedback below, and we will get your message.</p>
              <el-form ref="feedbackForm" :model="feedbackForm" label-width="120px" class="feedback-form">
                <el-form-item label="Subject" prop="subject">
                  <el-input v-model="feedbackForm.subject" placeholder="Subject" class="input-field"></el-input>
                </el-form-item>
                <el-form-item label="Message" prop="message">
                  <el-input type="textarea" :rows="8" v-model="feedbackForm.message" placeholder="Your Message" class="textarea-field"></el-input>
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
import axios from "axios";
export default {
  components: {
    MainHeader
  },
  data() {
    return {
      userData: JSON.parse(sessionStorage.getItem('userData')) || {},//存用户信息
      feedbackForm: {
        userId: '',
        subject: '',
        message: '',
        createTime: ''
      },
    };
  },
  methods: {
    async submitForm() {
      // 这里可以添加发送表单数据的逻辑
      console.log('Feedback submitted:', this.feedbackForm);
      console.log(this.userData)
      this.feedbackForm.userId = this.userData.userId;
      try{
        await axios.post("/api/feedback", this.feedbackForm)
          .then(response => {
            if (response.data.code === 1){
              alert("The feedback is successful");

            } else{
              console.error("Feedback failed:", response.data.msg);
              alert(response.data.msg);
            }
          })
          .catch(error => {
            console.error("Feedback failed:", error);
          });
      } catch(error) {
        console.error("Feedback failed:", error);
      }
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

.fullscreen-section {
    height: 94%;
}
</style>
