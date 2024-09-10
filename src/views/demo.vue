<template>  
    <el-container>  
      <el-header>  
        <!-- 这里可以放置 MainHeader 组件 -->  
        <MainHeader />  
      </el-header>  
      <el-main>  
        <el-tour v-model="open">  
          <!-- 您的其他 el-tour-step 组件 -->  
          <el-tour-step target="#upload-area" title="Upload" description="Upload your files here">  
            <div>Drag and drop files here, or click to select files.</div>  
          </el-tour-step>  
        </el-tour>  
    
        <div id="upload-area" class="upload-area">  
          <el-upload  
            class="upload-demo"  
            action="https://jsonplaceholder.typicode.com/posts/" 
            :on-success="handleSuccess"  
            :before-upload="beforeUpload"  
            multiple  
            :on-preview="handlePreview"  
            :file-list="fileList"  
            :on-remove="handleRemove"  
            list-type="picture-card"  
          >  
            <i class="el-icon-plus"></i>  
          </el-upload>  
        </div>  
      </el-main>  
    </el-container>  
  </template>  
    
  <script>  
  import MainHeader from "../components/MainHeader.vue";  
    
  export default {  
    name: "UploadPage",  
    components: {  
      MainHeader  
    },  
    data() {  
      return {  
        // 这里通常不需要额外的数据，除非您想在其他地方使用  
      };  
    },  
    methods: {  
      // 如果需要，可以在这里定义一些方法  
    }  
  };  
  </script>  
    
  <script setup>  
  import { UploadFilled } from "@element-plus/icons-vue"; // 注意：这个图标在当前上下文中可能未使用  
  import { ref } from 'vue';  
    
  const open = ref(false);  
  const fileList = ref([]); // 存储已上传的文件列表  
    
  // 文件上传前的钩子，可以在这里处理文件，或者阻止某些文件上传  
  function beforeUpload(file) {  
    const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png';  
    const isLt2M = file.size / 1024 / 1024 < 2;  
    
    if (!isJPGOrPNG) {  
      this.$message.error('上传头像图片只能是 JPG/PNG 格式!');  
      return false;  
    }  
    if (!isLt2M) {  
      this.$message.error('上传头像图片大小不能超过 2MB!');  
      return false;  
    }  
    return true;  
  }  
    
  // 文件上传成功  
  function handleSuccess(response, file, fileList) {  
    console.log('文件上传成功:', response);  
    // 这里可以处理文件上传后的逻辑，如更新已上传的文件列表  
  }  
    
  // 文件移除  
  function handleRemove(file, fileList) {  
    console.log('文件移除:', file, fileList);  
    // 可以在这里更新 fileList  
  }  
    
  // 文件预览  
  function handlePreview(file) {  
    console.log('文件预览:', file);  
    // 这里可以打开文件预览  
  }  
  </script>  
    
  <style scoped>  
  .upload-area {  
    /* 定义上传区域的样式 */  
  }  
  </style>