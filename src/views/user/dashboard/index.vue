<template>
  <div class="app-container">
    <div class="dashboard-container">
      <el-row :gutter="15">
        <el-col :span="10" :xs="24">
          <div class="overview">
            <h2>数据总览</h2>
            <div class="box">
              <div id="echartOrders"></div>
              <div id="echartProducts"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="14" :xs="24">
          <div class="finishOrder">
            <h2>已完成订单</h2>

            <ul class="total">
              <li>
                <p class="num">
                  <count-to
                    :start-val="0"
                    separator=""
                    :end-val="13600"
                    :duration="1500"
                    class="card-panel-num"
                  />
                </p>
                <p>留评订单（笔）</p>
              </li>
              <li>
                <p class="num">
                  <count-to
                    :start-val="0"
                    separator=""
                    :end-val="13600"
                    :duration="1500"
                    class="card-panel-num"
                  />
                </p>
                <p>免评订单（笔）</p>
              </li>
              <li>
                <p class="num">
                  <count-to
                    :start-val="0"
                    separator=""
                    :end-val="13600"
                    :duration="1500"
                    class="card-panel-num"
                  />
                </p>
                <p>不需要留评订单（笔）</p>
              </li>
            </ul>

            <div class="box">
              <div class="reviewRate">
                <h3>留评率 <span>50.55%</span></h3>

                <div class="reviewCon">
                  <div class="isReview">
                    <div class="num"><span>7581</span></div>
                    <div class="name">已留评</div>
                  </div>

                  <div class="notReview">
                    <div class="num"><span>1000</span></div>
                    <div class="name">未留评</div>
                  </div>
                </div>
              </div>

              <div class="reviewScore">
                <h3>review 平均评分 <span>4.8</span></h3>
                <ul>
                  <li>
                    <span class="star">5星</span
                    ><span class="progress"
                      ><span
                        class="progress-bar orange"
                        style="width: 50%"
                      ></span></span
                    ><span class="score">10%</span>
                  </li>
                  <li>
                    <span class="star">4星</span
                    ><span class="progress"
                      ><span
                        class="progress-bar blue"
                        style="width: 50%"
                      ></span></span
                    ><span class="score">10%</span>
                  </li>
                  <li>
                    <span class="star">3星</span
                    ><span class="progress"
                      ><span
                        class="progress-bar purple"
                        style="width: 50%"
                      ></span></span
                    ><span class="score">10%</span>
                  </li>
                  <li>
                    <span class="star">2星</span
                    ><span class="progress"
                      ><span
                        class="progress-bar red"
                        style="width: 50%"
                      ></span></span
                    ><span class="score">10%</span>
                  </li>
                  <li>
                    <span class="star">1星</span
                    ><span class="progress"
                      ><span
                        class="progress-bar green"
                        style="width: 50%"
                      ></span></span
                    ><span class="score">10%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="24">
          <div class="todo relOrder">
            <h2>待办事项 - 订单相关</h2>
            <ul>
              <li>
                <p class="num">1000</p>
                <p>订单编号待审核（笔）</p>
              </li>
              <li>
                <p class="num">1000</p>
                <p>试用报告待审核（笔）</p>
              </li>
              <li>
                <p class="num">1000</p>
                <p>待索评订单（笔）</p>
              </li>
              <li>
                <p class="num">1000</p>
                <p>待查看review（笔）</p>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="8" :xs="24">
          <div class="todo relProducts">
            <h2>待办事项 - 产品相关</h2>
            <ul>
              <li>
                <p class="num">1000</p>
                <p>即将送完产品(个)</p>
                <el-button type="warning">前去查看</el-button>
              </li>
              <li>
                <p class="num">1000</p>
                <p>等待推广产品(个)</p>
                <el-button type="warning">前去查看</el-button>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8" :xs="24">
          <div class="todo relFund">
            <h2>待办事项 - 资金相关</h2>
            <p class="tips">
              您的账户资金即将消耗完毕，为了不影响您正常送测，请及时充值。
            </p>
            <ul>
              <li>
                <p class="num">1000</p>
                <p>可用美元($)</p>
              </li>
              <li>
                <p class="num">1000</p>
                <p>可用英镑(£)</p>
              </li>
              <li>
                <p class="num">1000</p>
                <p>可用E币</p>
              </li>
            </ul>
            <el-button type="warning">前去充值</el-button>
          </div>
        </el-col>
        <el-col :span="8" :xs="24">
          <div class="todo relPackage">
            <h2>待办事项 - 套餐相关</h2>
            <p class="tips">
              您的套餐即将到期，为了不影响您正常使用，请安排及时续购。
            </p>
            <ul>
              <li>
                <p>剩余(天) <span class="num">100</span></p>
                <div class="dueDate">到期日: 2020-07-23</div>
              </li>
            </ul>
            <el-button type="warning" @click="buyNow">立即续购套餐</el-button>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="24">
          <div class="updateNotice">
            <h2>公告消息</h2>
            <ul>
              <li>
                <a href="#">
                  "公告消息"可点击可查看详细信息以及更多历史更新信息
                </a>
              </li>
              <li>
                <a href="#"
                  >由于美国抗议活动持续升级，自发货的物流车辆可能容易导致被抢，评价易建议各位卖家朋友近期暂停自发货。
                </a>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CountTo from "vue-count-to";
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};

export default {
  name: "Dashboard",
  components: {
    CountTo,
  },
  data() {
    return {
      chart: null,
      chartData: lineChartData.newVisitis,
    };
  },
  computed: {
    ...mapGetters(["roles", "device"]),
  },
  mounted() {
    this.$nextTick(() => {
      this.echartOrders();
      this.echartProducts();
    });
  },
  created() {},
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    echartOrders() {
      this.chart = echarts.init(
        document.getElementById("echartOrders"),
        "macarons"
      );

      this.chart.setOption({
        title: {
          text: "订单",
          textStyle: {
            fontWeight: "bolder",
            fontSize: 14,
            color: "#666",
          },
          left: "center",
          top: "15",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          left: "center",
          bottom: "0",
          data: ["进行中", "已关闭", "已完成"],
          itemGap: 20,
          itemWidth: 8,
          itemHeight: 8,
          icon: "circle",
        },
        color: ["#91CC75", "#73C0DE", "#5470C6"],
        series: [
          {
            name: "订单",
            type: "pie",
            radius: ["30%", "60%"], //["30%", "60%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
            },
            labelLine: {
              show: true,
            },
            data: [
              { value: 1048, name: "进行中" },
              { value: 735, name: "已关闭" },
              { value: 580, name: "已完成" },
            ],
          },
        ],
      });
    },
    echartProducts() {
      this.chart = echarts.init(
        document.getElementById("echartProducts"),
        "macarons"
      );

      this.chart.setOption({
        title: {
          text: "产品",
          textStyle: {
            fontWeight: "bolder",
            fontSize: 14,
            color: "#666",
          },
          left: "center",
          top: "15",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          left: "center",
          bottom: "0",
          data: ["未推广", "推广中", "停止推广"],
          itemGap: 20,
          itemWidth: 8,
          itemHeight: 8,
          icon: "circle",
        },
        color: ["#FAC858", "#9095FD", "#FF7A7B"],
        series: [
          {
            name: "产品",
            type: "pie",
            radius: ["25%", "50%"],
            avoidLabelOverlap: false,
            label: {
              show: this.device == "mobile" ? false : true,
              position: "outer",
              alignTo: "none",
              bleedMargin: 5,
              formatter: "{b}：{c} \n 占比：{d}%",
              color: "#555",
              backgroundColor: "#F2F2F2",
              borderRadius: 5,
              padding: 5,
              alignTo: "labelLine",
              edgeDistance: "10%",
            },
            data: [
              { value: 10481, name: "未推广" },
              { value: 73511, name: "推广中" },
              { value: 51111, name: "停止推广" },
            ],
          },
        ],
      });
    },
    buyNow() {
      alet(123);
      // try{
      //   $("#test").html(123)
      // }catch(err){
      //   console.log(err)
      //   fundebug.notifyError(err);
      // }
    },
  },
  watch: {
    '$store.state.app.sidebar.opened'(){
      this.chart.resize()
    },
  }
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none outside;
  padding: 0;
  margin: 0;
}
.overview {
  background: #fff;
  padding: 20px;
  height: 315px;
  h2 {
    font-size: 16px;
    margin: 0;
    color: #555;
  }
  .box {
    display: flex;
    #echartOrders {
      width: 35%;
      height: 260px;
    }
    #echartProducts {
      flex: 1;
      height: 260px;
    }
  }
}
.finishOrder {
  background: #fff;
  padding: 20px;
  height: 315px;
  h2 {
    font-size: 16px;
    margin: 0;
    color: #555;
  }
  .total {
    padding-top: 10px;
    list-style: none outside;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #f5f5f5;
    text-align: center;
    p {
      margin: 0;
      font-size: 12px;
      color: #999;
      padding: 5px 0 15px;
    }
    .num {
      padding: 0;
      font-size: 30px;
      color: #000;
    }
  }
  .box {
    display: flex;
    margin: 20px 0;
    .reviewRate {
      width: 50%;
      border-right: 1px solid #f5f5f5;
      h3 span {
        float: none;
        margin-left: 20px;
      }
    }
  }
  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    color: #555;
    padding: 0 0 16px;
    span {
      float: right;
      color: #f6ae5d;
    }
  }
}

.reviewCon {
  display: flex;
  width: 300px;
  overflow: hidden;
  margin: 17px auto 0;
  align-items: center;
  text-align: center;
  .num {
    background: #88d2ef;
    color: #fff;
    height: 60px;
    line-height: 60px;
  }
  .name {
    padding-top: 27px;
    font-size: 14px;
    color: #88d2ef;
    background: #fff;
  }
  .isReview {
    width: 180px;
  }
  .notReview {
    flex: 1;
    background: #ff7a7b;
    .num {
      background: #ff7a7b;
      transform: skew(20deg);
      margin-left: -20px;
      span {
        display: inline-block;
        transform: skew(-20deg);
      }
    }
    .name {
      color: #ff7a7b;
    }
  }
}
.reviewName {
  display: flex;
  justify-content: center;
  width: 300px;
  margin: 0 auto;
}

.reviewScore {
  flex: 1;
  padding-left: 20px;
  padding-right: 70px;
  li {
    display: flex;
    align-items: center;
    padding: 0 0 10px 40px;
    &:last-child {
      padding-bottom: 0;
    }
    .star {
      font-size: 14px;
      color: #555;
      width: 42px;
    }
    .progress {
      position: relative;
      flex: 1;
      height: 4px;
      background-color: #f5f5f5;
      border-radius: 2px;
      .progress-bar {
        height: 4px;
        position: absolute;
        left: 0;
        top: 0;
        &.orange {
          background: #f4a64b;
        }
        &.blue {
          background: #82d0ee;
        }
        &.purple {
          background: #8c91fd;
        }
        &.red {
          background: #ff7778;
        }
        &.green {
          background: #88e4a4;
        }
      }
    }
    .score {
      font-size: 14px;
      color: #555;
      padding-left: 25px;
    }
  }
}

.todo {
  margin: 15px 0;
  background: #fff;
  padding: 20px;
  height: 256px;
  h2 {
    font-size: 16px;
    margin: 0;
    color: #555;
    text-align: left;
  }
  .tips {
    text-align: left;
    margin: 16px 0 0;
    font-size: 12px;
    color: #999;
  }
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 20px 0 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .num {
    font-size: 24px !important;
    font-weight: 700 !important;
  }

  &.relOrder {
    height: auto;
    li {
      flex: 25%;
      padding-top: 85px;
      background-repeat: no-repeat;
      background-position: center 0;
      &:nth-child(1) {
        background-image: url(~@/assets/img/index-relOrder1.png);
      }
      &:nth-child(2) {
        background-image: url(~@/assets/img/index-relOrder2.png);
      }
      &:nth-child(3) {
        background-image: url(~@/assets/img/index-relOrder3.png);
      }
      &:nth-child(4) {
        background-image: url(~@/assets/img/index-relOrder4.png);
      }

      p {
        margin: 0;
        font-size: 14px;
        color: #999;
        &.num {
          margin-bottom: 10px;
          color: #333;
        }
      }
    }
  }

  &.relProducts {
    ul {
      padding-top: 14px;
    }
    li {
      flex: 50%;
      p {
        margin: 25px 0;
        font-size: 14px;
        color: #666;
        &.num {
          color: #459ac6;
        }
      }
    }
  }
  &.relFund {
    text-align: center;
    li {
      flex: 33.3333%;
      p {
        margin: 18px 0;
        font-size: 12px;
        color: #666;
        &.num {
          color: #fb3e3e;
        }
      }
    }
  }
  &.relPackage {
    text-align: center;
    p {
      font-size: 12px;
      color: #999;
      vertical-align: middle;
      span {
        margin-left: 15px;
        color: #fb3e3e;
        vertical-align: middle;
      }
    }
    .dueDate {
      font-weight: 700;
      padding: 10px 0 20px;
      font-size: 12px;
      color: #333;
    }
  }
}
.updateNotice {
  padding: 20px;
  background: #fff;
  h2 {
    font-size: 16px;
    margin: 0 0 20px;
    color: #555;
  }
  li {
    margin: 12px 0;
    &:last-child {
      margin-bottom: 0;
    }
    a {
      color: #666;
      font-size: 14px;
      text-decoration: none;
      &:hover {
        color: #459ac6;
      }
    }
  }
}

//only for mobile
@media only screen and (max-width: 767px) {
  .overview {
    margin-bottom: 15px;
    height: auto;
    .box {
      display: block;
      #echartOrders {
        width: 300px;
        margin: 0 auto;
        border-bottom: 1px dashed #ddd;
        padding-bottom: 30px;
      }
      #echartProducts {
        width: 300px;
        margin: 0 auto;
      }
    }
  }
  .finishOrder {
    height: auto;
    .total {
      flex-wrap: wrap;
      padding-bottom: 10px;
      li {
        flex: 50%;
        margin-top: 20px;
      }
    }
    .box {
      flex-wrap: wrap;
      .reviewRate {
        flex: 100%;
        border: none;
        .reviewCon {
          width: auto;
          margin-top: 0;
          .name {
            padding-top: 10px;
          }
        }
      }
      .reviewScore {
        flex: 100%;
        padding: 0;
        margin-top: 30px;
        li {
          padding-left: 0;
        }
      }
    }
  }
  .todo.relOrder ul {
    flex-wrap: wrap;
    li {
      flex: 50%;
      &:nth-child(1),
      &:nth-child(2) {
        margin-bottom: 30px;
      }
    }
  }
}
</style>


