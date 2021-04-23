<template>
  <div class="dataStatistics">
    <h3>财务数据统计</h3>
    <div>
      <h6>合伙人加盟费</h6>
      <el-row :gutter="20" class="league">
        <el-col :lg="6" :sm="8">
          <div class="grid-content partner1">
            <div>
              <img
                src="~@/assets/img/index-relOrder1.png"
                alt=""
                srcset=""
              />
            </div>
            <div>
              <p>$ 2,000,000.00</p>
              <p>一级合伙人累计收入</p>
            </div>
          </div>
        </el-col>
        <el-col :lg="6" :sm="8"
          ><div class="grid-content partner2">
            <div>
              <img
                src="~@/assets/img/index-relOrder1.png"
                alt=""
                srcset=""
              />
            </div>
            <div>
              <p>$ 2,000,000.00</p>
              <p>二级合伙人累计收入</p>
            </div>
          </div></el-col
        >
        <el-col :lg="6" :sm="8"
          ><div class="grid-content partner3">
            <div>
              <img
                src="~@/assets/img/index-relOrder1.png"
                alt=""
                srcset=""
              />
            </div>
            <div>
              <p>$ 2,000,000.00</p>
              <p>三级级合伙人累计收入</p>
            </div>
          </div></el-col
        >
        <el-col :lg="6" :sm="0"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <div class="lineCharts">
        <div>
          <div class="selectTime">
            <p>
              <span class="el-icon-date"></span
              ><span v-html="checkedValue"></span>
            </p>
            <el-select
              v-model="value1"
              placeholder="请选择"
              @change="getChangeTime(1)"
              popper-class="changeTime"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <line-Chart
          id="joinIn"
          width="100%"
          height="400px"
          :echartData="joinIn"
        ></line-Chart>
      </div>
    </div>
    <div>
      <h6>合伙人累计分润</h6>
      <el-row :gutter="20" class="league">
        <el-col :lg="6" :sm="8">
          <div class="grid-content partner1">
            <div>
              <img
                src="~@/assets/img/index-relOrder1.png"
                alt=""
                srcset=""
              />
            </div>
            <div>
              <p>$ 2,000,000.00</p>
              <p>一级合伙人累计分润</p>
            </div>
          </div>
        </el-col>
        <el-col :lg="6" :sm="8"
          ><div class="grid-content partner2">
            <div>
              <img
                src="~@/assets/img/index-relOrder1.png"
                alt=""
                srcset=""
              />
            </div>
            <div>
              <p>$ 2,000,000.00</p>
              <p>二级合伙人累计分润</p>
            </div>
          </div></el-col
        >
        <el-col :lg="6" :sm="8"
          ><div class="grid-content partner3">
            <div>
              <img
                src="~@/assets/img/index-relOrder1.png"
                alt=""
                srcset=""
              />
            </div>
            <div>
              <p>$ 2,000,000.00</p>
              <p>三级级合伙人累计分润</p>
            </div>
          </div></el-col
        >
        <el-col :lg="6" :sm="8"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <div class="lineCharts">
        <div>
          <div class="selectTime">
            <p>
              <span class="el-icon-date"></span
              ><span v-html="checkedValue2"></span>
            </p>
            <el-select
              v-model="value2"
              placeholder="请选择"
              @change="getChangeTime(2)"
              popper-class="changeTime"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <line-Chart
          id="FenRun"
          width="100%"
          height="400px"
          :echartData="fenRun"
        ></line-Chart>
      </div>
    </div>
    <div></div>
    <div class="lineCharts membersAdd">
      <div>
        <div class="selectTime">
          <p>
            <span class="el-icon-date"></span
            ><span v-html="checkedValue3"></span>
          </p>
          <el-select
            v-model="value3"
            placeholder="请选择"
            @change="getChangeTime2()"
            popper-class="changeTime"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="chartTitle">
        <p>会员累计分润</p>
        <p>$ 351490.42</p>
      </div>
      <addFenRun id="addFenRun" width="100%" height="400px"></addFenRun>
    </div>
  </div>
</template>
<script>
import lineChart from "@/components/Charts/partnerLine";
import addFenRun from "@/components/Charts/addFenRun";
import "./index.scss";
import { timeFormat } from "@/filters/index";
export default {
  data() {
    return {
      joinIn: [
        {
          name: ["一级合伙人", "二级合伙人", "三级合伙人"],
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
          name: "一级合伙人",
          data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122],
        },
        {
          name: "二级合伙人",
          data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150],
        },
        {
          name: "三级合伙人",
          data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122],
        },
      ],

      fenRun: [
        {
          name: ["一级合伙人分润", "二级合伙人分润", "三级合伙人分润"],
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
          name: "一级合伙人分润",
          data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122],
        },
        {
          name: "二级合伙人分润",
          data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150],
        },
        {
          name: "三级合伙人分润",
          data: [220, 182, 125, 145, 122, 91, 34, 150, 10, 110, 15, 122],
        },
      ],

      options: [
        {
          value: 0,
          label: "当天数据",
        },
        {
          value: 1,
          label: "七天数据",
        },
        {
          value: 2,
          label: "30天数据",
        },
        {
          value: 3,
          label: "一年数据",
        },
      ],
      value1: "",
      value2: "",
      value3: "",
      checkedValue: "",
      checkedValue2: "",
      checkedValue3: "",
    };
  },
  components: { lineChart, addFenRun },
  created() {
    var currentDate = timeFormat(new Date(), "ymd");
    this.checkedValue =
      currentDate + "<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>" + currentDate;
    this.checkedValue2 =
      currentDate + "<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>" + currentDate;
    this.checkedValue3 =
      currentDate + "<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>" + currentDate;
  },
  methods: {
    getChangeTime(index) {
      var currentDate = new Date();
      var starTime =
        timeFormat(currentDate, "ymd") +
        "<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>";
      if (index === 1) {
        switch (this.value1) {
          case 0:
            this.checkedValue = starTime + timeFormat(currentDate, "ymd");
            break;
          case 1:
            this.checkedValue =
              starTime + timeFormat(currentDate - 3600 * 1000 * 24 * 7, "ymd");
            break;
          case 2:
            this.checkedValue =
              starTime + timeFormat(currentDate - 3600 * 1000 * 24 * 30, "ymd");
            break;
          case 3:
            this.checkedValue =
              starTime +
              timeFormat(currentDate - 3600 * 1000 * 24 * 365, "ymd");
            break;
          default:
            this.checkedValue = starTime + timeFormat(currentDate, "ymd");
        }
      } else {
        switch (this.value2) {
          case 0:
            this.checkedValue2 = starTime + timeFormat(currentDate, "ymd");
            break;
          case 1:
            this.checkedValue2 =
              starTime + timeFormat(currentDate - 3600 * 1000 * 24 * 7, "ymd");
            break;
          case 2:
            this.checkedValue2 =
              starTime + timeFormat(currentDate - 3600 * 1000 * 24 * 30, "ymd");
            break;
          case 3:
            this.checkedValue2 =
              starTime +
              timeFormat(currentDate - 3600 * 1000 * 24 * 365, "ymd");
            break;
          default:
            this.checkedValue2 = starTime + timeFormat(currentDate, "ymd");
        }
      }
    },
    getChangeTime2() {
      var currentDate = new Date();
      var starTime =
        timeFormat(currentDate, "ymd") +
        "<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>";
      switch (this.value3) {
        case 0:
          this.checkedValue3 = starTime + timeFormat(currentDate, "ymd");
          break;
        case 1:
          this.checkedValue3 =
            starTime + timeFormat(currentDate - 3600 * 1000 * 24 * 7, "ymd");
          break;
        case 2:
          this.checkedValue3 =
            starTime + timeFormat(currentDate - 3600 * 1000 * 24 * 30, "ymd");
          break;
        case 3:
          this.checkedValue3 =
            starTime + timeFormat(currentDate - 3600 * 1000 * 24 * 365, "ymd");
          break;
        default:
          this.checkedValue = starTime + timeFormat(currentDate, "ymd");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
}
.dataStatistics {
  margin: 20px;
  font-size: 12px;
  h3 {
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    line-height: 40px;
    color: #555555;
    font-size: 20px;
    font-weight: lighter;
  }
  & > div {
    background: #fff;
    margin-bottom: 10px;

    h6 {
      font-size: 18px;
      padding-left: 50px;
      padding-top: 20px;
      padding-bottom: 10px;
      font-weight: 500;
    }
  }

  .league {
    padding: 0 30px;
    margin-top: 10px;
    margin-bottom: 20px;
    .grid-content {
      height: 141px;
      display: flex;
      align-items: center;
      justify-content: center;
      & > div {
        &:nth-child(2) {
          margin-left: 20px;
          p {
            &:first-child {
              color: #fff;
              font-size: 20px;
            }
            &:nth-child(2) {
              color: #f6eeee;
              margin-top: 6px;
            }
          }
        }
      }
      &.partner1 {
        background: #479bc7;
      }
      &.partner2 {
        background: #e05d6f;
      }
      &.partner3 {
        background: #f28f23;
      }
    }
  }
  .lineCharts {
    position: relative;
    & > div {
      &:first-child {
        display: flex;
        justify-content: flex-end;
      }
    }

    .selectTime {
      position: absolute;
      right: 0px;
      top: 0px;
      margin-right: 3%;
      width: 300px;
      height: 40px;
      line-height: 40px;
      position: relative;
      background: #e05d6f;
      & > p {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 80%;
        height: 100%;
        text-align: left;
        color: #fff;
        background: #e05d6f;
        span {
          &:first-child {
            display: inline-block;
            margin: 0 5px;
            font-size: 20px;
            position: relative;
            top: 2px;
          }
        }
      }
    }
    &.membersAdd{
      padding-top: 30px;
      .chartTitle{
        text-align: center;
        font-size: 18px;
        font-weight: lighter;
        p{
          &:last-child{
            color: #00BFBF;
            font-size: 24px;
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>

