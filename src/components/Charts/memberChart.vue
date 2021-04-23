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

    echartData: {
      type: Array,
      default: [
        {
          name: ["会员发展数"],
          data: [
            "01.03",
            "02.03",
            "03.03",
            "04.03",
            "05.03",
            "06.03",
            "07.03",
            "08.03",
            "09.03",
            "10.03",
            "11.03",
            "12.03",
          ],
        },
        {
          name: "会员发展数",
          data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122],
        },
      ],
      screenWidth: "",
    },
  },
  data() {
    return {
      chart: null,
      // isResize: this.$store.state.app.sidebar.opened,
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
              symbolSize: 10,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 3,
                },
              },
               areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(128, 255, 165)'
                }, {
                    offset: 1,
                    color: 'rgba(1, 191, 236)'
                }])
            },
              itemStyle: {
                normal: {
                  color: "#3AAEF7",
                  borderColor: "#3AAEF7",
                  borderWidth: 1,
                },
              },
              data: chartData[1].data,
            }],
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
