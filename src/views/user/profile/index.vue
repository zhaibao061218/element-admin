<template>
  <div class="app-container personalCenter">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>个人中心</span>
      </div>

      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        :show-header="false"
        v-loading="loading"
      >
        <el-table-column prop="personal" width="240" />
        <el-table-column prop="kong" />
        <el-table-column fixed="right" width="180">
          <template slot-scope="scope">
            <template v-if="scope.$index != 3">
              <el-button
                type="text"
                size="small"
                @click="handleUpdate(scope.$index, scope.row)"
                >{{ scope.$index != 7 ? "修改" : "续费记录" }}</el-button
              >
            </template>
          </template>
        </el-table-column>
      </el-table>
      <!-- 自动索评star -->
      <el-dialog title="设置索评规则" :visible.sync="sono" width="500px">
        <el-alert
          title="提示：根据您选中的星级，我们将向提交相应星级测评报告的买家发送索评邮件；"
          type="error"
          :closable="false"
          class="m-b-15"
        >
        </el-alert>
        <el-form :model="form" label-position="top">
          <el-form-item label="索评">
            <el-col :span="14">
              <el-select v-model="Status">
                <el-option label="开启" :value="0"></el-option>
                <el-option label="关闭" :value="1"></el-option>
              </el-select>
            </el-col>

            <el-col :span="10" v-show="Status == 0">
              <el-radio v-model="Scoring" :value="1" :label="1">4星及以上</el-radio>
              <el-radio v-model="Scoring"  :value="2" :label="2">5星</el-radio>
            </el-col>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="sono = false">取 消</el-button>
          <el-button type="primary" @click="upStatus">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 自动索评end -->

      <!-- 店铺规则star -->
      <el-dialog
        title="规则信息"
        :visible.sync="store"
        width="30%"
        customClass="setRoles"
      >
        <span>设置规则</span><br /><br />
        
        <el-checkbox-group v-model="checkedCities">
          <el-checkbox v-for="city in cities" :label="city" :key="city.id">
            允许同一个买家在
            <input type="text" v-model="city.month" />
            个月内，可申请同一店铺<input
              type="text"
              v-model="city.productNumber"
            />
            几个产品
          </el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="setRules">保 存</el-button>
        </span>
      </el-dialog>
      <!-- 店铺规则end -->

      <!-- 电话号码star -->
      <el-dialog
        title="修改手机号码"
        :visible.sync="telephone"
        width="30%"
        customClass="updatePhoneNumber"
      >
        
        <el-form
          :model="PhoneNumber"
          :rules="rulesPhoneNumber"
          ref="PhoneNumber"
          label-width="100px"
          class="demo-PhoneNumber"
        >
          <el-form-item
            label="您的新手机号码"
            prop="mobileNumber"
            label-width="120px"
          >
            <el-input
              type="tel"
              v-model="PhoneNumber.mobileNumber"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="短信验证码"
            prop="phoneCode"
            label-width="120px"
            class="phoneCode"
          >
            <el-input
              type="password"
              v-model="PhoneNumber.phoneCode"
              autocomplete="off"
            ></el-input>
            <button @click="getPhoneCode">获取验证码</button>
          </el-form-item>
          <el-form-item
            label="验证登录密码"
            prop="loginPassword"
            label-width="120px"
          >
            <el-input
              type="password"
              v-model="PhoneNumber.loginPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item class="btnGroup">
            <el-button type="primary" @click="submitForm('PhoneNumber')"
              >确定修改</el-button
            >
          </el-form-item>
        </el-form>
        
      </el-dialog>
      <!-- 电话号码end -->

      <!-- 公司-店铺名称star -->
      <el-dialog
        title="设置店铺名称"
        :visible.sync="company"
        width="30%"
        customClass="companyName"
      >
        <p>
          <span>公司-店铺名称:</span>
          <el-input v-model="inputCompany" placeholder="" />
        </p>

        <span slot="footer" class="dialog-footer">
          <el-button @click="company = false">关 闭</el-button>
          <el-button type="primary" @click="setCompanyName">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 公司-店铺名称end -->

      <!-- 商家联系地址star -->
      <el-dialog
        title="修改地址"
        :visible.sync="address"
        width="30%"
        customClass="companyAddress"
      >
        <p>
          <span>商家联系地址:</span
          ><el-input v-model="inputAddress" placeholder="" />
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="address = false">关 闭</el-button>
          <el-button type="primary" @click="setAddress">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 商家联系地址end -->

      <!-- 登陆密码star -->
      <el-dialog
        title="修改密码"
        :visible.sync="password"
        width="30%"
        customClass="updatePsd"
      >

        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              type="password"
              v-model="ruleForm.newPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              type="password"
              v-model="ruleForm.confirmPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item class="btnGroup">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >确定</el-button
            >
            <el-button @click="resetForm('ruleForm')">关闭</el-button>
          </el-form-item>
        </el-form>
      
      </el-dialog>

      <!-- 续费记录star -->
      <el-dialog title="套餐购买记录" :visible.sync="dialogPayrecordVisible">
        <el-table :data="tableData1">
          <el-table-column prop="type" label="套餐类型" width="180">
          </el-table-column>
          <el-table-column prop="price" label="单价(元)" width="180">
          </el-table-column>
          <el-table-column prop="mouth" label="购买月份"> </el-table-column>
          <el-table-column prop="total" label="总金额(元)"> </el-table-column>
          <el-table-column prop="time" label="支付时间"> </el-table-column>
          <el-table-column prop="payment" label="支付方式"> </el-table-column>
        </el-table>
        <el-pagination style="text-align: center;padding-top: 20px;"
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
      </el-dialog>
    </el-card>
    <!-- 续费记录end -->
  </div>
</template>

<script>
import "./prop.scss";
import { mapGetters } from "vuex";
import { sendCode } from "@/api/money";
import axios from 'axios'
export default {
  name: "Profile",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("确认密码与新密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      //  isRenew=1-展示个人详情页     isRenew=2-展示续费记录
      isRenew: 1,
      user: {},
      sono: false,
      radio: "1",
      store: false,
      checked: true,
      input: "",
      input1: "",
      telephone: false,
      input2: "",
      input3: "",
      input4: "",
      company: false,
      inputCompany: "",
      address: false,
      inputAddress: "",
      password: false,
      // olds: "",
      // news: "",
      // quepass: "",
      tableData: [
        {
          personal: "自动索评",
          kong: "",
        },
        {
          personal: "店铺规则",
          kong: "",
        },
        {
          personal: "电话号码",
          kong: "18077660000",
        },
        {
          personal: "邮箱",
          kong: "",
          scope: "",
        },
        {
          personal: "公司-店铺名称",
          kong: "",
        },
        {
          personal: "商家联系地址",
          kong: "",
        },
        {
          personal: "登陆密码",
          kong: "",
        },
        {
          personal: "会员套餐",
          kong:
            "有效期至:2021/6/10 9:22:55      套餐详请：总店铺数：30,已使用：24      总产品数：无限制,已使用：31",
        },
      ],
      tableCheckedIndex: 0,
      tableData1: [
        {
          type: "",
          price: "",
          mouth: "",
          total: "",
          time: "",
          payment: "",
        },
      ],
      ruleForm: {
        password: "",
        confirmPassword: "",
        newPassword: "",
      },
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        confirmPassword: [
          { validator: validatePass2, required: true, trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
      PhoneNumber: {
        mobileNumber: "",
        phoneCode: "",
        loginPassword: "",
      },
      rulesPhoneNumber: {
        mobileNumber: [
          { required: true, message: "请输入新的手机号码", trigger: "blur" },
          { min: 3, max: 8, message: "请输入合格的手机号码", trigger: "blur" },
        ],
        phoneCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        loginPassword: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        confirmPassword: [{ validator: validatePass2, trigger: "blur" }],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
      checkedCities: [],
      cities: [
        {
          id: 0,
          month: 1,
          productNumber: 2,
        },
        {
          id: 1,
          month: 1,
          productNumber: 2,
        },
      ],
      loading: false,
      Status: "",
      Scoring: "",
      dialogPayrecordVisible: true,
      form: {},
      isFirst: true,
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"]),
  },
  created() {
    this.getUser();
  },
  methods: {
    //修改自动索评状态
    upStatus(){
      axios.post('http://192.168.1.190/api/Account/editrequestcommentdetail',{merchantCode:123,status:this.Status,scoring:this.Scoring}).then((res)=>{
        console.log(res);
        if(res.data.Data.Result){
        this.$message({
          message: '修改成功！',
          type: 'success'
        });
          this.sono=false;
        }else{
          this.$message({
          showClose: true,
          message: '修改失败！',
          type: 'error'
        });
        }
      })
    },
     //修改店铺规则
    upRules(){
      axios.post('http://192.168.1.190/api/Account/getsellerruleinfolist').then((res)=>{
        console.log(res);
        if(res.data.Data.Result){
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.store=false;
        }else{
          this.$message({
            showClose:true,
             message: '修改失败！',
             type: 'error'
          });
        }
      })
    },

    //修改电话号码


    //修改店铺名称
    upShop(){
      axios.post('http://192.168.1.190/api/Account/savemerchartuserinfo').then((res)=>{
        console.log(res);
        if(res.data.Data.Result){
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.company=false;
        }else{
          this.$message({
             showClose:true,
             message: '修改失败！',
             type: 'error'
          });
        }
      })
    },


    //修改商家联系地址
    upAddress(){
      axios.post('http://192.168.1.190/api/Account/savemerchartuserinfo').then((res)=>{
        console.log(res);
        if(res.data.Data.Result){
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.address=false;
        }else{
          this.$message({
             showClose:true,
             message: '修改失败！',
             type: 'error'
          });
        }
      })
    },

    //修改密码
    upPassword(){
      axios.post('http://192.168.1.190/api/Account/updatepassword',{oldpassword:this.oldpassword,newpassword:this.newpassword}).then((res)=>{
        console.log(res);
        if(res.data.Data.Result){
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.password=false;
        }else{
          this.$message({
             showClose:true,
             message: '修改失败！',
             type: 'error'
          });
        }
      })

    },


    //续费记录
    upRenew(){
      axios.post('http://192.168.1.190/api/Account/getsystempriceorderlist',{pageSize:this.pageSize,pageIndex:this.pageIndex,merchantCode:123}).then((res)=>{
        console.log(res);
      })
    },





    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(" | "),
        email: "admin@test.com",
        avatar: this.avatar,
      };
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex >= 8) {
        return "warning-row";
      } else if (rowIndex <= 8) {
        return "success-row";
      }
      return "";
    },
    handleUpdate(index, row) {
      console.log(index);
      this.tableCheckedIndex = index;
      if (index == 0) {
        // 自动索评
        this.sono = true;
      axios.get('http://192.168.1.190/api/Account/getrequestcommentdetail?merchantCode=123').then((res)=>{
        console.log(res);
        this.Status=res.data.Data.Status;
        this.Scoring=res.data.Data.Scoring;
      });

      } else if (index == 1) {
        // 店铺规则
        this.store = true;
        axios.get('http://192.168.1.190/api/Account/getsellerruleinfolist?merchantCode=123').then((res)=>{
          console.log(res);

        });

      } else if (index == 2) {
        this.telephone = true; // 电话号码
        if (!this.isFirst) {
          this.$refs["PhoneNumber"].clearValidate();
        }
      } else if (index == 4) {
        this.company = true; // 公司-店铺名称
        axios.get('http://192.168.1.190/api/Account/savemerchartuserinfo?data=aaaaaa&type=1&merchantCode=123').then((res)=>{
          console.log(res);
          this.data=res.data.Data.data;
          this.type=res.data.Data.type;
        });

      } else if (index == 5) {
        this.address = true; // 商家联系地址
        axios.get('http://192.168.1.190/api/Account/savemerchartuserinfo?data=aaaaaa&type=2&merchantCode=123').then((res)=>{
          console.log(res);
          this.data=res.data.Data.data;
          this.type=res.data.Data.type;
        });

      } else if (index == 6) {
        this.password = true; // 登陆密码
        axios.post('http://192.168.1.190/api/Account/updatepassword',{oldpassword:this.oldpassword,newpassword:this.newpassword}).then((res)=>{
          console.log(res);
        })
        if (!this.isFirst) {
          this.$refs["ruleForm"].clearValidate();
        }
        
      } else if (index == 7) {
        this.renew = true; // 续费记录
        this.isRenew = 2;
        axios.post('http://192.168.1.190/api/Account/getsystempriceorderlist',{pageSize:this.pageSize,pageIndex:this.pageIndex}).then((res)=>{
          console.log(res);
        });
      }
    },
    submitForm(formName) {
      this.isFirst = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName == "ruleForm") {
            //修改密码
            this.password = false;
          }
          if (formName == "PhoneNumber") {
            //修改手机号
            this.telephone = false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.password = false;
    },
    getPhoneCode() {
      //获取验证码
      sendCode()
        .then((res) => {})
        .catch((err) => {});
    },
    setRules() {
      if (this.checkedCities.length <= 0) {
        this.$message({
          type: "warning",
          message: "请至少选择一条规则条件并且设置对应值！",
          showClose: true,
        });
      } else {
        //设置规则
        this.store = false;
      }
 
    },
    setCompanyName() {
      if (this.inputCompany.length <= 0) {
        this.$message({
          type: "warning",
          message: "公司名不能为空！",
          showClose: true,
        });
      } else {
        //设置公司名称
        this.tableData[this.tableCheckedIndex].kong = this.inputCompany;
        this.company = false;
      }
      
    },
    setAddress() {
      if (this.inputAddress.length <= 0) {
        this.$message({
          type: "warning",
          message: "联系地址不能为空！",
          showClose: true,
        });
      } else {
        //设置公司地址
        this.tableData[this.tableCheckedIndex].kong = this.inputAddress;
        this.address = false;
      }
      
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table .warning-row {
  background: rgb(224, 217, 175);
}

.el-table .success-row {
  background: white;
}

.el-table tr {
  background-color: #ffffff;
  height: 85px;
}

.el-dialog__header {
  background: #4ba3d3;
}

.el-dialog__title {
  line-height: 15px;
  font-size: 14px;
  color: white;
}

.el-dialog__headerbtn .el-dialog__close {
  color: grey;
}

.pullDown {
  margin-left: 130px;
  width: 330px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid transparent;
}

.el-dialog__footer {
  border: 1px white solid;
  border-top-color: lightgrey;
}

.el-input--medium .el-input__inner {
  height: 35px;
}
</style>
<style lang="scss" scoped>
.personalCenter {
  .companyName,
  .companyAddress {
    .el-dialog__body > p {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        display: inline-block;
        width: 100px;
      }
      .el-input--medium {
        width: 80%;
      }
    }
  }
}
</style>
