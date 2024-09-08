<template>
  <div class="main-page">
    <MainHeader></MainHeader>
    <section class="upload-section">
      <div class="upload-row" id="upload-row">
        <!-- 文件上传组件 -->
        <el-upload
          class="upload"
          drag
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :limit="1"
          :auto-upload="false"
        >
          <el-icon class="el-icon--upload">
            <UploadFilled />
          </el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">upload scRNA-seq file</div>
          </template>
        </el-upload>

        <el-upload
          class="upload"
          drag
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :limit="1"
          :auto-upload="false"
        >
          <el-icon class="el-icon--upload">
            <UploadFilled />
          </el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">upload scATAC-seq file</div>
          </template>
        </el-upload>

        <el-upload
          class="upload"
          drag
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :limit="1"
          :auto-upload="false"
        >
          <el-icon class="el-icon--upload">
            <UploadFilled />
          </el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">upload Tag file</div>
          </template>
        </el-upload>
      </div>

      <!-- 显示图像 -->
      <div class="image-row" id="image-row">
        <img src="@/assets/model.png" alt="Example" class="example-image" />
      </div>

      <!-- 按钮行 -->
      <div class="button-row">
        <el-button type="default" class="action-button" @click="open = true" ref="ref3">Tutorial</el-button>
        <el-button type="primary" class="action-button">Example</el-button>
        <el-button type="warning" class="action-button">Reset</el-button>
        <el-button type="success" class="action-button" id="button-row">Upload</el-button>
      </div>
    </section>
  </div>

  <!-- Element Plus 的引导教程 -->
  <el-tour v-model="open">
    <el-tour-step target="#image-row" title="Model" description="Our scMoAnno Model" />
    <el-tour-step target="#upload-row" title="Upload File">
      <div>Put your files here.</div>
    </el-tour-step>
    <el-tour-step target="#button-row" title="Upload" description="Click to upload" />
    <el-tour-step target="#WorkSpase" title="Results" description="Results will be shown here" />
  </el-tour>
</template>

<script>
import MainHeader from "../components/MainHeader.vue";
export default {
  name: "UploadPage",
  components: {
    MainHeader,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<script setup>
import { UploadFilled } from "@element-plus/icons-vue";
import { ref } from 'vue';

const open = ref(false);
</script>

<style scoped>
.upload-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 30px;
  gap: 20px;
}

.upload-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.upload {
  flex: 1;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.upload:hover {
  border-color: #409eff;
  background-color: #f0f9ff;
}

.image-row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
}

.example-image {
  max-width: 100%;
  height: auto;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  gap: 20px;
}

.action-button {
  flex: 1;
  transition: all 0.3s ease;
}

.action-button:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .upload-row {
    flex-direction: column;
  }
  
  .button-row {
    flex-direction: column;
  }
}
</style>
