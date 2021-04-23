<template>
  <div class="paymentOrderYN">
    <el-form
      :inline="true"
      :model="form"
      class="demo-form-inline"
      ref="form"
      :rules="rules"
    >
      <el-form-item label="" prop="approvalStatus">
        <el-select v-model="form.approvalStatus">
          <el-option
            :label="item.name"
            :value="item.value"
            v-for="(item, index) in stateList"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="" prop="receiveType">
        <el-select v-model="form.receiveType">
          <el-option
            :label="item.name"
            :value="item.value"
            v-for="(item, index) in typeList"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="" prop="receiveAccountType">
        <el-select v-model="form.receiveAccountType">
          <el-option
            :label="item.name"
            :value="item.value"
            v-for="(item, index) in accountList"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="receiveCurrency">
        <el-select v-model="form.receiveCurrency">
          <el-option
            :label="item.name"
            :value="item.value"
            v-for="(item, index) in currencyList"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-date-picker
        v-model="form.dataTime"
        type="daterange"
        range-separator="~"
        start-placeholder="年/月/日"
        end-placeholder="年/月/日"
      >
      </el-date-picker>
      <el-form-item prop="startReceiveAmount">
        <el-input v-model="form.startReceiveAmount" @change="handleMinChange" />
      </el-form-item>
      ~
      <el-form-item prop="endReceiveAmount">
        <el-input v-model="form.endReceiveAmount" @change="handleMaxChange" />
      </el-form-item>
      <el-form-item label="" prop="buyerName">
        <el-input
          v-model="form.buyerName"
          placeholder="输入买家账号/买家编号"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="buyerPaypal">
        <el-input
          v-model="form.buyerPaypal"
          placeholder="输入充值PayPal账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="" prop="paymentNo">
        <el-input
          v-model="form.paymentNo"
          placeholder="输入交易ID号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="BuyerId" label="买家编号"></el-table-column>
      <el-table-column prop="BuyerUserName" label="买家账号"></el-table-column>
      <el-table-column
        prop="ReceiveTypeName"
        label="收款类型"
      ></el-table-column>
      <el-table-column
        prop="ReceivePayAccountTypeName"
        label="收款账户"
      ></el-table-column>
      <el-table-column prop="ReceiveCurrencyName" label="币别">
      </el-table-column>
      <el-table-column label="金额">
        <template slot-scope="scope">
          {{ scope.row.ReceiveCurrencySymbol }}{{ scope.row.ReceiveAmount }}
        </template>
      </el-table-column>
      <el-table-column prop="BuyerPaypal" label="买家PayPal"></el-table-column>
      <el-table-column prop="PaymentNo" label="交易ID"></el-table-column>
      <el-table-column label="添加时间">
        <template slot-scope="scope">
          {{ scope.row.CreateTime | timeFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="CreateUserName" label="添加人"></el-table-column>
      <el-table-column prop="ApprovalUserName" label="审核人"></el-table-column>
      <el-table-column prop="ApprovalStatusName" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="handleEdit(scope.$index, tableData)"
            type="text"
            size="small"
          >
             {{scope.row.ApprovalStatusName == "待审核" ? '审核':'查看'}}

          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20" style="margin-top: 30px">
      <!-- <el-col :span="2" :offset="1">
        <span class="fontWeight">收款合计：</span>
      </el-col>
      <el-col :span="2">
        <span class="fontWeight">82.00</span>
        <span>(USD)</span>
      </el-col>
      <el-col :span="2">
        <span class="fontWeight">£82.00</span>
        <span> (GBP)</span>
      </el-col>
      <el-col :span="2">
        <span class="fontWeight">82.00</span>
        <span> (JPY)</span>
      </el-col>
      <el-col :span="2">
        <span class="fontWeight">82.00</span>
        <span> (HKD)</span>
      </el-col> -->
      <el-col :span="7" :offset="12">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 审核弹出框 start -->
    <el-dialog
      title="审核收款单"
      :visible.sync="dialogFormVisible"
      style="text-align: center"
    >
      <div>收款单单号：{{ auditObj.OrderNo }}</div>
      <el-row :gutter="10" style="margin-top: 20px">
        <el-col :span="11" :offset="1">
          <div class="tableTitle">
            <div>买家编号</div>
            <div>{{ auditObj.BuyerId }}</div>
          </div>
          <div class="tableTitle">
            <div>买家账号</div>
            <div>{{ auditObj.BuyerUserName }}</div>
          </div>
          <div class="tableTitle">
            <div>交易ID</div>
            <div>{{ auditObj.PaymentNo }}</div>
          </div>
          <div class="tableTitle">
            <div>买家PayPal</div>
            <div>{{ auditObj.BuyerPaypal }}</div>
          </div>
          <div class="tableTitle">
            <div>添加时间</div>
            <div>{{ auditObj.CreateTime | timeFilter }}</div>
          </div>
          <div class="tableTitle">
            <div>状态</div>
            <div>{{ auditObj.ApprovalStatusName }}</div>
          </div>
        </el-col>
        <el-col :span="11" :offset="1">
          <div class="tableTitle">
            <div>收款类型</div>
            <div>{{ auditObj.ReceiveTypeName }}</div>
          </div>
          <div class="tableTitle">
            <div>币别</div>
            <div>{{ auditObj.ReceiveCurrencyName }}</div>
          </div>
          <div class="tableTitle">
            <div>金额</div>
            <div>{{ auditObj.ReceiveCurrencySymbol }}{{ auditObj.ReceiveAmount }}</div>
          </div>
          <div class="tableTitle">
            <div>收款账户</div>
            <div>{{ auditObj.ReceivePayAccountTypeName }}</div>
          </div>
          <div class="tableTitle">
            <div>添加人</div>
            <div>{{ auditObj.CreateUserName }}</div>
          </div>
          <div class="tableTitle">
            <div>审核人</div>
            <div>{{ auditObj.ApprovalUserName }}</div>
          </div>
        </el-col>
        <el-col :span="24" style="margin-top: 20px">
          <div class="tableTitle">
            <div>摘要</div>
            <div>{{ auditObj.Summary }}</div>
          </div>
        </el-col>
        <el-col :span="24" style="margin-top: 20px">
          <div class="tableTitle">
            <div>审核备注</div>
            <div  v-if="auditObj.ApprovalStatusName=='待审核'">
              <input
                type="text"
                v-model="abstract"
                placeholder="请输入审核备注"
                style="border: 0; width: 90%; margin-left: 5%; height: 30px"
              />
            </div>
             <div v-else>
              {{auditObj.Remark}}
            </div>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer" v-if="auditObj.ApprovalStatusName=='待审核'">
        <el-button @click="refuse">拒 绝</el-button>
        <el-button type="primary" @click="pass">通 过</el-button>
      </div>
    </el-dialog>
    <!-- end -->
  </div>
</template>

<script>
import {
  get_receiveorder_list,
  get_receiveorder_detailView,
  put_approval_receiveorder,
} from "@/api/bills";
export default {
  data() {
    return {
      //审核对象信息
      auditObj: {
        ApprovalStatus: -1,
        ApprovalStatusName: null,
        ApprovalUserName: null,
        BuyerId: null,
        BuyerPaypal: null,
        BuyerUserName: null,
        CreateTime: null,
        CreateUserName: null,
        Id: null,
        OrderNo: null,
        PayAccountType: null,
        PayAccountTypeName: null,
        PayAmount: null,
        PayCurrency: null,
        PayCurrencyName: null,
        PayCurrencySymbol: null,
        PayType: null,
        PayTypeName: null,
        PaymentNo: null,
        Remark: null,
        Summary: null,
      },
      dialogFormVisible: false,
      abstract: null, //审核信息
      pageSize: 10,
      total: 100,
      pageIndex: 1,
      tableData: [],
      form: {
        approvalStatus: -1, // 审核状态
        receiveType: 0, // 收款类型
        receiveAccountType: 0, //收款账户类型
        receiveCurrency: 0, // 付款币别
        startCreateTime: null, // 开始创建时间
        endCreateTime: null, // 结束创建时间
        startReceiveAmount: null, //  开始收款金额
        endReceiveAmount: null, // 结束收款金额
        buyerName: null, // 买家用户名
        buyerPaypal: null, // 买家Paypal
        paymentNo: null, // 支付Id号
        dataTime: null, //
      },
      rules: {
        startReceiveAmount: [
          { validator: this.validateCom, trigger: "blur" },
          { validator: this.validateMin, trigger: "blur" },
        ],
        endReceiveAmount: [
          { validator: this.validateCom, trigger: "blur" },
          { validator: this.validateMax, trigger: "blur" },
        ],
      },
      stateList: [
        {
          name: "全部",
          value: -1,
        },
        {
          name: "待审核",
          value: 0,
        },
        {
          name: "已通过",
          value: 1,
        },
        {
          name: "已拒绝",
          value: 2,
        },
      ],
      typeList: [
        {
          name: "全部",
          value: 0,
        },
        {
          name: "已收款项",
          value: 1,
        },
        {
          name: "退款",
          value: 2,
        },
        {
          name: "撤销款项",
          value: 3,
        },
        {
          name: "其他",
          value: 4,
        },
      ],
      accountList: [
        {
          name: "全部",
          value: 0,
        },
        {
          name: "余额账户",
          value: 1,
        },
        {
          name: "待定账户",
          value: 2,
        },
      ],
      currencyList: [
        {
          name: "全部",
          value: 0,
        },
        {
          name: "USD",
          value: 1,
        },
        {
          name: "GBP",
          value: 2,
        },
        {
          name: "JPY",
          value: 3,
        },
        {
          name: "HKD",
          value: 4,
        },
      ],
    };
  },
  methods: {
    //查询数据方法
    getPaymentOrderList() {
      this.form.pageSize = this.pageSize;
      this.form.pageIndex = this.pageIndex;
      if (this.form.dataTime != null) {
        this.form.startCreateTime = this.form.dataTime[0];
        this.form.endCreateTime = this.form.dataTime[1];
      }
      get_receiveorder_list(this.form).then((res) => {
        this.total = res.Data.DataCount;
        this.tableData = res.Data.Data;
      });
    },
    //审核拒绝
    refuse() {
      let param = {
        Id: this.auditObj.Id, //ID
        Remark: this.abstract, //审核备注
        ApproalUserId: 188792, //审核的用户ID
        ApproalStatus: 2, //审核状态
      };
      put_approval_receiveorder(param).then((res) => {
        if (res.Data.Result) {
         this.$message({
            message: "审核成功",
            type: "success",
          });
          this.dialogFormVisible = false;
          this.getPaymentOrderList();
          this.$emit('refresh');
        } else {
          this.$message.error("审核失败！");
        }
      });
    },
    //审核通过
    pass() {
      let param = {
        Id: this.auditObj.Id,
        Remark: this.abstract,
        ApproalUserId: 188792,
        ApproalStatus: 1,
      };
      put_approval_receiveorder(param).then((res) => {
        if (res.Data.Result) {
          this.$message({
            message: "审核成功",
            type: "success",
          });
          this.dialogFormVisible = false;
           this.getPaymentOrderList();
           this.$emit('refresh');
        } else {
          this.$message.error("审核失败！");
        }
      });
    },
    //每页记录条数变化
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPaymentOrderList();
    },
    //页数变化
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getPaymentOrderList();
    },
    //审核方法
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      get_receiveorder_detailView({ id: row[index].Id }).then((res) => {
        this.auditObj = res.Data;
      });
    },
    //查询方法
    onSubmit() {
      this.getPaymentOrderList();
    },
    //对表单进行重新验证
    handleMinChange() {
      this.$refs.form.validateField("startReceiveAmount");
    },
    //表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //对表单进行重新验证
    handleMaxChange() {
      this.$refs.form.validateField("endReceiveAmount");
    },
    //验证用户输入值
    validateCom(rule, value, callback) {
      if (value != null && value != "" && value != undefined) {
        const one = Number(value);
        if (Number.isInteger(one)) {
          if (one < 1) {
            return callback(new Error("输入值必须大于0"));
          }
          return callback();
        }
        return callback(new Error("输入值必须为正整数"));
      } else {
        return callback();
      }
    },
    validateMin(rule, value, callback) {
      const one = Number(value);
      const max = Number(this.form.endReceiveAmount);
      if (!max || one < max) {
        return callback();
      }
      return callback(new Error("输入值不得大于最大值"));
    },
    validateMax(rule, value, callback) {
      const one = Number(value);
      const min = Number(this.form.startReceiveAmount);
      if (!min || one > min) {
        return callback();
      }
      return callback(new Error("输入值不得小于最小值"));
    },
  },
  created() {
    this.getPaymentOrderList();
  },
  filters: {
    timeFilter(value) {
      var date = new Date(value);
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentDate =
        date.getFullYear() +
        "-" +
        month +
        "-" +
        strDate +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
      return currentDate;
    },
  },
};
</script>

<style lang="scss">
.paymentOrderYN {
  .el-form-item__content {
    width: 180px !important;
    margin-right: 20px;
  }
  .el-date-editor {
    margin-right: 20px;
  }
  .fontWeight {
    font-weight: bold;
  }
  .tableTitle {
    display: flex;
    div {
      width: 50%;
      text-align: center;
      border: 1px solid rgb(192, 197, 197);
      padding: 10px 0px;
    }
    & > div:nth-of-type(1) {
      background-color: rgb(216, 218, 218);
      font-weight: 600;
    }
  }
}
</style>