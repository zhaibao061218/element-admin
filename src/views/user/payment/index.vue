<template>
  <!-- <div class="app-container"> -->
  <div class="fundManagement">
    <div class="paymentTop">
      <h3>资金管理</h3>
      <div class="reappearance">
        <p class="title">返现财务状态</p>

        <div class="switch">
          <p class="red">
            重要提示：当可用余额或可用e币出现负值时，代表您今日推广产品所需资金不足，为了不影响产品正常推广测评，请及时充值。
          </p>
          <p class="checkCountry">
            <span class="checkLeft">货币选择</span>
            <label>
              <span
                v-for="item in countryList"
                :key="item.id"
                :class="{ active: currentCountry === item.id }"
                @click="changeCountry(item.id)"
                >{{ item.name }}</span
              >
            </label>
          </p>
          <div>
            <span class="checkLeft">可用余额</span>
            <p v-if="currentCountry === 1">
              <span>999,878,215.99 </span>
              <span class="currencyType">USD</span>
              除冻结金额和推广金额以外，账户可自由支配的金额
            </p>
            <p v-if="currentCountry === 2">
              <span>999,878,215.99 </span><span class="currencyType">GDB</span>
              除冻结金额和推广金额以外，账户可自由支配的金额
            </p>
            <p v-if="currentCountry === 3">
              <span>999,878,215.99</span>
              <span class="currencyType">JPY</span>
              除冻结金额和推广金额以外，账户可自由支配的金额
            </p>
            <p v-if="currentCountry === 1 && device == 'desktop'" class="btn">
              <span @click="childProp(1)">美元充值</span
              ><span @click="showPropwithdrawal()">美元提现</span>
            </p>
            <p v-if="currentCountry === 2 && device == 'desktop'" class="btn">
              <span @click="childProp(1)">英镑充值</span
              ><span @click="showPropwithdrawal()">英镑提现</span>
            </p>
            <p v-if="currentCountry === 3 && device == 'desktop'" class="btn">
              <span @click="childProp(1)">日元充值</span
              ><span @click="showPropwithdrawal()">日元提现</span>
            </p>
          </div>
          <div v-if="device == 'mobile'" class="mobileBtnGroup">
            <p v-if="currentCountry === 1" class="btn">
              <span @click="childProp(1)">美元充值</span
              ><span @click="drawerWithdrawal = true">美元提现</span>
            </p>
            <p v-if="currentCountry === 2" class="btn">
              <span @click="childProp(1)">英镑充值</span
              ><span @click="drawerWithdrawal = true">英镑提现</span>
            </p>
            <p v-if="currentCountry === 3" class="btn">
              <span @click="childProp(1)">日元充值</span
              ><span @click="drawerWithdrawal = true">日元提现</span>
            </p>
          </div>
          <div>
            <span class="checkLeft">冻结金额</span>
            <p v-if="currentCountry === 1">
              <span> 1,325.00 <span class="currencyType">USD</span> </span>
              冻结处理中的金额（包含提现冻结和订单冻结）
            </p>
            <p v-if="currentCountry === 2">
              <span> 1,325.00 <span class="currencyType">GDB</span> </span>
              冻结处理中的金额（包含提现冻结和订单冻结）
            </p>
            <p v-if="currentCountry === 3">
              <span> 1,325.00 <span class="currencyType">JPY</span> </span>
              冻结处理中的金额（包含提现冻结和订单冻结）
            </p>
          </div>
          <div>
            <span class="checkLeft">推广金额</span>
            <p v-if="currentCountry === 1">
              121,644.00
              <span class="currencyType">USD</span> 今日推广产品需占用的金额
            </p>
            <p v-if="currentCountry === 2">
              121,644.00
              <span class="currencyType">GDB</span> 今日推广产品需占用的金额
            </p>
            <p v-if="currentCountry === 3">
              121,644.00
              <span class="currencyType">JPY</span> 今日推广产品需占用的金额
            </p>
          </div>
        </div>
        <hr />
        <p class="title">e币财务状态</p>

        <div class="switch small">
          <!-- <p class="red">
            重要提示：当可用余额或可用e币出现负值时，代表您今日推广产品所需资金不足，为了不影响产品正常推广测评，请及时充值。
          </p> -->
          <div>
            <span class="checkLeft eCoin">可用e币</span>
            <p>
              &ensp; <span> 808232</span><span class="currencyType">e币</span>
              除冻结e币和推广e币以外，账户剩余的e币
            </p>
            <p class="btn" v-if="device == 'desktop'">
              <span @click="childProp(2)">充值e币</span
              ><span @click="exchangeE()">e币兑换</span
              ><span @click="withdrawalE = true">提现e币</span>
            </p>
          </div>
          <div class="mobileBtnGroup" v-if="device == 'mobile'">
            <p class="btn">
              <span @click="childProp(2)">充值e币</span
              ><span @click="exchangeE()">e币兑换</span
              ><span @click="drawerE = true">提现e币</span>
            </p>
          </div>
          <div>
            <span class="checkLeft eCoin">冻结e币</span>
            <p>
              <span> 1,325.00</span> <span class="currencyType">e币</span>
              推广订单冻结的e币
            </p>
          </div>
          <div>
            <span class="checkLeft eCoin">推广金额</span>
            <p>
              <span> 121,644.00</span>
              <span class="currencyType">e币</span> 今日推广产品需占用的e币
            </p>
          </div>
          <div v-if="rechargeState">
            <span class="checkLeft eCoin">充值</span>
            <p class="recharge">
              <input type="text" ref="getFocus" v-model="rechargeValue" /><br
                v-if="device == 'mobile'"
              />
              <span>e币</span><span class="red">(请输入整数,1e币=1CNY)</span>
            </p>
          </div>

          <div v-if="rechargeState">
            <span class="checkLeft eCoin">充值方式</span>
            <p>
              <label class="radioBorder">
                <el-radio
                  v-model="paymentMethod"
                  label="1"
                  @change="radioChanege()"
                ></el-radio>
                <img
                  class="apayIco"
                  src="@/assets/img/Apay.png"
                  alt=""
                  srcset=""
                />
              </label>
              <label class="radioBorder">
                <el-radio
                  v-model="paymentMethod"
                  label="2"
                  @change="radioChanege()"
                ></el-radio>

                <img
                  class="apayIco"
                  src="@/assets/img/Wxpay.png"
                  alt=""
                  srcset=""
                />
              </label>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 申请提现-->
    <el-dialog
      title="信息"
      :visible.sync="withdrawal"
      width="700px"
      :before-close="handleClose"
      custom-class="withdrawal"
      :closeOnClickModal="false"
    >
      <div class="propView">
        <p class="title">
          <span>货币选择</span>
          <span
            v-for="item in countryList"
            :key="item.id"
            :class="{ active: propCheckedCountry === item.id }"
            @click="changeCountryProp(item.id)"
            >{{ item.name }}</span
          >
        </p>
        <div>
          提现到
          <el-select
            v-model="value"
            placeholder="请选择"
            @change="changeAccount"
          >
            <el-option
              v-for="item in account"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <p class="leftLable"><span>账户总金额:</span></p>
          <p class="warnInfo" v-if="isAlipay === '1'">
            <span class="rightLable"> 支付宝账号:</span>
            <input type="text" placeholder="请输入支付宝账号" />
            <button>保存账号</button>
            <span> 请确保你输入的支付宝账号正确可用，否则提现失败</span>
          </p>
          <p class="warnInfo" v-if="isAlipay === '2'">
            paypal账户: <input type="text" placeholder="请输入支付宝账号" />
            <button>保存账号</button>
          </p>
        </div>
        <div>
          <p class="leftLable"><span>冻结金额:</span></p>
          <p>
            <span class="rightLable">支付宝姓名:</span
            ><input type="text" placeholder="请输入支付宝账号" />
          </p>
        </div>
        <div>
          <p class="leftLable"><span>可提现金额:</span></p>
          <p>
            <span class="rightLable">申请提现:</span
            ><input type="text" placeholder="请输入提现金额" />
          </p>
        </div>
        <div v-if="isAlipay === '1'">
          <p class="leftLable"><span>当时实时汇率:</span></p>
          <p>￥人民币到账</p>
        </div>
        <div v-if="isAlipay === '1'">
          <p class="leftLable"><span>注册手机号:</span></p>
          <p>
            <span class="rightLable">短信验证: </span>
            <input type="text" placeholder="请输入验证码" />
            <button>获取验证码</button>
          </p>
        </div>
      </div>
      <p class="Tips">注：提现申请后，会在3-5个工作日进入结算</p>
      <hr />
      <p class="dialogFooter">
        <span @click="withdrawal = false">取消</span>
        <span @click="withdrawal = false">申请提现</span>
      </p>
    </el-dialog>
    <!-- 提现e币 -->
    <div class="withdrawalE">
      <el-dialog
        title="申请提现e币"
        :visible.sync="withdrawalE"
        width="600px"
        custom-class="withdrawalE"
      >
        <el-form :model="WithdrawalE">
          <el-form-item label="提现到" :label-width="formLabelWidth">
            <el-select
              v-model="WithdrawalE.region"
              placeholder="请选择活动区域"
            >
              <el-option label="支付宝账号" value="shanghai"></el-option>
              <el-option label="其他类型" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="支付宝账号"
            :label-width="formLabelWidth"
            class="accountWarn"
          >
            <el-input
              v-model="WithdrawalE.userName"
              autocomplete="off"
              placeholder="请输入您的支付宝账号"
            ></el-input>
            <span>请确保你输入的支付宝账号正确可用，否则提现失败</span>
          </el-form-item>
          <el-form-item label="支付宝姓名" :label-width="formLabelWidth">
            <el-input
              v-model="WithdrawalE.name"
              autocomplete="off"
              placeholder="请输入您的支付宝绑定的姓名"
            ></el-input>
          </el-form-item>
          <p class="lable"><span> 可提现e币</span> <span>996602 e币</span></p>
          <p class="lable"><span> e币换算</span><span>1e币 = ¥ 1元</span></p>
          <el-form-item label="申请提现" :label-width="formLabelWidth">
            <el-input
              v-model="WithdrawalE.amount"
              autocomplete="off"
              placeholder="请输入您的提现金额"
            ></el-input>
          </el-form-item>
          <p class="lable">注册手机号</p>
          <div class="lable">
            <span>短信验证</span
            ><input
              type="text"
              class="verificationCode"
              placeholder="请输入短信验证码"
              v-model="WithdrawalE.verificationCode"
            />
            <button>获取验证码</button>
          </div>
        </el-form>
        <hr />
        <ul>
          <li>注：1、提现申请成功后，会在3-5个工作日进入结算；</li>
          <li>2、为了您的资金安全，提现必须进行短信验证。</li>
        </ul>
        <div slot="footer" class="dialog-footer">
          <el-button @click="withdrawalE = false" class="close"
            >取 消</el-button
          >
          <el-button type="primary" @click="withdrawalE = false"
            >申请e币提现</el-button
          >
        </div>
      </el-dialog>
    </div>
    <paymentProp
      :showHide="showHide"
      ref="childProp"
      @clickType="rechargeType"
    />
    <!-- 支付二维码 -->
    <el-dialog
      title="充值"
      :visible.sync="qrCode"
      :before-close="handleClose"
      custom-class="qrCode"
    >
      <div class="qrCodeView">
        <p>
          请用<span v-if="paymentMethod == 1">支付宝</span
          ><span v-if="paymentMethod == 2">微信</span>扫描支付
        </p>
        <span class="qrCodeIco"></span>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="qrCode = false">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 移动端e币提现 -->
    <el-drawer
      title="申请提现e币"
      :visible.sync="drawerE"
      direction="rtl"
      custom-class="drawerE"
      :size="drawerESize"
      :with-header="true"
      :before-close="handleClose"
    >
      <div>
        <div class="withdrawalE">
          <el-form :model="WithdrawalE">
            <el-form-item label="提现到:" :label-width="formLabelWidth">
              <el-select
                v-model="WithdrawalE.region"
                placeholder="请选择活动区域"
              >
                <el-option label="支付宝账号" value="shanghai"></el-option>
                <el-option label="其他类型" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="支付宝账号:"
              :label-width="formLabelWidth"
              class="accountWarn"
            >
              <el-input
                v-model="WithdrawalE.userName"
                autocomplete="off"
                placeholder="请输入您的支付宝账号"
              ></el-input>
              <span>请确保你输入的支付宝账号正确可用，否则提现失败</span>
            </el-form-item>
            <el-form-item label="支付宝姓名:" :label-width="formLabelWidth">
              <el-input
                v-model="WithdrawalE.name"
                autocomplete="off"
                placeholder="请输入您的支付宝绑定的姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="可提现e币:" :label-width="formLabelWidth">
              <span>996602 e币</span>
            </el-form-item>
            <el-form-item label="e币换算:" :label-width="formLabelWidth">
              <span>1e币 = ¥ 1元</span>
            </el-form-item>
            <el-form-item label="申请提现:" :label-width="formLabelWidth">
              <el-input
                v-model="WithdrawalE.amount"
                autocomplete="off"
                placeholder="请输入您的提现金额"
              ></el-input>
            </el-form-item>
            <el-form-item label="注册手机号:" :label-width="formLabelWidth">
              <span>1574568268</span>
            </el-form-item>
            <el-form-item label="短信验证:" :label-width="formLabelWidth">
              <el-input
                v-model="WithdrawalE.verificationCode"
                autocomplete="off"
                placeholder="请输入短信验证码"
              ></el-input>
              <button>获取验证码</button>
            </el-form-item>
          </el-form>
          <hr />
          <ul>
            <li>注：1、提现申请成功后，会在3-5个工作日进入结算；</li>
            <li>2、为了您的资金安全，提现必须进行短信验证。</li>
          </ul>
          <div slot="footer" class="dialog-footer">
            <el-button @click="drawerE = false" class="close">取 消</el-button>
            <el-button type="primary" @click="drawerE = false"
              >申请e币提现</el-button
            >
          </div>
        </div>
      </div>
    </el-drawer>
    <!-- 移动端美元提现 -->
    <el-drawer
      title="申请提现"
      :visible.sync="drawerWithdrawal"
      direction="rtl"
      :size="drawerESize"
      custom-class="drawerWithdrawal"
      :before-close="handleClose"
    >
      <div class="withdrawal">
        <div class="propView">
          <p class="title">
            <span>货币选择</span>
            <span
              v-for="item in countryList"
              :key="item.id"
              :class="{ active: propCheckedCountry === item.id }"
              @click="changeCountryProp(item.id)"
              >{{ item.name }}</span
            >
          </p>
          <div>
            <span class="selectAccount">提现到:</span>
            <el-select
              v-model="value"
              placeholder="请选择"
              @change="changeAccount"
            >
              <el-option
                v-for="item in account"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <p class="leftLable"><span>账户总金额:</span><span>2522</span></p>
            <p class="warnInfo" v-if="isAlipay === '1'">
              <span class="rightLable"> 支付宝账号:</span>
              <input type="text" placeholder="请输入支付宝账号" />
              <button>保存账号</button>
              <span> 请确保你输入的支付宝账号正确可用，否则提现失败</span>
            </p>
            <p class="warnInfo leftLable" v-if="isAlipay === '2'">
              <span>paypal账户:</span>
              <input type="text" placeholder="请输入支付宝账号" />
              <button>保存账号</button>
            </p>
          </div>
          <div>
            <p class="leftLable"><span>冻结金额:</span><span>25.00</span></p>
            <p>
              <span class="rightLable">支付宝姓名:</span
              ><input type="text" placeholder="请输入支付宝账号" />
            </p>
          </div>
          <div>
            <p class="leftLable"><span>可提现金额:</span><span>100.00</span></p>
            <p>
              <span class="rightLable">申请提现:</span
              ><input type="text" placeholder="请输入提现金额" />
            </p>
          </div>
          <div v-if="isAlipay === '1'">
            <p class="leftLable">
              <span>当时实时汇率:</span><span>50.00</span>
            </p>
            <p class="leftLable">
              <span>￥人民币到账:</span><span>50.00</span>
            </p>
          </div>
          <div v-if="isAlipay === '1'">
            <p class="leftLable">
              <span>注册手机号:</span><span>158462752</span>
            </p>
            <p>
              <span class="rightLable">短信验证: </span>
              <input type="text" placeholder="请输入验证码" />
              <button>获取验证码</button>
            </p>
          </div>
        </div>
        <p class="Tips">注：提现申请后，会在3-5个工作日进入结算</p>
        <hr />
        <p class="dialogFooter">
          <span @click="withdrawal = false">取消</span>
          <span @click="withdrawal = false">申请提现</span>
        </p>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { testData, redemptionCode } from "@/api/money";
import { mapGetters } from "vuex";
import { fetchList } from "@/api/article";

import "./index.scss";
import paymentProp from "@/components/payment/RechargeWarn";
export default {
  name: "Order",
  components: { paymentProp },
  data() {
    return {
      showHide: "",
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
      currentCountry: 1,
      rechargeWarn: false,
      ruleText: false,
      withdrawal: false,
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
      value: "",
      propCheckedCountry: 1,
      isAlipay: "1",
      withdrawalE: false,
      WithdrawalE: {
        region: "",
        name: "",
        userName: "",
        amount: "",
        verificationCode: "",
      },
      formLabelWidth: "100px",
      transaction: 1,
      orderIndex: 1,
      orderStateIndex: 1,
      paymentMethod: "1",
      rechargeState: false,
      rechargeValue: "",
      qrCode: false,
      drawerE: false,
      drawerESize: "100%",
      drawerWithdrawal: false,
    };
  },
  computed: {
    ...mapGetters(["roles", "device"]),
  },
  mounted() {
    this.initSelect();
    testData().then((response) => {
      console.log(response);
    });
    fetchList({
      type: "JP",
      importance: 1,
    }).then((response) => {
      console.log(response);
    });
  },
  methods: {
    changeCountry(index) {
      this.currentCountry = index;
    },
    handleClose(done) {
      done();
    },
    changeAccount(index) {
      console.log(index);
      this.isAlipay = index;
    },
    changeCountryProp(index) {
      this.propCheckedCountry = index;
    },
    initSelect() {
      if (!this.value) {
        this.value = this.account[0].value;
      }
    },
    exchangeE() {
      this.$prompt("请输入兑换码", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        customClass: "redemptionCode",
      }).then(({ value }) => {
        console.log(value);
        redemptionCode(value)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        //验证兑换码是否正确
      });
    },
    childProp(index) {
      this.showHide = index;
      this.$refs.childProp.rechargeWarn = true;
    },
    changeTransaction(index) {
      this.transaction = index;
    },
    getTime() {
      console.log(this.datePickerValue);
    },
    showPropwithdrawal() {
      this.withdrawal = true;
      this.propCheckedCountry = this.currentCountry;
    },
    chooseOrderType(index) {
      this.orderIndex = index;
    },
    chooseOrderState(index) {
      this.orderStateIndex = index;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    rechargeType(value) {
      if (value == 1) {
        this.$router.push({
          name: "rechargeUser",
          params: { id: this.currentCountry },
        });
      } else if (value == 2) {
        this.rechargeState = true;

        setTimeout(() => {
          this.$refs.getFocus.focus();
        }, 100);
      } else {
        //不做处理
      }
      console.log(value);
    },
    radioChanege() {
      if (this.rechargeValue.length <= 0) {
        if (this.device == "mobile") {
          this.$alert("充值金额不能为空", "提示", {
            confirmButtonText: "确定",
            customClass:"mobileAlert",
            callback: (action) => {
              //充值金额为空
            },
          });
        } else {
          this.$alert("充值金额不能为空", "提示", {
            confirmButtonText: "确定",
            callback: (action) => {
              //充值金额为空
            },
          });
        }
      } else {
        this.qrCode = true;
        //调取充值接口
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
  .paymentTop {
    margin: 15px;
    color: #797979;
    font-size: 14px;
    background: #fff;
    hr {
      border: none;
      height: 1px;
      background: #6b31310d;
      margin-top: 40px;
      margin-bottom: 20px;
    }
    .red {
      color: red;
    }
    h3 {
      font-weight: 500;
      background-color: #4ba3d3;
      color: #fff;
      padding: 10px;
      margin-top: 0px;
    }
    .reappearance {
      margin: 0 15px;
      padding-bottom: 40px;

      .title {
        margin: 10px;
      }
      .switch {
        margin: 15px;
        margin-left: 40px;
        .checkLeft {
          display: inline-block;
          margin-right: 40px;
          &.eCoin {
            width: 60px;
          }
        }
        p {
          &:first-child {
            margin-top: 35px;
            margin-bottom: 40px;
          }
          &.btn {
            span {
              background: #4ba3d3;
              color: #fff;
              display: inline-block;
              padding: 6px 12px;
              margin-bottom: 0;
              font-size: 14px;
              font-weight: normal;
              text-align: center;
              cursor: pointer;
              border: 1px solid transparent;
              border-radius: 4px;
              margin-left: 10px;
              &:first-child {
                margin-left: 20px;
              }
            }
          }
        }
        .checkCountry {
          margin-bottom: 20px;
          label {
            span {
              display: inline-block;
              margin-right: 30px;
              color: #797979;
              font-weight: 400;
              padding: 10px 5px;
              cursor: pointer;
              &.active {
                background-color: #f6a951;
                color: #fff;
              }
            }
          }
        }
      }
      .switch > div {
        overflow: hidden;
        display: flex;
        align-items: center;
        line-height: 24px;
        margin-bottom: 20px;
        span.checkLeft {
          display: inline-block;
          margin-right: 40px;
          float: left;
        }
        p {
          float: left;
          &:nth-child(2) {
            width: 370px;
            height: auto;
            label {
              &.radioBorder {
                position: relative;
                display: inline-block;
                width: 150px;
                height: 42px;
                margin-right: 10px;
                .el-radio {
                  position: relative;
                  top: 7px;
                }
                img.apayIco {
                  position: absolute;
                  top: 0px;
                  left: 20px;
                  width: 115px;
                  height: 42px;
                }
              }
            }
          }
          &.recharge {
            input {
              text-indent: 10px;
              height: 30px;
              margin-right: 5px;
            }
          }
        }
        .currencyType {
          display: inline-block;
          margin: 0 8px;
          font-weight: 600;
          color: #333;
        }
      }
    }
  }
}
.withdrawal {
  color: #797979;
  hr {
    background: #6b31310d;
    height: 1px;
    border: none;
  }
  .Tips {
    color: red;
    margin-bottom: 15px;
  }
  .dialogFooter {
    text-align: center;
    margin-top: 60px;
    margin-bottom: 30px;
    span {
      padding: 6px 12px;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      &:first-child {
        background: #d9534f;
        margin-right: 20px;
      }
      &:last-child {
        background: #428bca;
      }
    }
  }
  .propView > div {
    margin: 20px auto;
    overflow: hidden;
    p {
      &:last-child {
        margin-left: 220px;
        span {
          &.rightLable {
            display: inline-block;
            width: 80px;
          }
        }
      }
      &.warnInfo {
        position: relative;
        height: 45px;
        span {
          &:last-child {
            position: absolute;
            bottom: 0px;
            left: 0px;
            color: red;
            font-size: 10px;
          }
        }
      }
      input {
        height: 27px;
        outline: none;
        margin: 0 10px;
        text-indent: 10px;
        width: 157px;
        border: 1px solid #dcdfe6;
        &:focus {
          border-color: #409eff;
        }
      }
      button {
        color: #fff;
        border-radius: 4px;
        display: inline-block;
        height: 27px;
        border: none;
        padding: 0 6px;
        background: #4ba3d3;
        outline: none;
        cursor: pointer;
      }
    }
  }
  .propView {
    .title {
      span {
        &:first-child {
          display: inline-block;
          width: 100px;
          text-align: left;
        }
        &:not(:first-child) {
          display: inline-block;
          margin-left: 30px;
          color: #797979;
          font-weight: 400;
          padding: 10px 5px;
          cursor: pointer;
          &.active {
            background-color: #f6a951;
            color: #fff;
          }
        }
      }
    }
  }

  .leftLable {
    float: left;
  }
  .leftLable > span {
    &:first-child {
      display: inline-block;
      width: 100px;
    }
  }
}
.withdrawalE {
  p {
    height: 36px;
    line-height: 36px;
    margin-bottom: 15px;
    &.lable {
      span {
        &:first-child {
          display: inline-block;
          width: 80px;
          font-size: 14px;
          color: #797979;
          text-align: left;
        }
        &:nth-child(2) {
          display: inline-block;
          margin-left: 17px;
        }
      }
    }
  }
  div.lable {
    margin-bottom: 30px;
    span {
      width: 98px;
      display: inline-block;
      color: #797979;
    }
    input {
      height: 36px;
      outline: none;
      border: 1px solid #dcdfe6;
      width: 200px;
      &:focus {
        border: 1px solid #409eff;
      }
      &.verificationCode {
        text-indent: 14px;
      }
    }
    button {
      border: none;
      padding: 5px 10px;
      background: #4ba3d3;
      border-radius: 4px;
      color: #fff;
      outline: none;
      margin-left: 15px;
      cursor: pointer;
    }
  }
  hr {
    height: 1px;
    background: #6b31310d;
    border: none;
  }
  ul {
    margin: 20px;
    margin-bottom: none;
    li {
      color: red;
      list-style-type: none;
    }
  }
}

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border: 1px solid red;
  border-radius: 4px;
  min-height: 36px;
}

@media only screen and (max-width: 768px) {
  .fundManagement .paymentTop .reappearance .switch {
    margin: 0px;
    margin-left: 10px;
  }
  .fundManagement .paymentTop .reappearance .switch > div {
    align-items: flex-start;
    margin-bottom: 10px;
  }
  .fundManagement .paymentTop .reappearance .switch p:first-child {
    margin: 10px 0px;
    line-height: 20px;
  }
  .fundManagement .paymentTop .reappearance .switch .checkLeft {
    margin-right: 15px;
  }
  .fundManagement .paymentTop .reappearance .switch p.btn span {
    font-size: 10px;
    padding: 4px 8px;
  }
  .fundManagement .paymentTop .reappearance .switch p.btn span:first-child {
    margin-left: 0px;
  }
  .fundManagement .paymentTop .reappearance .switch > div span.checkLeft {
    margin-right: 20px;
    min-width: 35px;
  }

  .fundManagement .paymentTop .reappearance .switch .checkLeft.eCoin {
    width: 35px;
    min-width: 35px;
  }
  .fundManagement .paymentTop hr {
    margin-top: 17px;
  }

  .withdrawal .leftLable {
    float: none;
  }
  .withdrawal .propView > div p:last-child {
    margin-left: 0px;
  }
  .withdrawal .propView > div p input {
    width: 130px;
  }
  .withdrawal .propView .title span:not(:first-child) {
    margin-left: 10px;
  }
  .withdrawalE .el-dialog__body .el-form {
    width: 95%;
  }
  .withdrawalE .el-form-item.accountWarn span:last-child {
    display: inline-block;
    position: relative;
    bottom: -5px;
    line-height: 17px !important;
  }
  .drawerE {
    font-size: 12px;
    .el-drawer__header {
      color: red;
      outline: none;
    }
    .withdrawalE {
      width: 90%;
      margin: auto;
      .el-form-item {
        button {
          color: #fff;
          border-radius: 4px;
          display: inline-block;
          height: 27px;
          border: none;
          padding: 0 6px;
          background: #4ba3d3;
          outline: none;
          margin-top: 10px;
        }
      }
      p {
        margin-bottom: 5px;
        font-size: 12px;
        color: #797979;
      }
      input {
        height: 24px;
        line-height: 24px;
      }
      .el-form-ite {
        label {
          font-size: 12px;
          line-height: 30px;
        }
      }
      ul {
        margin: 0px;
        font-size: 12px;
      }
      div.lable {
        font-size: 12px;
        overflow: hidden;
        position: relative;
        input {
          width: 135px;
          height: 28px;
          line-height: 28px;
        }
        button {
          position: absolute;
          right: 0px;
          top: 0px;
          height: 28px;
          line-height: 28px;
          padding: 0px;
          width: 80px;
        }
      }
      .dialog-footer {
        text-align: center;
        margin-top: 50px;
        button {
          display: inline-block;
          height: 28px;
          line-height: 28px;
          padding: 0 10px;
        }
      }
    }
  }
  .drawerWithdrawal {
    font-size: 12px;
    .withdrawal {
      width: 80%;
      margin: auto;
      .propView {
        & > div {
          margin: 0px;
          font-size: 12px;
          .selectAccount {
            display: inline-block;
            width: 80px;
            text-align: right;
            margin-right: 10px;
          }
          p {
            margin: 5px 0px;

            &:first-child {
              height: 28px;
              line-height: 28px;
              span.rightLable {
                display: inline-block;
                width: 80px;
              }
            }
            &:last-child {
              span.rightLable {
                text-align: right;
                height: 30px;
                line-height: 30px;
              }
            }
            &.warnInfo {
              height: 55px;
              &.leftLable {
                height: 30px;
              }
              span {
                &:last-child {
                  bottom: -2px;
                  left: 90px;
                  width: 215px;
                }
              }
            }
          }
          .leftLable {
            span {
              &:first-child {
                width: 80px;
                text-align: right;
              }
              &:nth-child(2) {
                display: inline-block;
                margin-left: 10px;
              }
            }
          }
          input {
            height: 28px;
            line-height: 28px;
          }
        }
        .title {
          margin-bottom: 10px;
          span {
            font-size: 12px;
          }
        }
      }
      .Tips {
        font-size: 14px;
      }
      .dialogFooter {
        margin-top: 30px;
        span {
          font-size: 14px;
        }
      }
    }
  }
 
}
 .mobileAlert{
    width: 40%;
  }
</style>>
