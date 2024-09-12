<template>
  <div class="main-page">
    <MainHeader></MainHeader>
    <section class="fullscreen-section">
      <div class="chart-container">
        <div id="main" class="chart"></div>
        <div class="table-container">
          <el-table :data="paginatedData" stripe style="width: 100%;" @sort-change="handleSortChange">
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
      pageSize: 18,
      currentPage: 1,
      sortProp: '',  // 当前排序的属性
      sortOrder: '', // 当前排序的顺序
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
    handleSortChange({ prop, order }) {
      this.sortProp = prop;
      this.sortOrder = order;
      this.applySorting(); // 进行排序
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
  },
  mounted() {
    initializeChart();
  },
};
</script>

<style scoped>
.fullscreen-section {
  padding-left: 150px;
  padding-right: 150px;
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

.page-control {
  bottom: 0;
  right: 0;
  position: absolute;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
