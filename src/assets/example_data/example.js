import * as echarts from 'echarts';
import * as ecStat from 'echarts-stat'; // 导入 echarts-stat 库
import { data } from './data.js'; // 导入数据
import { pieces } from './config.js'; // 导入配置

export function initializeChart() {
  // 注册聚类算法
  echarts.registerTransform(ecStat.transform.clustering);

  // 定义数据和配置
  const CLUSTER_COUNT = pieces.length;
  const DIENSIION_CLUSTER_INDEX = 2;

  const option = {
    dataset: [
      {
        source: data
      },
      {
        transform: {
          type: 'ecStat:clustering',
          config: {
            clusterCount: CLUSTER_COUNT,
            outputType: 'single',
            outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX
          }
        }
      }
    ],
    tooltip: {
      position: 'top',
      formatter: function (params) {
        // 获取点的坐标信息和类别索引
        const x = params.value[0];
        const y = params.value[1];
        const clusterIndex = params.value[DIENSIION_CLUSTER_INDEX];

        // 查找类别标签
        const clusterLabel = pieces.find(piece => piece.value === clusterIndex)?.label || `Cluster ${clusterIndex}`;

        return `X: ${x}<br>Y: ${y}<br>Cluster: ${clusterLabel}`;
      }
    },
    visualMap: {
      type: 'piecewise',
      top: 'middle',
      min: 0,
      max: CLUSTER_COUNT - 1,
      left: 10,
      splitNumber: CLUSTER_COUNT,
      dimension: DIENSIION_CLUSTER_INDEX,
      pieces: pieces
    },
    grid: {
      left: 120
    },
    xAxis: {},
    yAxis: {},
    series: {
      type: 'scatter',
      encode: { tooltip: [0, 1, DIENSIION_CLUSTER_INDEX] }, // 使用第 0, 1 和 2 维度来显示信息
      symbolSize: 5,
      itemStyle: {
        borderColor: '#555'
      },
      datasetIndex: 1
    }
  };

  // 初始化图表
  const chartDom = document.getElementById('main');
  const myChart = echarts.init(chartDom);
  myChart.setOption(option);
}
