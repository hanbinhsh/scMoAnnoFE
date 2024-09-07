<template>
  <div class="main-page">
    <MainHeader></MainHeader>
    <section class="fullscreen-section">
      <div class="logo-container">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </div>
      <div class="scroll-indicator">
        <el-icon><i class="el-icon-arrow-down"></i></el-icon>
      </div>
    </section>
  </div>
</template>

<style scoped></style>

<script>
import MainHeader from "../components/MainHeader.vue"
export default {
  name: 'WorkSpace',
  components: {
    MainHeader
  }
}
</script>