<template>
  <div class="formComponent">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="课程标题" prop="name">
        <el-input v-model="ruleForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="创建时间" >
        <el-form-item prop="date1">
          <el-date-picker
            type="date"
            placeholder="开始时间"
            v-model="ruleForm.date1"
            style="width: 100%"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <div class="minus"><span class="el-icon-minus"></span></div>
        <el-form-item prop="date2">
          <el-date-picker
            type="date"
            placeholder="结束时间"
            v-model="ruleForm.date2"
            style="width: 100%"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item class="success">
        <el-button type="success" @click="submit('ruleForm')">查询</el-button>
      </el-form-item>
      <el-form-item class="addClass">
        <el-button @click="addClass()" type="primary">{{ btnText }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import { Handler } from 'node_modules/mockjs/dist/mock';
export default {
  props: {
    btnText: {
      type: String,
      default: "新增课程",
    },
    classType: {
      type: String,
      default: "1",
    },
    CreateUserId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      ruleForm: {
        name: "",
        date1: "",
        date2: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
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
      },
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var obj = {
            className: this.ruleForm.name,
            starTime: this.ruleForm.date1,
            endTime: this.ruleForm.date2,
            classType: this.classType,
          };
          if (this.ruleForm.date2 < this.ruleForm.date1) {
            this.ruleForm.date2 = "";
            this.ruleForm.date1 = "";
            this.$message.error("结束时间不大小于开始时间!");
          } else {
            this.$emit("lookData", obj);
          }
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    clearForm(){
      this.ruleForm = {
        name: "",
        date1: "",
        date2: "",
      }
    },
    addClass() {
      if (this.classType === "0") {
        this.$router.push({
          path:'/academy/course/edit/2',
          query: {
            id: 3,
            type: 1,
            classType: 1,
            CreateUserId: this.CreateUserId,
          },
        });
      }
      if (this.classType === "1") {
        this.$router.push({
          path:'/academy/course/edit/2',
          query: {
            id: 4,
            type: 2,
            classType: 2,
            CreateUserId: this.CreateUserId,
          },
        });
      }
      if (this.classType === "2") {
        this.$router.push({
          path:'/academy/course/edit/2',
          query: {
            id: 4,
            type: 2,
            classType: 3,
            CreateUserId: this.CreateUserId,
          },
        });
      }
    },
  },
};
</script>
<style lang="scss" >
.formComponent {
  overflow: hidden;
  position: relative;
  .el-form-item {
    float: left;
  }
  .minus {
    color: #555;
    margin: 0 3px;
    float: left;
  }
  .addClass {
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
  .success {
    margin-left: 0px;
    text-align: center;
    
  }
}
</style>
<style >
.formComponent .success{
  text-align: left;
}
.formComponent  .success>div{
  z-index: 10;
 margin-left: 20px !important;

}
</style>