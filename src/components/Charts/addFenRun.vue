<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    id: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "200px",
    },
    height: {
      type: String,
      default: "200px",
    },

   
  },
  data() {
    return {
      chart: null,
      isResize: this.$store.state.app.sidebar,
       echartData:[
        {
          name: ["一级会员累计分润", "二级会员累计分润"],
          data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12,13,14,15,16,17,18,19]
        },
        {
          name: "一级会员累计分润",
          data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122, 120, 110, 125, 145, 122, 165, 122,140],
        },
        {
          name: "二级会员累计分润",
          data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150 ,134, 150, 120, 110, 125, 145,130,140],
        },
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart(this.echartData);
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart(chartData) {
      var name = chartData[0].name;
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.clear();
      this.chart.setOption(
        {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              lineStyle: {
                color: "#57617B",
              },
            },
          },
          legend: {
            top: 20,
            icon: "rect",
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            top: 10,
            left: "2%",
            data: name,
            right: "4%",
            textStyle: {
              fontSize: 12,
              color: "#333333",
            },
          },
          grid: {
            top: 50,
            left: "2%",
            right: "2%",
            bottom: "2%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: "#57617B",
                },
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#DDDDDD",
                },
              },

              data: chartData[0].data,
            },
          ],
          yAxis: [
            {
              type: "value",
              //   name: '(%)',
              axisTick: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  color: "#57617B",
                },
              },
              axisLabel: {
                margin: 10,
                textStyle: {
                  fontSize: 14,
                },
              },
              splitLine: {
                lineStyle: {
                  color: "#DDDDDD",
                },
              },
            },
          ],
          series: [
            {
              name: chartData[1].name,
              type: "line",
              smooth: true,
              //   symbol: 'circle',
              symbolSize: 10,
              showSymbol: true,
              lineStyle: {
                normal: {
                  width: 3,
                },
              },
              itemStyle: {
                normal: {
                  color: "#3AAEF7",
                  borderColor: "#3AAEF7",
                  borderWidth: 1,
                },
              },
              data: chartData[1].data,
            },
            {
              name: chartData[2].name,
              type: "line",
              smooth: true,
              symbolSize: 10,
              showSymbol: true,
              lineStyle: {
                normal: {
                  width: 3,
                },
              },
              itemStyle: {
                normal: {
                  color: "#EC8526",
                  borderColor: "#EC8526",
                  borderWidth: 1,
                },
              },
              data: chartData[2].data,
            },
          ],
        },
        true
      );
    },
  },
  watch: {
    '$store.state.app.sidebar.opened'(newValue, oldValue){
      this.chart.resize()
    },
    echartData: {
      handler(newValue, oldValue) {
        this.echartData = newValue; //把新值赋值给我们的属性数据
        this.initChart(this.chartsData); //刷新echarts图表
      },
      deep: true,
    }
  },
};
</script>
