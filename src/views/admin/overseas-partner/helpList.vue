<template>
  <div class="helpView">
    <h3>帮助管理</h3>
    <div class="homeView" v-show="viewIndex === 1">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择">
            <el-option label="代理商介绍" value="1"></el-option>
            <el-option label="Rebatest 会员介绍" value="2"></el-option>
            <el-option label="关于平台提现及支付说明" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="ruleForm.state" placeholder="请选择">
            <el-option label="已发布" value="1"></el-option>
            <el-option label="已下架" value="2"></el-option>
            <el-option label="草稿" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间" required class="timeGroup">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%"
               value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <div class="breakpoint">-</div>
          <el-form-item prop="date2">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date2"
              style="width: 100%"
               value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item class="btnGroup">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >查询</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <span class="classType">分类管理</span
          ><span class="addHelp" @click="goUp()">新增帮助</span>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        height="450"
        style="width: 100%"
        class="helpTable"
      >
        <el-table-column prop="date" label="标题"> </el-table-column>
        <el-table-column prop="name" label="分类"> </el-table-column>
        <el-table-column prop="address" label="编辑时间"> </el-table-column>
        <el-table-column prop="state" label="状态"> </el-table-column>
        <el-table-column prop="setUser" label="操作人"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="operation">
              <span @click="look(scope.$index,scope.row)">预览</span
              ><span @click="write(scope.$index,scope.row)">编辑</span
              ><span @click="deleteData(scope.$index,scope.row)">删除</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <page :total="total" :page="currentPage" :limit="limit" @pagination="changePage"></page>
    </div>
    <div class="describe" v-show="viewIndex === 2">
      <p>什么是 Rebatest 合伙人？ <span @click="goHome()" >返回</span></p>
      <div>
        <p>
          什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？
        </p>
        <p>
          什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？
        </p>
        <p>
          什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest
          合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？什么是
          Rebatest 合伙人？什么是 Rebatest 合伙人？什么是 Rebatest 合伙人？
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import "./help.scss";
import page from "@/components/Pagination/index"
export default {
  components:{page},
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        state: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        region: [{ required: true, message: "请选择分类", trigger: "change" }],
        state: [{ required: true, message: "请选择状态", trigger: "change" }],
        date1: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "string",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
      viewIndex: 1,
      tableData: [
        {
          date: "什么是 Rebatest 合伙人？",
          name: "合伙人介绍",
          address: "2021年1月20日16:39:47",
          state: "已发布",
          setUser: "admin",
        },
        {
          date: "什么是 Rebatest 合伙人？",
          name: "合伙人介绍",
          address: "2021年1月20日16:39:47",
          state: "已发布",
          setUser: "admin",
        },
        {
          date: "什么是 Rebatest 合伙人？",
          name: "合伙人介绍",
          address: "2021年1月20日16:39:47",
          state: "已发布",
          setUser: "admin",
        },
        {
          date: "什么是 Rebatest 合伙人？",
          name: "合伙人介绍",
          address: "2021年1月20日16:39:47",
          state: "已发布",
          setUser: "admin",
        },
        {
          date: "什么是 Rebatest 合伙人？",
          name: "合伙人介绍",
          address: "2021年1月20日16:39:47",
          state: "已发布",
          setUser: "admin",
        },
        {
          date: "什么是 Rebatest 合伙人？",
          name: "合伙人介绍",
          address: "2021年1月20日16:39:47",
          state: "已发布",
          setUser: "admin",
        },
        {
          date: "什么是 Rebatest 合伙人？",
          name: "合伙人介绍",
          address: "2021年1月20日16:39:47",
          state: "已发布",
          setUser: "admin",
        },
        {
          date: "什么是 Rebatest 合伙人？",
          name: "合伙人介绍",
          address: "2021年1月20日16:39:47",
          state: "已发布",
          setUser: "admin",
        },
      ],
      total:100,
      currentPage:1,
      limit:10
    };
  },
  methods: {
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
    goUp() {
      this.$router.push({ name: "addHelp" });
    },
    look(index,value) {
      this.viewIndex = 2;
      //console.log(index)
      //console.log(value)
    },
    write(value) {
      var id = value.id
      //console.log(value)
      this.$router.push({name:"addHelp",params:{id:id}})
    },
    deleteData(value) {
      var id = value.id
      //删除数据
    },
    goHome(){
     this.viewIndex = 1;
    },
    changePage(obj){
      this.currentPage = obj.page;
      this.limit = obj.limit;
    }
  },
};
</script>
<style lang="scss" scoped>
.helpView {
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
  .homeView {
    background: #fff;
    overflow: hidden;
    padding-top: 30px;
    .helpTable {
      .operation {
        span {
          display: inline-block;
          margin: 0 5px;
          cursor: pointer;
          &:nth-child(1){
            color: #16A8E1;
          }
          &:nth-child(2){
            color: #70B603;
          }
          &:nth-child(3){
            color: #E00091;
          }
        }
      }
    }
  }
  .describe {
    clear: left;
    background: #fff;
    padding: 20px 0px;
    & > p {
      text-align: center;
      font-size: 18px;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #ccc;
      margin: 0 50px;
      position: relative;
      span{
        position: absolute;
        right: 0px;
        top: 0px;
        display: inline-block;
        width: 140px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 4px;
        border: 1px solid #797979;
        font-size: 14px;
        cursor: pointer;
      }
    }
    & > div {
      padding: 0 50px;
      line-height: 30px;
      P {
        margin-bottom: 50px;
        font-size: 15px;
      }
    }
  }
}
</style>