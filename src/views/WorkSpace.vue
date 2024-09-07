<template>
  <div class="main-page">
    <MainHeader></MainHeader>
    <section class="fullscreen-section">
      <!-- 任务列表表格 -->
      <el-table :data="taskList" style="width: 100%">
        <el-table-column prop="taskId" label="Task ID" sortable></el-table-column>
        <el-table-column prop="taskName" label="Task Name" sortable></el-table-column>
        <el-table-column prop="startTime" label="Request Time" sortable>
          <template #default="{ row }">
            {{ formatDate(row.startTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="Complete Time" sortable>
          <template #default="{ row }">
            {{ formatDate(row.endTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" sortable>
          <template #default="{ row }">
            <el-tag :type="statusType(row.status)">{{ statusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="details" label="Details"></el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
import MainHeader from "../components/MainHeader.vue";
import axios from "axios";

export default {
  name: "WorkSpace",
  components: {
    MainHeader,
  },
  data() {
    return {
      taskList: [], // 用于存储任务数据
    };
  },
  methods: {
    // 获取任务数据
    async fetchTaskList() {
      try {
        const response = await axios.get("/api/findTasksByUserID?userID=" + "1"); // 这里假设有一个 API 路径 `/api/tasks` 返回任务数据
        if (response.data.code === 200) {
          // 如果返回码是200，表示成功，获取data部分
          this.taskList = response.data.data;
        } else {
          console.error("Failed to fetch task list:", response.data.msg);
        }
      } catch (error) {
        console.error("Failed to fetch task list:", error);
      }
    },
    // 返回状态的文本表示
    statusText(status) {
      switch (status) {
        case 0:
          return "Pending";
        case 1:
          return "Processing";
        case 2:
          return "Completed";
        default:
          return "Unknown";
      }
    },
    // 返回状态的类型，映射到 Element Plus 的 Tag 类型
    statusType(status) {
      switch (status) {
        case 0:
          return "info";
        case 1:
          return "warning";
        case 2:
          return "success";
        default:
          return "";
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleString(undefined, options);
    }
  },
  mounted() {
    this.fetchTaskList(); // 组件挂载后获取任务数据
  },
};
</script>

<style scoped>
.fullscreen-section {
  display: block;
  height: 100vh;
  background-color: #f0f0f0;
  position: relative;
  scroll-snap-align: none;
  padding: 30px;
  margin-top: 60px;
}
</style>
