<template>
  <div class="financial">
    <h3>财务管理</h3>
    <div class="elForm">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="130px"
        class="demo-ruleForm"
      >
        <el-form-item label="平台登录账号" prop="login">
          <el-input
            v-model="ruleForm.login"
            placeholder="请输入登录账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="收付款账号" prop="receiving">
          <el-input
            v-model="ruleForm.receiving"
            placeholder="请输入收付款账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="交易流水号" prop="serialNumber">
          <el-input
            v-model="ruleForm.serialNumber"
            placeholder="请输入交易流水号"
          ></el-input>
        </el-form-item>
        <el-form-item label="银行名称" prop="bankName">
          <el-input
            v-model="ruleForm.bankName"
            placeholder="请输入银行名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="交易类型" prop="transactionType">
          <el-select
            v-model="ruleForm.transactionType"
            placeholder="请选择交易类型"
          >
            <el-option label="加盟" value="1"></el-option>
            <el-option label="提现" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属级别" prop="level">
          <el-select v-model="ruleForm.level" placeholder="请选择所属级别">
            <el-option label="一级代理商" value="1"></el-option>
            <el-option label="二级代理商" value="2"></el-option>
            <el-option label="三级代理商" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态" prop="reviewSstatus">
          <el-select
            v-model="ruleForm.reviewSstatus"
            placeholder="请选择审核状态"
          >
            <el-option label="通过" value="1"></el-option>
            <el-option label="待审核" value="2"></el-option>
            <el-option label="不通过" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易时间" required class="tradingTime">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.date1"
                style="width: 100%"
                @change="changeTime()"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line el-icon-minus" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.date2"
                style="width: 100%"
                @change="changeTime()"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item class="formFooter">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >查询</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="elTable">
      <el-table :data="tableData" height="350" style="width: 100%">
        <el-table-column prop="loginAccount" label="平台登录账号">
        </el-table-column>
        <el-table-column prop="collection" label="收付款账号" width="160">
        </el-table-column>
        <el-table-column prop="accountName" label="账户名"> </el-table-column>
        <el-table-column prop="bankName" label="银行名称"> </el-table-column>
        <el-table-column prop="dealFlow" label="交易流水号" width="160">
        </el-table-column>
        <el-table-column prop="amountTransaction" label="交易金额">
        </el-table-column>
        <el-table-column prop="transactionType" label="交易类型">
        </el-table-column>
        <el-table-column prop="level" label="所属级别"> </el-table-column>
        <el-table-column prop="tradingHours" label="交易时间" width="180">
        </el-table-column>
        <el-table-column prop="operator" label="操作人"> </el-table-column>
        <el-table-column prop="auditStatus" label="审核状态">
          <template slot-scope="scope">
            <span v-if="scope.row.auditStatus === 0" class="successColor"
              >通过</span
            >
            <span v-if="scope.row.auditStatus === 1" class="warningColor"
              >待审核</span
            >
            <span v-if="scope.row.auditStatus === 2" class="errorColor"
              >不通过</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <span
              @click="handleEdit(scope.$index, scope.row, 1)"
              class="successColor operation"
              >通过</span
            >
            <span
              @click="handleEdit(scope.$index, scope.row, 2)"
              class="errorColor operation"
              >不通过</span
            >
            <span
              @click="handleEdit(scope.$index, scope.row, 3)"
              class="operation"
              >查看</span
            >
          </template>
        </el-table-column>
      </el-table>
      <page
        :total="total"
        :page="currentPage"
        :limit="limit"
        @pagination="changePage"
      ></page>
    </div>
    <el-dialog
      title="确认通过"
      :visible.sync="dialogVisible"
      custom-class="confirmedBy"
    >
      <div>
        <img src="~@/assets/img/exclamationPoint.png" alt="" srcset="" />
        <p>请再次确认该笔交易是否无误！</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="不通过" :visible.sync="noPass" custom-class="confirmedBy">
      <div>
        <p class="title">不通过原因</p>
        <el-input
          type="textarea"
          v-model="description"
          placeholder="请输入不通过原因"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="noPass = false" class="noPass"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="转账凭证"
      :visible.sync="transferVoucher"
      custom-class="confirmedBy"
    >
      <div>
        <img src="~@/assets/img/index-relOrder4.png" alt="" srcset="" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import "./index.scss";
import page from "@/components/Pagination/index";
export default {
  components: { page },
  data() {
    return {
      ruleForm: {
        login: "",
        receiving: "",
        serialNumber: "",
        bankName: "",
        transactionType: "",
        level: "",
        reviewSstatus: "",
        date1: "",
        date2: "",
      },
      rules: {
        login: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        receiving: [
          { required: true, message: "请输入收付款号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        serialNumber: [
          { required: true, message: "请输入交易流水号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        bankName: [
          { required: true, message: "请输入银行名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        transactionType: [
          { required: true, message: "请选择交易类型", trigger: "change" },
        ],
        level: [
          { required: true, message: "请选择代理商级别", trigger: "change" },
        ],
        reviewSstatus: [
          { required: true, message: "请选择审核状态", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
      },
      tableData: [
        {
          loginAccount: "456@gm.com",
          collection: "2564 3221 3556 4545",
          accountName: "maia madani",
          bankName: "中国银行",
          dealFlow: "1884771351078788",
          amountTransaction: "$20,000.00",
          transactionType: "加盟",
          level: "一级合伙人",
          tradingHours: "2021年1月20日15:04:07",
          operator: "admin",
          auditStatus: 1,
          operation: 0,
        },
        {
          loginAccount: "456@gm.com",
          collection: "2564 3221 3556 4545",
          accountName: "maia madani",
          bankName: "中国银行",
          dealFlow: "1884771351078788",
          amountTransaction: "$20,000.00",
          transactionType: "加盟",
          level: "一级合伙人",
          tradingHours: "2021年1月20日15:04:07",
          operator: "admin",
          auditStatus: 0,
          operation: 0,
        },
        {
          loginAccount: "456@gm.com",
          collection: "2564 3221 3556 4545",
          accountName: "maia madani",
          bankName: "中国银行",
          dealFlow: "1884771351078788",
          amountTransaction: "$20,000.00",
          transactionType: "提现",
          level: "一级合伙人",
          tradingHours: "2021年1月20日15:04:07",
          operator: "admin",
          auditStatus: 1,
          operation: 0,
        },
        {
          loginAccount: "456@gm.com",
          collection: "2564 3221 3556 4545",
          accountName: "maia madani",
          bankName: "中国银行",
          dealFlow: "1884771351078788",
          amountTransaction: "$20,000.00",
          transactionType: "加盟",
          level: "一级合伙人",
          tradingHours: "2021年1月20日15:04:07",
          operator: "admin",
          auditStatus: 1,
          operation: 0,
        },
        {
          loginAccount: "456@gm.com",
          collection: "2564 3221 3556 4545",
          accountName: "maia madani",
          bankName: "中国银行",
          dealFlow: "1884771351078788",
          amountTransaction: "$20,000.00",
          transactionType: "加盟",
          level: "一级合伙人",
          tradingHours: "2021年1月20日15:04:07",
          operator: "admin",
          auditStatus: 2,
          operation: 0,
        },
        {
          loginAccount: "456@gm.com",
          collection: "2564 3221 3556 4545",
          accountName: "maia madani",
          bankName: "中国银行",
          dealFlow: "1884771351078788",
          amountTransaction: "$20,000.00",
          transactionType: "提现",
          level: "一级合伙人",
          tradingHours: "2021年1月20日15:04:07",
          operator: "admin",
          auditStatus: 1,
          operation: 0,
        },
      ],
      dialogVisible: false,
      noPass: false,
      description: "",
      currentPage: 1,
      transferVoucher: false,
      total: 100,
      currentPage: 1,
      limit: 10,
    };
  },
  methods: {
    changeTime() {
      if (this.ruleForm.date1 && this.ruleForm.date2) {
        if (this.ruleForm.date1 > this.ruleForm.date2) {
          this.$message({
            message: "截止日期不能小于开始日期",
            type: "warning",
          });
          this.ruleForm.date2 = "";
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /***
     * index 索引
     * value 数据
     * type 操作类型
     */
    handleEdit(index, value, type) {
      //console.log(index);
      //console.log(value);
      //console.log(type);
      if (type === 1) {
        //通过
        this.dialogVisible = true;
      } else if (type === 2) {
        //不通过
        this.noPass = true;
      } else {
        //查看
        this.transferVoucher = true;
      }
    },
    changePage(obj) {
      this.currentPage = obj.page;
      this.limit = obj.limit;
      //console.log(obj);
    },
  },
};
</script>
<style lang="scss" scoped>
.financial {
  margin: 20px;
  font-size: 12px;
  height: 500px;
  h3 {
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    line-height: 40px;
    color: #555555;
    font-size: 20px;
    font-weight: lighter;
  }
  .elForm {
    background: #fff;
    overflow: hidden;
    padding: 15px 0px;
  }
  .elTable {
    background: #fff;
    .el-table {
      padding: 20px 0px;
    }
    .operation {
      display: inline-block;
      margin-right: 5px;
      cursor: pointer;
    }
    .paging {
      margin-top: 50px;
      padding-bottom: 20px;
    }
  }
}
</style>