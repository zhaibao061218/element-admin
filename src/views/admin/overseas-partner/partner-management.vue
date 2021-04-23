<template>
  <div class="manageMent m-20">
    <div class="pageTitle">
      <h2>合伙人管理</h2>
      <span class="back" v-if="homeViewIndex === 2" @click="homeViewIndex=1">
          <svg-icon icon-class="return" />返回
      </span>
    </div>
    <div class="p-20 bg-white" v-if="homeViewIndex === 1">
      <div class="formBord">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="ID" prop="name">
            <el-input v-model="ruleForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="登录邮箱" prop="email">
            <el-input v-model="ruleForm.email" clearable></el-input>
          </el-form-item>
          <el-form-item label="归属级别" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择">
              <el-option label="一级代理商" value="1"></el-option>
              <el-option label="二级代理商" value="2"></el-option>
              <el-option label="三级代理商" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合伙人状态" prop="state">
            <el-select v-model="ruleForm.state" placeholder="请选择">
              <el-option label="试用期" value="1"></el-option>
              <el-option label="正式代理商" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="注册时间" required>
            <el-form-item prop="date1">    
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.date1"
                style="width: 100%"
                :picker-options="expireTimeOption"
              ></el-date-picker>
            </el-form-item>
            <span class="el-icon-minus"></span>
            <el-form-item prop="date2">
              <el-date-picker
                type="date"
                align="right"
                placeholder="选择日期"
                v-model="ruleForm.date2"
                style="width: 100%"
                :picker-options="expireTimeOption"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >查询</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button class="getExcel" type="primary" plain>导出Excel</el-button>
      </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
           height="550"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="ID" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="登录邮箱" width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="所属级别"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="name" label="合伙人状态" width="120">
          </el-table-column>
          <el-table-column prop="name" label="权限剩余天数" width="120">
          </el-table-column>
          <el-table-column prop="name" label="注册时间" width="120">
          </el-table-column>
          <el-table-column prop="name" label="审核状态" width="120">
          </el-table-column>
          <el-table-column prop="name" label="归属合伙人" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.name}}</span
              ><el-button
                @click="lookPartner(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="name" label="归属会员" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.name}}</span
              ><el-button
                @click="lookMembers(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="name" label="操作人" width="120">
          </el-table-column>
          <el-table-column prop="name" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="lookData(scope.row)" type="text" size="small"
                >查看</el-button
              >
              <el-button type="text" size="small" @click="blacklist(scope.row)"
                >黑名单</el-button
              >
            </template>
          </el-table-column>
        </el-table>
       <pages
          :total="pagetotal"
          :page="currentPage"
          :limit="limit"
          class="pageComponent"
          @pagination="changePage"
        ></pages>
    </div>
    <div class="p-20 bg-white" v-if="homeViewIndex === 2">
      <partner-Info></partner-Info>
    </div>
    <partnerProp ref="partnerProp"></partnerProp>
    <membersProp ref="membersProp"></membersProp>
    <el-dialog
        title="设为黑名单"
        :visible.sync="setBlankList"
        width="500px"
        custom-class="blankList"
        center>
        <div class="blankListView">
          <span class="el-icon-warning"></span>
          <p>确定要将该合伙人设为黑名单吗？</p>
        </div>
        
        <span slot="footer" class="dialog-footer">
          <el-button @click="setBlankList = false">取 消</el-button>
          <el-button type="primary" @click="setUpBlacklist()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import "./index.scss";
import  partnerProp  from './components/partnerProp'
import  membersProp  from './components/membersProp'
import  partnerInfo  from './components/partnerInfo'
import pages from "@/components/Pagination";
export default {
  components: { membersProp ,partnerProp,pages,partnerInfo},
  data() {
    return {
      expireTimeOption: {
        disabledDate(date) {
          // disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
          return date.getTime() >= Date.now();
        },
      },
      ruleForm: {
        name: "",
        email: "",
        region: "",
        state: "",
        date1: "",
        date2: "",
      },
      
      tableData: [
        {
          date: "2016-05-03",
          name: "1223",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "1223",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "1223",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "1223",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "1223",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "1223",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "1223",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "1223",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "1223",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      multipleSelection: [],
      dialogPartner: false,
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      partnerProp:"",
      partnerForm:{
         name: "",
        email: "",
        region: "",
        state: "",
        date1: "",
        date2: "",
      },
      setBlankList:false,
      pagetotal: 100,
      currentPage: 1,
      limit: 10,
      homeViewIndex:1,
      blankListId:0,
    };
  },
  computed: {},
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      //console.log(val);
    },
    lookData(val) {
      //console.log(val);
      this.homeViewIndex = 2
    },
    blacklist(obj) {
      //设置黑名单
      console.log(obj);
      this.setBlankList = true;
      this.blankListId = obj.id//保存选择当前数据的ID
    },
    lookPartner(value) {
      //查看合伙人
      //console.log("合伙人")
      this.$refs.partnerProp.$emit("showProp",value)
    },
    lookMembers(value) {
      //归属会员
      //console.log("会员")
      this.$refs.membersProp.$emit("showProp",value )
    },
    lookPartnerIndex(value){
      //console.log(value)
    },
    changePage(obj){
      //console.log(obj)
    }
  },
};
</script>
<style lang="scss" scoped>
.manageMent {
  .formBord {
    overflow: hidden;
    position: relative;
    .getExcel {
      position: absolute;
      bottom: 22px;
      right: 0px;
    }
  }
  .blankListView{
    text-align: center;
    .el-icon-warning{
      font-size: 100px;
      color: #F7A200;
      display: inline-block;
      margin-top: 30px;
    }
    p{
      margin-top: 30px;
    }
  }
  .el-table{
    margin-top: 30px;
  }
}
</style>
