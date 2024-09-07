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
        <div class="intro-container">
          <div class="intro-text">
            <h1>scMoAnno: A Pre-trained Cell Type Annotation Method for Single-cell Multi-omics Data</h1>
            <p> Cell type annotation is paramount for subsequent biomedical research endeavors. Recently, supervised
              classification methods based on deep learning have demonstrated significant advancements in cell type
              annotation. However, challenges persist regarding how to efficiently leverage single-cell multi omics data
              for cell type annotation and interpretation and how to endow models with adaptive generalization
              capabilities for efficient identification of rare cell types. We introduce scMoAnno, a methodology for
              cell type annotation based on single-cell multi-omics data. Leveraging pre trained cross-attention
              networks, scMoAnno facilitates efficient mutual learning and fusion of genetic and epigenetic
              distributions in single-cell multi-omics data, enabling precise cell type annotation. Predictions
              conducted by scMoAnno on single-cell RNA sequencing (scRNA-seq) and single-cell assay for
              transposase-accessible chromatin sequencing (scATAC-seq) data demonstrate enhanced generalization capacity
              for the recognition of rare cell types through pre-trained feature fusion extraction and training of
              classifiers based on fused data inputs. Rigorously conducted experiments on four meticulously curated
              benchmark datasets illustrate that scMoAnno surpasses nine other state-of the-art baseline models in
              overall performance. Furthermore, the increase in clustering scores, fused with multi-omics data and
              extracted by scMoAnno, is elucidated from the perspective of promoting downstream analysis of single
              cells, explaining how our model’s enhancement of cell type annotation performance yields positive effects.
            </p>
          </div>
          <div class="intro-image">
            <img src="@/assets/model.png" alt="介绍图片" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.main-page {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

.fullscreen-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  position: relative;
  scroll-snap-align: start;
}

.logo-container {
  text-align: center;
}

.logo {
  width: 150px;
  height: auto;
}

.scroll-indicator {
  position: absolute;
  bottom: 20px;
  animation: bounce 2s infinite;
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
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
  height: 100vh;
  padding: 40px 40px 0px 40px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  scroll-snap-align: start;
}

.intro-content {
  max-width: 600px;
  text-align: left;
}

.intro-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 40px;
  width: 100%;
  max-width: 1600px;
  margin: auto;
}

.intro-text {
  flex: 1;
  padding-right: 80px;
  text-align: justify;
}

.intro-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.intro-image img {
  max-width: 100%;
  height: auto;
}
</style>

<script>
import MainHeader from "../components/MainHeader.vue"
export default {
  name: 'HomeView',
  components: {
    MainHeader
  }
}
</script>