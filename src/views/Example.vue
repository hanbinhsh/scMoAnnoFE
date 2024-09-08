<template>
    <div class="main-page">
        <MainHeader></MainHeader>
        <section class="fullscreen-section">
            <div id="main" style="height: 200px;width: 200px;"></div>
        </section>
    </div>
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
    methods: {
    },
};
</script>

<script setup>
import { onMounted,nextTick } from "vue";
import * as echarts from 'echarts';
onMounted(async () => {
    await nextTick();
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
            {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }
        ]
    });
})
</script>

<style scoped></style>