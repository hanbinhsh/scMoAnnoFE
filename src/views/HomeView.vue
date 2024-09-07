<template>
  <div class="main-page">
    <MainHeader></MainHeader>
    <div>
      <section class="fullscreen-section">
        <div class="logo-container">
          <img src="@/assets/logo.png" alt="Logo" class="logo" />
        </div>
        <div class="scroll-indicator">
          <el-icon><i class="el-icon-arrow-down"></i></el-icon>
        </div>
      </section>
      <section class="intro-section">
        <div class="intro-content">
          <h1>欢迎来到我们的首页</h1>
          <p>这里是您的介绍文字，可以写一些关于您的信息。</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.main-page {
  background: aqua;
  height: 100%;
  width: 100%;
  position: fixed;
  background-size: cover;
}

.main-page {
  scroll-snap-type: y mandatory; /* 启用滚动捕捉效果 */
  overflow-y: scroll;
  height: 100vh;
}

.fullscreen-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 全屏高度 */
  background-color: #f0f0f0;
  position: relative;
  scroll-snap-align: start; /* 捕捉位置 */
}

.logo-container {
  text-align: center;
}

.logo {
  width: 150px; /* Logo 的宽度，可以根据需要调整 */
  height: auto;
}

.scroll-indicator {
  position: absolute;
  bottom: 20px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.intro-section {
  height: 100vh; /* 全屏高度 */
  padding: 40px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  scroll-snap-align: start; /* 捕捉位置 */
}

.intro-content {
  max-width: 600px;
  text-align: center;
}
</style>

<script>
// @ is an alias to /src
import MainHeader from "../components/MainHeader.vue"
export default {
  name: 'HomeView',
  components: {
    MainHeader
  }
}
</script>