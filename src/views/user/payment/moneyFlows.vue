<template>
  <!-- <div class="app-container"> -->
  <div class="fundManagement">
    <div class="paymentDown">
      <p class="title">资金流水</p>
      <p class="currency">
        <span class="leftLabel">货币选择</span>
        <span
          v-for="item in countryList"
          :key="item.id"
          :class="{ active: transaction === item.id }"
          @click="changeTransaction(item.id)"
          >{{ item.name }}</span
        >
      </p>

      <div class="datePicker">
        <span class="leftLabel">时间：</span>
        <el-date-picker
          v-model="datePickerStar"
          type="date"
          placeholder="开始日期"
          value-format="yyyy-MM-dd"
          @change="getStarTime()"
        >
        </el-date-picker>
        <span class="dateTimeGroup" v-if="device == 'desktop'">To</span>
        <el-date-picker
          ref="datePickerEnd"
          v-model="datePickerEnd"
          type="date"
          placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="getEndTime()"
        >
        </el-date-picker>
        <label
          ><span
            v-for="item in pickerOptions"
            :key="item.id"
            :class="{ active: checkTimeIndex == item.id }"
            @click="changeCurrentTime(item.id)"
            >{{ item.text }}</span
          ></label
        >
      </div>
      <div class="orderNumber">
        <span class="leftLabel">订单号</span>
        <input type="text" placeholder="请输入Amazon订单号" />
        <el-button @click="lookTableData()">查询</el-button>
      </div>
      <div class="orderType">
        <span class="leftLabel">交易类型</span>

        <span
          v-for="item in orderType"
          :key="item.id"
          :class="{ active: orderIndex === item.id }"
          @click="chooseOrderType(item.id)"
          >{{ item.name }}</span
        >
      </div>
      <div class="orderState">
        <span class="leftLabel">交易状态</span>
        <span
          v-for="item in orderStateList"
          :key="item.id"
          :class="{ active: orderStateIndex === item.id }"
          @click="chooseOrderState(item.id)"
          >{{ item.name }}</span
        >
      </div>
      <div v-if="device == 'desktop'">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="创建日期"> </el-table-column>
          <el-table-column prop="name" label="Amazon订单号"> </el-table-column>
          <el-table-column prop="name" label="交易类型"> </el-table-column>
          <el-table-column prop="name" label="金额/E币"> </el-table-column>
          <el-table-column prop="name" label="货币类型"> </el-table-column>
          <el-table-column prop="name" label="交易状态"> </el-table-column>
        </el-table>
      </div>
      <div v-if="device == 'mobile'">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            prop="date"
            label="创建日期"
            width="90"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="Amazon订单号"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="name" label="交易类型" align="center">
          </el-table-column>
          <el-table-column prop="name" label="金额/E币" align="center">
          </el-table-column>
          <el-table-column prop="name" label="货币类型" align="center">
          </el-table-column>
          <el-table-column prop="name" label="交易状态" align="center">
          </el-table-column>
        </el-table>
      </div>
      <p class="pagination">
        <el-pagination
          v-if="device == 'desktop'"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
        >
        </el-pagination>
        <el-pagination
          background
          small
          v-if="device == 'mobile'"
          layout="prev, pager, next"
          :total="1000"
        >
        </el-pagination>
      </p>
    </div>
  </div>
</template>

<script>
import { testData } from "@/api/money";
import { mapGetters } from "vuex";
import "./index.scss";
export default {
  name: "Order",
  data() {
    return {
      countryList: [
        {
          name: "美国",
          id: 1,
        },
        {
          name: "英国",
          id: 2,
        },
        {
          name: "日本",
          id: 3,
        },
      ],
      account: [
        {
          value: "1",
          label: "支付宝账号",
        },
        {
          value: "2",
          label: "paypal账号",
        },
      ],
      transaction: 1,
      pickerOptions: [
        {
          text: "今天",
          id: 1,
        },
        {
          text: "最近1个月",
          id: 2,
        },
        {
          text: "最近2个月",
          id: 3,
        },
        {
          text: "最近3个月",
          id: 4,
          end: new Date(),
          start: new Date(),
        },
      ],
      datePickerStar: "",
      datePickerEnd: "",
      checkTimeIndex: 0,
      orderType: [
        {
          name: "全部",
          id: 1,
        },
        {
          name: "冻结",
          id: 2,
        },
        {
          name: "返现",
          id: 3,
        },
        {
          name: "解冻",
          id: 4,
        },
        {
          name: "充值",
          id: 5,
        },
        {
          name: "续费",
          id: 6,
        },
        {
          name: "暂定",
          id: 7,
        },
      ],
      orderIndex: 1,
      orderStateList: [
        {
          name: "全部",
          id: 1,
        },
        {
          name: "处理中",
          id: 2,
        },
        {
          name: "失败",
          id: 3,
        },
        {
          name: "成功",
          id: 4,
        },
      ],
      orderStateIndex: 1,
      tableData: [
        {
          date: "2021-01-28 10:42:05.00",
          name: "100",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2021-01-28 10:42:05.00",
          name: "200",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2021-01-28 10:42:05.00",
          name: "300",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2021-01-28 10:42:05.00",
          name: "400",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      paymentMethod: "1",
      rechargeState: false,
      rechargeValue: "",
    };
  },
  computed: {
    ...mapGetters(["roles", "device"]),
  },
  mounted() {
    this.initSelect();
    testData()
      .then((res) => {
        console.log(res);
        this.orderType = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    initSelect() {
      if (!this.value) {
        this.value = this.account[0].value;
      }
    },
    //国家
    changeTransaction(index) {
      this.transaction = index;
      this.lookTableData();
    },
    //时间范围
    getStarTime() {
      console.log(this.datePickerStar);
      if (
        this.datePickerStar > this.datePickerEnd &&
        this.datePickerEnd.length >= 5
      ) {
        alert("开始日期不能大于结束日期");
        this.datePickerStar = "";
        // this.datePickerEnd = ""
      }
      this.lookTableData();
    },
    changeCurrentTime(id) {
      this.checkTimeIndex = id;
      this.datePickerEnd = new Date();
      var start = new Date();
      if (id === 2) {
        this.datePickerStar = new Date(start.getTime() - 3600 * 1000 * 24 * 30);
      } else if (id === 3) {
        this.datePickerStar = new Date(start.getTime() - 3600 * 1000 * 24 * 60);
      } else if (id === 4) {
        this.datePickerStar = new Date(start.getTime() - 3600 * 1000 * 24 * 90);
      } else {
        this.datePickerStar = new Date();
      }
    },
    //时间范围
    getEndTime() {
      console.log(this.datePickerEnd);
      if (
        this.datePickerEnd < this.datePickerStar &&
        this.datePickerStar.length >= 5
      ) {
        alert("结束日期不能小于开始日期");
        this.datePickerEnd = "";
      }
      this.lookTableData();
    },
    //交易类型
    chooseOrderType(index) {
      this.orderIndex = index;
    },
    //交易状态
    chooseOrderState(index) {
      this.orderStateIndex = index;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    lookTableData() {},
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
}
input {
  outline: none;
  border: 1px solid #dcdfe6;
  &:focus {
    border-color: #409eff;
  }
  &::-webkit-input-placeholder {
    color: #c6c8cc;
  }
  &::-moz-placeholder {
    /* Firefox 18- */
    color: #c6c8cc;
  }
  &::-moz-placeholder {
    /* Firefox 19+ */
    color: #c6c8cc;
  }
  &::-ms-input-placeholder {
    color: #c6c8cc;
  }
}
.fundManagement {
  .paymentDown {
    margin: 15px;
    color: #797979;
    font-size: 14px;
    background: #fff;
    .title {
      font-size: 20px;
      padding: 15px;
      border-bottom: 1px solid #dfe6ec;
    }
    .leftLabel {
      display: inline-block;
      width: 120px;
    }
    .currency {
      margin-top: 15px;
      span {
        &:not(:first-child) {
          cursor: pointer;
          display: inline-block;
          margin-right: 30px;
          padding: 10px 5px;
          &.active {
            background: #f6a951;
            color: #fff;
          }
        }
      }
    }
    .datePicker {
      margin: 15px 0;
      label {
        font-weight: 500;
        span {
          display: inline-block;
          margin: 0 10px;
          padding: 3px 5px;
          &:first-child {
            margin-left: 50px;
          }
          &.active {
            background: #f6a951;
            color: #fff;
          }
        }
      }
      .dateTimeGroup {
        display: inline-block;
        margin: 0 10px;
      }
    }
    .orderNumber {
      input {
        height: 36px;
        line-height: 36px;
        width: 200px;
        border-radius: 4px;
        text-indent: 14px;
      }
      button {
        border: none;
        display: inline-block;
        width: 54px;
        height: 36px;
        background: #009688;
        color: #fff;
        margin-left: 20px;
        &:hover {
          opacity: 0.8;
        }
      }
    }
    .orderType,
    .orderState {
      margin: 15px 0;
      font-weight: 400px;
      span {
        display: inline-block;
        cursor: pointer;
        &:not(:first-child) {
          padding: 5px 6px;
          margin-right: 25px;
        }
        &.active {
          background: #f6a951;
          color: #fff;
        }
      }
    }
    .pagination {
      margin: 20px 0;
      margin-top: 50px;
    }
  }
  .paymentDown > p,
  .paymentDown > div {
    padding: 0px 15px;
  }
}

@media only screen and (max-width: 768px) {
  .fundManagement {
    .paymentDown {
      margin: 0px;
      padding-bottom: 10px;
      .title{
        font-size: 15px;
      }
      .leftLabel {
        width: 70px;
      }
      .currency span:not(:first-child){
        padding: 5px 5px;
      }
      .datePicker {
        .leftLabel {
          margin-bottom: 10px;
        }
        label {
          display: block;
          span {
            margin-left: 0px;
            &:first-child {
              margin-left: 0px;
            }
          }
        }
        .el-date-editor {
          display: block;
          margin-bottom: 10px;
        }
      }
      .orderNumber {
        input {
          width: 160px;
        }
      }
      .orderType,
      .orderState {
        span {
          &:not(:first-child) {
            margin-right: 0px;
          }
        }
      }
      .el-table{
        font-size: 12px;
      }
    }
  }
}
</style>>
