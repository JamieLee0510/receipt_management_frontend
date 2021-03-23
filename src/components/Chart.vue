<template>
  <div ref="chartDom"></div>
</template>

<script>
import echarts from "echarts";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";

export default {
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  //想要option更新的時候，chartOption也要更新-->監聽option
  watch: {
    // option(val) {
    //   this.chart.setOption(val);
    // },

    //此為深度監聽,有改變顏色之類的
    option: {
      handler(val) {
        this.chart.setOption(val);
      },
      deep: true,
    },
  },

  //防堵效果（resize）
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  //lister組件銷毀
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    //chart也要銷毀，防止內存洩漏
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      // console.log("resizes");
      this.chart.resize();
    },
    //圖表渲染
    renderChart() {
      this.chart = echarts.init(this.$refs.chartDom);
      this.chart.setOption(this.option);
      //這邊是echart@4.多版本的使用方法（setOption），而echart@5.0版本的API有改動
    },
  },
};
</script>

<style></style>
