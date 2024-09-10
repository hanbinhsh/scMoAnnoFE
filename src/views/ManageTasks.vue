<template>
  <div class="main-page">
    <MainHeader></MainHeader>
    <section class="fullscreen-section">
      <!-- 批量操作按钮 -->
      <div class="batch-actions">
        <el-button type="primary" @click="showBatchEditDialog" :disabled="selectedTasks.length === 0">
          Batch Edit
        </el-button>
        <el-button type="danger" @click="showBatchDeleteDialog" :disabled="selectedTasks.length === 0">
          Batch Delete
        </el-button>
      </div>

      <!-- 任务列表表格 -->
      <el-table
        :data="paginatedTaskList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
      >
        <!-- 多选功能 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- 显示任务名 -->
        <el-table-column prop="task_name" label="Task Name" sortable></el-table-column>
        <!-- 显示任务开始时间 -->
        <el-table-column prop="start_time" label="Start Time" sortable>
          <template #default="{ row }">
            {{ formatDate(row.start_time) }}
          </template>
        </el-table-column>
        <!-- 显示任务结束时间 -->
        <el-table-column prop="end_time" label="End Time" sortable>
          <template #default="{ row }">
            {{ row.end_time ? formatDate(row.end_time) : "Not completed yet" }}
          </template>
        </el-table-column>
        <!-- 显示任务状态 -->
        <el-table-column prop="status" label="Status" sortable>
          <template #default="{ row }">
            <el-tag :type="statusType(row.status)">{{ statusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <!-- 显示上传者的用户名 -->
        <el-table-column prop="user_name" label="Uploader Name" sortable></el-table-column>
        <!-- 显示上传者的电子邮件 -->
        <el-table-column prop="email" label="Email" sortable></el-table-column>
        <!-- 显示上传者的电话 -->
        <el-table-column prop="phone" label="Phone" sortable></el-table-column>
        <!-- 显示操作列 -->
        <el-table-column fixed="right" label="Operations" width="180">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="showDetailDialog(row)">
              Detail
            </el-button>
            <el-button link type="danger" size="small" @click="showDeleteDialog(row)">
              Delete
            </el-button>
            <el-button link type="warning" size="small" @click="showEditDialog(row)">
              Edit
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="taskList.length"
      >
      </el-pagination>
    </section>

    <!-- 批量删除确认对话框 -->
    <el-dialog v-model="batchDeleteDialogVisible" title="Batch Delete Confirmation" width="500" align-center>
      <span>Are you sure you want to delete the selected tasks?</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="batchDeleteDialogVisible = false">Cancel</el-button>
          <el-button type="danger" @click="confirmBatchDelete">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 批量编辑对话框 -->
    <el-dialog v-model="batchEditDialogVisible" title="Batch Edit Tasks" width="500" align-center>
      <el-form :model="batchEditData" label-width="120px">
        <el-form-item label="New Status">
          <el-select v-model="batchEditData.status" placeholder="Select Status">
            <el-option label="Pending" :value="0"></el-option>
            <el-option label="Processing" :value="1"></el-option>
            <el-option label="Completed" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="batchEditDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirmBatchEdit">Save</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 删除确认对话框 -->
    <el-dialog v-model="deleteDialogVisible" title="Warning" width="500" align-center>
      <span>Task <strong style="color: #e74c3c;">{{ selectedTask.task_name }}</strong> will be deleted</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">Cancel</el-button>
          <el-button type="danger" @click="deleteDialogVisible = false; deleteTask()">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 任务详细信息对话框 -->
    <el-dialog v-model="detailDialogVisible" title="Detail" width="500" align-center>
      <span>{{ selectedTask.details }}</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="detailDialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 编辑任务对话框 -->
    <el-dialog v-model="editDialogVisible" title="Edit Task Status" width="500" align-center>
      <!-- 添加提示信息 -->
      <div style="margin-bottom: 15px; color: #e74c3c; font-size: 12px;">
        Note: When setting the status, the end time will be automatically updated.
      </div>
      <el-form :model="selectedTask" label-width="120px">
        <el-form-item label="Task Name">
          <el-input v-model="selectedTask.task_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="selectedTask.status" placeholder="Select Status">
            <el-option label="Pending" :value="0"></el-option>
            <el-option label="Processing" :value="1"></el-option>
            <el-option label="Completed" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirmEdit">Save</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import MainHeader from "../components/MainHeader.vue";
import axios from "axios";
import { ElMessage } from 'element-plus';

export default {
  name: "WorkSpace",
  components: {
    MainHeader,
  },
  data() {
    return {
      taskList: [],
      paginatedTaskList: [],
      selectedTasks: [],
      deleteDialogVisible: false,
      detailDialogVisible: false,
      editDialogVisible: false,
      batchDeleteDialogVisible: false,
      batchEditDialogVisible: false,
      selectedTask: null,
      batchEditData: { status: null },
      currentPage: 1,
      pageSize: 10,
      sortProp: '', // 当前排序属性
      sortOrder: '' // 当前排序顺序
    };
  },
  methods: {
    showDeleteDialog(task) {
      this.deleteDialogVisible = true;
      this.selectedTask = task;
    },
    showDetailDialog(task) {
      this.detailDialogVisible = true;
      this.selectedTask = task;
    },
    showEditDialog(task) {
      this.editDialogVisible = true;
      this.selectedTask = { ...task }; // 复制任务对象，防止直接修改
    },
    showBatchDeleteDialog() {
      this.batchDeleteDialogVisible = true;
    },
    showBatchEditDialog() {
      this.batchEditDialogVisible = true;
    },
    async confirmEdit() {
      try {
        const params = new URLSearchParams();
        params.append('taskID', this.selectedTask.task_id);
        params.append('status', this.selectedTask.status);

        await axios.post('/api/updateTaskStatus', params);
        this.fetchTaskList();
        ElMessage.success('Task status updated successfully.');
      } catch (error) {
        ElMessage.error('Failed to update task status.');
        console.error("Edit failed:", error);
      } finally {
        this.editDialogVisible = false;
      }
    },
    async deleteTask() {
      try {
        const response = await axios.get("/api/deleteTaskByID?taskID=" + this.selectedTask.task_id);
        ElMessage.success('Delete success.');
        this.fetchTaskList();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    },
    handleSortChange({ prop, order }) {
      this.sortProp = prop;
      this.sortOrder = order;
      this.applySorting();
    },
    applySorting() {
      if (!this.sortProp || !this.sortOrder) {
        this.paginatedTaskList = this.taskList.slice(); // 无排序
        this.updatePaginatedTaskList();
        return;
      }

      const sortedList = this.taskList.slice().sort((a, b) => {
        let result = 0;
        if (a[this.sortProp] > b[this.sortProp]) {
          result = 1;
        } else if (a[this.sortProp] < b[this.sortProp]) {
          result = -1;
        }
        return this.sortOrder === 'ascending' ? result : -result;
      });

      this.taskList = sortedList;
      this.updatePaginatedTaskList();
    },
    async confirmBatchDelete() {
      this.batchDeleteDialogVisible = false;
      for (const task of this.selectedTasks) {
        await this.deleteTaskByID(task.task_id);
      }
      ElMessage.success('Batch delete success.');
      this.fetchTaskList();
    },
    async deleteTaskByID(taskID) {
      try {
        await axios.get("/api/deleteTaskByID?taskID=" + taskID);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    },
    async confirmBatchEdit() {
      this.batchEditDialogVisible = false;
      const newStatus = this.batchEditData.status;
      for (const task of this.selectedTasks) {
        await this.updateTaskStatus(task.task_id, newStatus);
      }
      ElMessage.success('Batch edit success.');
      this.fetchTaskList();
    },
    async updateTaskStatus(taskID, status) {
      try {
        const params = new URLSearchParams();
        params.append('taskID', taskID);
        params.append('status', status);

        await axios.post('/api/updateTaskStatus', params);
      } catch (error) {
        console.error("Update failed:", error);
      }
    },
    async fetchTaskList() {
      try {
        const response = await axios.get("/api/findAllTasksWithUserInformation");
        if (response.data.code === 200) {
          const dataObject = response.data.data;
          this.taskList = Object.values(dataObject);
          this.applySorting(); // 确保数据按照当前排序
        } else {
          console.error("Failed to fetch task list:", response.data.msg);
        }
      } catch (error) {
        console.error("Failed to fetch task list:", error);
      }
    },
    updatePaginatedTaskList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedTaskList = this.taskList.slice(start, end);
    },
    handleSelectionChange(val) {
      this.selectedTasks = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.updatePaginatedTaskList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.updatePaginatedTaskList();
    },
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
    this.fetchTaskList();
  },
};
</script>


<style scoped>
.fullscreen-section {
  display: flex;
  flex-direction: column;
  height: 94vh;
  background-color: #f0f0f0;
  position: relative;
  padding: 30px;
  margin-top: 60px;
  box-sizing: border-box;
}
</style>
