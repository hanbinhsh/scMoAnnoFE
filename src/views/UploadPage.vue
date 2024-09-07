<template>
  <div class="main-page">
    <MainHeader></MainHeader>
    <section class="fullscreen-section">
      <!-- 左侧上传框 -->
      <el-upload
        class="upload"
        drag
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            upload scRNA-seq file
          </div>
        </template>
      </el-upload>

      <!-- 右侧上传框 -->
      <el-upload
        class="upload"
        drag
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            upload scATAC-seq file
          </div>
        </template>
      </el-upload>
    </section>
  </div>
</template>

<script>
import MainHeader from "../components/MainHeader.vue";
import axios from "axios";
export default {
  name: "UploadPage",
  components: {
    MainHeader,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<script setup>
import { UploadFilled } from "@element-plus/icons-vue";
</script>

<style scoped>
.fullscreen-section {
  display: flex; /* 使用Flexbox布局 */
  justify-content: space-between; /* 在两边保持间距 */
  padding: 10px 100px 0px 100px; /* 给内容添加一些内边距 */
  gap: 20px; /* 设置上传框之间的间距 */
}

.upload {
  width: 45%; /* 每个上传框宽度设置为45%，以保持左右并排 */
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  padding: 20px;
  text-align: center;
  height: 200px;
}
</style>
