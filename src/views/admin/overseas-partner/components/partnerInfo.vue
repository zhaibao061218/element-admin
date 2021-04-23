<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="1" class="info">
        <h3>基本信息</h3>
        <el-row>
          <el-col :span="24" :lg="12" :sm="12">
            <div class="grid-content bg-purple view">
              <img
                class="imgMan"
                src="@/assets/img/rennew.jpg"
                alt=""
                srcset=""
              />
              <ul>
                <li>Rebates等级：V1</li>
                <li>合伙人昵称：3456@gm.com</li>
                <li>登录邮箱：3456@gm.com</li>
                <li>注册时间：12/04/2020 17:41:17</li>
                <li>审核状态：已通过</li>
                <li class="titleWarn">
                  银行账号：
                  <el-popover placement="bottom-start" trigger="click">
                    <p>美国银行 2564 3221 3556 4545</p>
                    <p>摩根大通 2564 3221 3556 4545</p>
                    <p>美国银行 2564 3221 3556 4545</p>
                    <p>摩根大通 2564 3221 3556 4545</p>
                    <p slot="reference">
                      美国银行 2564 3221 3556 4545
                      <el-button type="text" size="small"
                        >展开<span class="el-icon-arrow-down"></span
                      ></el-button>
                    </p>
                  </el-popover>
                </li>
              </ul></div
          ></el-col>
          <el-col :span="24" :lg="6" :sm="12">
            <div class="grid-content bg-purple-light view">
              <ul>
                <li>权限剩余：365天</li>
                <li>归属级别：一级合伙人</li>
                <li>合伙人状态：正式合伙人</li>
                <li>公司名称：Tony Yang Technology Co., Ltd</li>
                <li>手机号：1-222-333-4444</li>
                <li>Messenger：Skype</li>
              </ul>
            </div>
          </el-col>
          <el-col :span="24" :lg="6" :sm="24">
            <div class="grid-content bg-purple view btnGroup">
              <ul>
                <li>
                  账户状态：
                  <el-button size="small" plain class="white" autofocus="false">白名单</el-button
                  ><el-button size="small" plain class="black" autofocus="false">黑名单</el-button>
                </li>
                <li>
                  密码重置：
                  <el-button size="small" type="primary">重置密码</el-button>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
        <h3 class="userMoney">账户资金</h3>
        <el-row class="list3">
          <el-col :xs="12" :sm="8">
            <div class="grid-content bg-purple">
              <ul>
                <li>
                  <p>$ 13569.20</p>
                  <p>账户总收益</p>
                </li>
                <li>
                  <p>$ 13569.20</p>
                  <p>当前可提现余额</p>
                </li>
                <li>
                  <p>$ 13569.20</p>
                  <p>当前冻结余额</p>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8">
            <div class="grid-content bg-purple-light">
              <ul>
                <li>
                  <p>$ 13569.20</p>
                  <p>一级合伙人累计奖励</p>
                </li>
                <li>
                  <p>$ 13569.20</p>
                  <p>二级合伙人累计奖励</p>
                </li>
                <li>
                  <p>$ 13569.20</p>
                  <p>三级合伙人累计奖励</p>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8">
            <div class="grid-content bg-purple">
              <ul class="noBorder">
                <li>
                  <p>$ 6351.49</p>
                  <p>下级会员累计奖励</p>
                </li>
                <li>
                  <p>$ 6351.49</p>
                  <p>下下级会员累计奖励</p>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="归属合伙人" name="2" class="partner">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="搜索" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入代理商邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="归属级别" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="一级合伙人" value="1"></el-option>
              <el-option label="二级合伙人" value="2"></el-option>
              <el-option label="三级合伙人" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合伙人状态" prop="state">
            <el-select v-model="ruleForm.state" placeholder="请选择活动区域">
              <el-option label="试用期" value="1"></el-option>
              <el-option label="正式代理商" value="2"></el-option>
              <el-option label="已到期" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
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
                placeholder="选择日期"
                v-model="ruleForm.date2"
                style="width: 100%"
                :picker-options="expireTimeOption"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm',1)"
              >查询</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="合伙人邮箱" width="180">
          </el-table-column>
          <el-table-column prop="name" label="归属级别" width="180">
          </el-table-column>
          <el-table-column prop="address" label="合伙人状态"> </el-table-column>
          <el-table-column prop="address" label="注册时间"> </el-table-column>
          <el-table-column label="下下级合伙人">
            <el-button
              slot-scope="scope"
              @click="lookDownPartner(scope.row)"
              type="text"
              size="small"
              >查看</el-button
            >
          </el-table-column>
        </el-table>
        <pages
          :total="pagetota"
          :page="currentPage"
          :limit="limit"
          class="pageComponent"
          layout="total, prev, pager, next, jumper"
          @pagination="changePage"
        ></pages>
      </el-tab-pane>
      <el-tab-pane label="归属会员" name="3" class="members">
        <el-form
          :model="membersForm"
          ref="membersForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="搜索" prop="name">
            <el-input
              v-model="membersForm.name"
              placeholder="请输入代理商邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="活动时间" >
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="membersForm.date1"
                style="width: 100%"
                :picker-options="expireTimeOption"
              ></el-date-picker>
            </el-form-item>
            <span class="el-icon-minus"></span>
            <el-form-item prop="date2">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="membersForm.date2"
                style="width: 100%"
                :picker-options="expireTimeOption"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('membersForm',2)"
              >查询</el-button
            >
            <el-button @click="resetMembersForm('membersForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="下级会员邮箱"> </el-table-column>
          <el-table-column prop="address" label="注册时间"> </el-table-column>
          <el-table-column label="下下级会员">
            <el-button
              slot-scope="scope"
              @click="lookDownMembers(scope.row)"
              type="text"
              size="small"
              >查看</el-button
            >
          </el-table-column>
        </el-table>
        <pages
          :total="pagetota"
          :page="currentPage"
          :limit="limit"
          class="pageComponent"
          layout="total, prev, pager, next, jumper"
          @pagination="changePage"
        ></pages>
      </el-tab-pane>
      <el-tab-pane label="奖励记录" name="4" class="reward">
        <el-form
          :model="rewardForm"
          ref="rewardForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="搜索" prop="email">
            <el-input
              v-model="rewardForm.email"
              placeholder="请输入代理商邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="奖励记录" prop="rewardsRecord">
            <el-select v-model="rewardForm.rewardsRecord" placeholder="请选择">
              <el-option label="合伙人奖励" value="1"></el-option>
              <el-option label="会员奖励" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-select v-model="rewardForm.state" placeholder="请选择">
              <el-option label="已完成" value="1"></el-option>
              <el-option label="冻结中" value="2"></el-option>
              <el-option label="已撤回" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="归属级别" prop="level">
            <el-select v-model="rewardForm.level" placeholder="请选择活动区域">
              <el-option label="一级合伙人" value="1"></el-option>
              <el-option label="二级合伙人" value="2"></el-option>
              <el-option label="三级合伙人" value="3"></el-option>
              <el-option label="直属一级会员" value="4"></el-option>
              <el-option label="直属二级会员" value="5"></el-option>
              <el-option label="二级合伙人一级会员" value="6"></el-option>
              <el-option label="二级合伙人二级会员" value="7"></el-option>
              <el-option label="三级合伙人一级会员" value="8"></el-option>
              <el-option label="三级合伙人二级会员" value="9"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" >
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="rewardForm.date1"
                style="width: 100%"
                :picker-options="expireTimeOption"
              ></el-date-picker>
            </el-form-item>
            <span class="el-icon-minus"></span>
            <el-form-item prop="date2">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="rewardForm.date2"
                style="width: 100%"
                :picker-options="expireTimeOption"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('rewardForm',3)"
              >查询</el-button
            >
            <el-button @click="resetrewardForm('rewardForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="金额"> </el-table-column>
          <el-table-column prop="address" label="原因"> </el-table-column>
          <el-table-column prop="address" label="归属级别"> </el-table-column>
          <el-table-column prop="address" label="交易时间"> </el-table-column>
          <el-table-column prop="address" label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.date }}</span>
            </template>
          </el-table-column>
        </el-table>
        <pages
          :total="pagetota"
          :page="currentPage"
          :limit="limit"
          class="pageComponent"
          layout="total, prev, pager, next, jumper"
          @pagination="changePage"
        ></pages>
      </el-tab-pane>
      <el-tab-pane label="收支记录" name="5" class="payments">
        <el-form
          :model="rewardForm"
          ref="paymentsForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="搜索" prop="email">
            <el-input
              v-model="paymentsForm.email"
              placeholder="请输入代理商邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="奖励记录" prop="rewardsRecord">
            <el-select v-model="paymentsForm.rewardsRecord" placeholder="请选择">
              <el-option label="合伙人奖励" value="1"></el-option>
              <el-option label="会员奖励" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-select v-model="paymentsForm.state" placeholder="请选择">
              <el-option label="已完成" value="1"></el-option>
              <el-option label="冻结中" value="2"></el-option>
              <el-option label="已撤回" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="归属级别" prop="level">
            <el-select v-model="paymentsForm.level" placeholder="请选择活动区域">
              <el-option label="一级合伙人" value="1"></el-option>
              <el-option label="二级合伙人" value="2"></el-option>
              <el-option label="三级合伙人" value="3"></el-option>
              <el-option label="直属一级会员" value="4"></el-option>
              <el-option label="直属二级会员" value="5"></el-option>
              <el-option label="二级合伙人一级会员" value="6"></el-option>
              <el-option label="二级合伙人二级会员" value="7"></el-option>
              <el-option label="三级合伙人一级会员" value="8"></el-option>
              <el-option label="三级合伙人二级会员" value="9"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="paymentsForm.date1"
                style="width: 100%"
                :picker-options="expireTimeOption"
              ></el-date-picker>
            </el-form-item>
            <span class="el-icon-minus"></span>
            <el-form-item prop="date2">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="paymentsForm.date2"
                style="width: 100%"
                :picker-options="expireTimeOption"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('paymentsForm',4)"
              >查询</el-button
            >
            <el-button @click="resetPaymentsForm('paymentsForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="流水号"> </el-table-column>
          <el-table-column prop="address" label="交易账号"> </el-table-column>
          <el-table-column prop="address" label="交易类型"> </el-table-column>
          <el-table-column prop="address" label="提款金额"> </el-table-column>
          <el-table-column prop="address" label="申请时间"> </el-table-column>
          <el-table-column prop="address" label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.date }}</span>
            </template>
          </el-table-column>
        </el-table>
        <pages
          :total="pagetota"
          :page="currentPage"
          :limit="limit"
          class="pageComponent"
          layout="total, prev, pager, next, jumper"
          @pagination="changePage"
        ></pages>
      </el-tab-pane>
    </el-tabs>

    <attributable-PartnerProp
      ref="attributablePartner"
    ></attributable-PartnerProp>
    <attributable-MembersProp
      ref="attributableMembers"
    ></attributable-MembersProp>
  </div>
</template>
<script>
import pages from "@/components/Pagination";
import attributablePartnerProp from "../components/attributablePartnerProp";
import attributableMembersProp from "../components/attributableMembersProp";
export default {
  components: { pages, attributablePartnerProp, attributableMembersProp },
  data() {
    return {
      expireTimeOption: {
        disabledDate(date) {
          // disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
          return date.getTime() >= Date.now();
        },
      },
      activeName: "1",
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        state: "",
      },
      membersForm: {
        name: "",
        date1: "",
        date2: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      rewardForm: {
        email: "",
        rewardsRecord: "",
        state: "",
        level: "",
        date1: "",
        date2: "",
      },
      paymentsForm:{
        email: "",
        rewardsRecord: "",
        state: "",
        level: "",
        date1: "",
        date2: "",
      },
      pagetota: 100,
      currentPage: 1,
      limit: 10,
    };
  },
  methods: {
    //切换table
    handleClick(tab, event) {
      this.currentPage = 1;
      this.limit = 10;
      console.log(tab);
    },
    submitForm(formName,index) {
      switch(index) {
        //归属合伙人
          case 1:
              alert(index)
              break;
        //归属会员
          case 2:
              alert(index)
              break;
        //奖励记录
          case 3:
              alert(index)
              break;
        
          case 4:
              alert(index)
              break;
          default:
              alert("745555")
      } 
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
    resetMembersForm(membersForm) {
      this.$refs[membersForm].resetFields();
    },
    changePage(obj) {
      console.log(obj);
    },
    lookDownPartner(obj) {
      console.log(obj);
      this.$refs.attributablePartner.$emit("showProp", obj);
    },
    lookDownMembers(obj) {
      this.$refs.attributableMembers.$emit("showProp", obj);
    },
    resetrewardForm(rewardForm) {
      this.$refs[rewardForm].resetFields();
    },
    resetPaymentsForm(paymentsForm){
       this.$refs[paymentsForm].resetFields();
    }
  },
};
</script>
<style lang="scss" scoped>
.info {
  color: #666;
  h3 {
    margin: 20px 0px;
    background: #fff;
    &.userMoney {
      height: 30px;
      margin-top: 30px;
      border-bottom: 1px solid #f2f2f2;
    }
  }
  .imgMan {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 30px;
    margin-left: 20px;
  }
  .view {
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
    li {
      line-height: 30px;
    }
    &.btnGroup {
      li {
        margin-bottom: 10px;
        .white{
          &:focus,&:hover{
            background: #67c23a;
            color: #fff;
            border-color: #67c23a;
          }
        }
        .black{
          &:focus,&:hover{
            background: #e6a23c;
            color: #fff;
             border-color: #e6a23c;
          }
        }
      }
    }
  }
  .titleWarn {
    display: flex;
    justify-content: flex-start;
  }
  .list3 {
    ul {
      display: flex;
      justify-content: space-around;
      border-right: 1px solid #d7d7d7;
      height: 120px;
      align-items: center;
      li {
        font-size: 14px;
        p {
          &:first-child {
            font-weight: 700;
            margin-bottom: 35px;
            font-size: 16px;
          }
        }
      }
      &.noBorder {
        border-right: 0px;
      }
     
        
      
    }
  }
}

.partner,
.members,
.reward,
.payments {
  .el-form {
    margin-top: 20px;
    overflow: hidden;
  }
  .el-table {
    margin-top: 30px;
  }
}
</style>