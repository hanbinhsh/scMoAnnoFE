<template>
  <el-container class="main-page">
    <MainHeader></MainHeader>
    <el-main class="fullscreen-section">
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-card shadow="always">
            <template #header>
              <div slot="header" class="card-header">
                <span>Data Visualization</span>
                <el-button type="primary" style="float: right;" @click="download()">Download</el-button>
              </div>
            </template>
            <div class="card-body">
              <el-row type="flex" justify="space-between">
                <!-- 图表容器 -->
                <el-col :span="11">
                  <div id="main" class="chart"></div>
                </el-col>
                <!-- 表格和分页容器 -->
                <el-col :span="12">
                  <el-table :data="paginatedData" stripe style="width: 100%;" @sort-change="handleSortChange">
                    <el-table-column prop="index" label="ID" width="70" sortable></el-table-column>
                    <el-table-column prop="coord" label="Position" sortable>
                      <template #default="{ row }">
                        {{ `(${row.coord[0]}, ${row.coord[1]})` }}
                      </template>
                    </el-table-column>
                    <el-table-column prop="label" label="Label" width="70" sortable></el-table-column>
                  </el-table>
                  <el-pagination background layout="prev, pager, next" :total="totalItems" :page-size="pageSize"
                    :current-page="currentPage" @current-change="handlePageChange" class="page-control">
                  </el-pagination>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
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
  name: "Example",
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
      pageSize: 15,
      currentPage: 1,
      sortProp: '',
      sortOrder: '',
      paginatedData: [],
      taskName: this.$route.params.taskName,
      isDarkMode:false,
    };
  },
  computed: {
    totalItems() {
      return this.tableData.length;
    },
  },
  watch: {
    pageSize() {
      this.updatePaginatedData();
    },
    currentPage() {
      this.updatePaginatedData();
    },
    sortProp() {
      this.applySorting();
    },
    sortOrder() {
      this.applySorting();
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    },
    handleSortChange({ prop, order }) {
      this.sortProp = prop;
      this.sortOrder = order;
    },
    applySorting() {
      if (this.sortProp && this.sortOrder) {
        this.tableData.sort((a, b) => {
          const valueA = a[this.sortProp];
          const valueB = b[this.sortProp];
          if (this.sortOrder === 'ascending') {
            return valueA > valueB ? 1 : -1;
          } else if (this.sortOrder === 'descending') {
            return valueA < valueB ? 1 : -1;
          } else {
            return 0;
          }
        });
      }
      this.updatePaginatedData();
    },
    updatePaginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedData = this.tableData.slice(start, end);
    },
    // TODO 仅仅在result页面可用
    download(){

    }
  },
  mounted() {
    this.applySorting();
    this.updatePaginatedData();
    this.isDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;
    // BUG
    initializeChart(false);
  },
};
</script>

<style scoped>
.card-header {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.dark-mode .card-header {
  color: #EEE;
}

.card-body {
  padding: 20px;
}

.chart {
  width: 700px;
  height: 700px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

.page-control {
  bottom: 0;
  right: 0;
  position: absolute;
}
</style>
