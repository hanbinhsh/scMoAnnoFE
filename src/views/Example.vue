<template>
  <div class="main-page">
    <MainHeader></MainHeader>
    <section class="content">
      <div class="chart-container">
        <div id="main" class="chart"></div>
        <div class="table-container">
          <el-table :data="paginatedData" stripe style="width: 100%;">
            <el-table-column prop="index" label="ID" width="70" sortable></el-table-column>
            <el-table-column prop="coord" label="Position" sortable>
              <template #default="{ row }">
                {{ `(${row.coord[0]}, ${row.coord[1]})` }}
              </template>
            </el-table-column>
            <el-table-column prop="label" label="Label" sortable></el-table-column>
          </el-table>
          <el-pagination background layout="prev, pager, next" :total="totalItems" :page-size="pageSize"
            :current-page="currentPage" @current-change="handlePageChange" class="page-control"></el-pagination>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import MainHeader from "../components/MainHeader.vue";
import { initializeChart } from "../assets/example_data/example.js";
import { data } from "../assets/example_data/data.js";
import { labels } from "../assets/example_data/label.js";
import { ElTable, ElTableColumn, ElPagination } from 'element-plus';
import 'element-plus/theme-chalk/el-table.css';
import 'element-plus/theme-chalk/el-pagination.css';

export default {
  name: "UploadPage",
  components: {
    MainHeader,
    ElTable,
    ElTableColumn,
    ElPagination
  },
  data() {
    return {
      tableData: data.map((coord, index) => ({
        index: index + 1,
        coord,
        label: labels[index] || 'N/A',
      })),
      pageSize: 18,
      currentPage: 1,
    };
  },
  computed: {
    totalItems() {
      return this.tableData.length;
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableData.slice(start, end);
    },
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    initializeChart();
  },
};
</script>

<style scoped>
.content {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background-color: #f5f5f5;
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
}

.chart-container {
  display: flex;
  align-items: flex-start;
}

.chart {
  width: 800px;
  height: 800px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table-container {
  margin-left: 20px;
  flex: 1;
  width: 800px;
  height: 800px;
  position: relative;
}

.el-table {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.el-pagination {
  margin-top: 10px;
  text-align: right;
}

.page-control{
  bottom: 0;
  right: 0;
  position: absolute;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>