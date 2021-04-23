<template>
  <div class="m-20">
    <el-dialog
      :title="propTitle"
      :visible.sync="dialogPartner"
      center
      custom-class="partnerProp"
      width="950px"
    >
      <el-form
        :model="partnerForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="搜索" prop="name">
          <el-input
            v-model="partnerForm.name"
            clearable
            placeholder="请输入代理商邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="注册时间" required>
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="partnerForm.date1"
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
              v-model="partnerForm.date2"
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
          <el-button>导出Excel</el-button>
        </el-form-item>
      </el-form>
      <div v-show="showView === 1" class="tableBorder">
        <el-table :data="gridData">
          <el-table-column property="date" label="一级会员昵称"></el-table-column>
          <el-table-column property="name" label="注册时间"></el-table-column>
          <el-table-column property="name" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="lookPartnerIndex(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <pages
          :total="pagetotal"
          :page="currentPage"
          :limit="limit"
          class="pageComponent"
          @pagination="changePage1"
        ></pages>
      </div>
      <div v-show="showView === 2" class="tableBorder">
        <p><el-button type="primary" @click="showView = 1">返回</el-button></p>
        <el-table :data="gridData">
          <el-table-column property="date" label="一级会员昵称"></el-table-column>
          <el-table-column property="name" label="注册时间"></el-table-column>
        </el-table>
         <pages
          :total="pagetota2"
          :page="currentPage"
          :limit="limit"
          class="pageComponent"
          @pagination="changePage2"
        ></pages>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pages from "@/components/Pagination";
export default {
  components: { pages },
  data() {
    return {
      expireTimeOption: {
        disabledDate(date) {
          // disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
          return date.getTime() >= Date.now();
        },
      },

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
      propTitle: "",
      partnerForm: {
        name: "",
        email: "",
        region: "",
        state: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      showView: 1,
      pagetotal: 50,
      currentPage: 1,
      limit: 10,
      pagetota2:100,
    };
  },
  created() {
    this.$on("showProp", (content) => {
      this.propTitle = `【${content.date}】的推荐列表`;
      this.dialogPartner = true;
      console.log(content);
    });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    lookPartner(value) {
      this.partnerProp = `【${value.name}】的推荐列表`;
      this.dialogPartner = true;
    },
    lookPartnerIndex(value) {
      console.log(value);
      this.showView = 2;
    },
    changePage1(obj) {
      console.log(obj);
    },
    changePage2(obj){
     console.log(obj);
    }
  },
};
</script>
<style lang="scss" scoped>
.partnerProp {
  .el-dialog__header {
    background: #4ba3d3;
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
  }
  .demo-ruleForm {
    padding-top: 30px;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid #999;
  }
  .tableBorder{
    margin: 0 30px;
  }
}
</style>
