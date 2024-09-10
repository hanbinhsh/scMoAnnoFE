<template>
  <div class="main-page">
    <MainHeader></MainHeader>
    <section class="fullscreen-section">
      <el-table :data="feedbackList" style="width: 100%">
        <!-- 用户头像列 -->
        <el-table-column label="Avatar" width="80">
          <template #default="{ row }">
            <el-avatar :size="50" :src="row.avatarBase64 ? 'data:image/jpeg;base64,' + row.avatarBase64 : ''"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="user_name" label="User Name" sortable></el-table-column>
        <el-table-column prop="email" label="User Email" sortable></el-table-column>
        <el-table-column prop="phone" label="User Phone" sortable></el-table-column>
        <el-table-column prop="subject" label="Subject" sortable></el-table-column>
        <el-table-column prop="created_time" label="Create Time" width="180">
          <template #default="{ row }">
            {{ formatDate(row.created_time) }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Operations" width="180">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="showMessageDialog(row)">
              Message
            </el-button>
            <el-button link type="danger" size="small" @click="showDeleteDialog(row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!-- 删除确认对话框 -->
    <el-dialog v-model="deleteDialogVisible" title="Warning" width="500" align-center>
      <span>Feedback <strong style="color: #e74c3c;">{{ selectedFeedback.subject }}</strong> will be deleted</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">Cancel</el-button>
          <el-button type="danger" @click="deleteDialogVisible = false; deleteFeedback(selectedFeedback.feedback_id)">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 详情对话框 -->
    <el-dialog v-model="messageDialogVisible" title="Message" width="500" align-center>
      <span>{{ selectedFeedback.message }}</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="messageDialogVisible = false">Confirm</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import MainHeader from "../components/MainHeader.vue"
import { ref } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';

export default {
  name: 'FeedbackPage',
  components: {
    MainHeader
  },
  data() {
    return {
      feedbackList: [],
      deleteDialogVisible: false,
      messageDialogVisible: false,
      selectedFeedback: [],
    };
  },
  methods: {
    showDeleteDialog(feedback) {
      this.deleteDialogVisible = true;
      this.selectedFeedback = feedback;
    },
    showMessageDialog(feedback) {
      this.messageDialogVisible = true;
      this.selectedFeedback = feedback;
    },
    showMessageDialog(feedback) {
      this.messageDialogVisible = true;
      this.selectedFeedback = feedback;
    },
    async fetchFeedbacks() {
      try {
        const response = await axios.get('/api/findAllFeedbackWithUserInformation');
        if (response.data.code === 200) {
          const dataObject = response.data.data;
          this.feedbackList = Object.values(dataObject);
          // this.applySorting();
          // feedbackList.value = response.data.feedbacks;
        } else {
          console.error('Failed to fetch feedbacks:', response.data.msg);
        }
      } catch (error) {
        console.error('Failed to fetch feedbacks:', error);
      }
    },
    async deleteFeedback(feedbackId) {
      // console.log(feedbackId)
      try {
        const response = await axios.delete(`/api/deleteFeedback/${feedbackId}`);
        if (response.data.code === 1) {
          // 从列表中移除被删除的反馈
          ElMessage.success('Feedback deleted successfully');
          this.fetchFeedbacks();
        } else {
          console.error('Failed to delete feedback:', response.data.msg);
          ElMessage.error(response.data.msg);
        }
      } catch (error) {
        console.error('Failed to delete feedback:', error);
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleString(undefined, options);
    }
  },
  mounted() {
    this.fetchFeedbacks();
  },
};
</script>