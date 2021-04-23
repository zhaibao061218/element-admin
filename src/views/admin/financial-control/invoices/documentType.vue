<template>
  <div class="documentTypeYN">
    <h3>新增单据</h3>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="新增收款单" name="first">
          <el-form label-width="200px" class="demo-ruleForm" :inline="true">
            <el-form-item label="收款买家" prop="userNameOrId">
              <el-input
                v-model="userNameOrId"
                placeholder="请输入买家邮箱或买家编号"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="select">查 询</el-button>
            </el-form-item>
          </el-form>
          <div v-if="isShow == 1" class="contentBox">
            <span style="color: red">抱歉！买家不存在，请重新输入查询。</span>
          </div>
          <div v-else-if="isShow == 2" class="contentBox">
            <el-form
              ref="ruleForm"
              :model="receivingNoteForm"
              :inline="true"
              label-width="200px"
            >
              <el-row>
                <el-col
                  v-for="(item, index) in makeData.childers"
                  :key="index"
                  :span="item.spanNum"
                >
                  <el-form-item
                    :label="item.labelName"
                    :prop="item.propName"
                    :rules="[
                      {
                        required: item.rulesRequired,
                        message: item.rulesMessage,
                      },
                    ]"
                    v-if="item.type == 'input'"
                  >
                    <template v-if="item.isNumber">
                      <el-input
                        v-model.number="receivingNoteForm[item.propName]"
                        :placeholder="item.placeholder"
                        :isDisabled="item.isDisabled"
                        type="number"
                      ></el-input>
                    </template>
                    <template v-else>
                      <el-input
                        v-model.trim="receivingNoteForm[item.propName]"
                        :placeholder="item.placeholder"
                        :isDisabled="item.isDisabled"
                      ></el-input>
                    </template>
                  </el-form-item>
                  <el-form-item
                    :label="item.labelName"
                    :prop="item.propName"
                    :rules="[
                      {
                        required: item.rulesRequired,
                        message: item.rulesMessage,
                      },
                      { validator: myValidate, trigger: 'blur' },
                    ]"
                    v-if="item.type == 'select'"
                  >
                    <el-select
                      v-model="receivingNoteForm[item.propName]"
                      :placeholder="item.placeholder"
                      :disabled="item.isDisabled"
                    >
                      <template v-for="(item2, index2) in item.childers">
                        <el-option
                          :label="item2.name"
                          :value="item2.value"
                          :key="index2"
                        ></el-option>
                      </template>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    :label="item.labelName"
                    :prop="item.propName"
                    :rules="[
                      {
                        required: item.rulesRequired,
                        message: item.rulesMessage,
                      },
                    ]"
                    v-if="item.type == 'textarea'"
                  >
                    <el-input
                      type="textarea"
                      v-model.trim="receivingNoteForm[item.propName]"
                      :placeholder="item.placeholder"
                      :isDisabled="item.isDisabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px">
                <el-col :span="24">
                  <el-button round @click="resetForm">重置条件</el-button>
                  <el-button type="primary" round @click="submitForm"
                    >确定新增</el-button
                  >
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="新增调拨单" name="second">
          <el-form label-width="200px" class="demo-ruleForm" :inline="true">
            <el-form-item label="调拨买家" prop="userNameOrId">
              <el-input
                v-model="userNameOrId"
                placeholder="请输入买家邮箱或买家编号"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="select">查 询</el-button>
            </el-form-item>
          </el-form>
          <div v-if="isShow == 1" class="contentBox">
            <span style="color: red">抱歉！买家不存在，请重新输入查询。</span>
          </div>
          <div v-else-if="isShow == 2" class="contentBox">
            <el-form
              ref="ruleForm2"
              :model="transferSlip"
              :inline="true"
              label-width="200px"
            >
              <el-row>
                <el-col
                  v-for="(item, index) in makeData2.childers"
                  :key="index"
                  :span="item.spanNum"
                >
                  <el-form-item
                    :label="item.labelName"
                    :prop="item.propName"
                    :rules="[
                      {
                        required: item.rulesRequired,
                        message: item.rulesMessage,
                      },
                    ]"
                    v-if="item.type == 'input'"
                  >
                    <template v-if="item.isNumber">
                      <el-input
                        v-model.number="transferSlip[item.propName]"
                        :placeholder="item.placeholder"
                        :isDisabled="item.isDisabled"
                        type="number"
                      ></el-input>
                    </template>
                    <template v-else>
                      <el-input
                        v-model.trim="transferSlip[item.propName]"
                        :placeholder="item.placeholder"
                        :isDisabled="item.isDisabled"
                      ></el-input>
                    </template>
                  </el-form-item>
                  <el-form-item
                    :label="item.labelName"
                    :prop="item.propName"
                    :rules="[
                      {
                        required: item.rulesRequired,
                        message: item.rulesMessage,
                      },
                      { validator: myValidate, trigger: 'blur' },
                    ]"
                    v-if="item.type == 'select'"
                  >
                    <el-select
                      v-model="transferSlip[item.propName]"
                      :placeholder="item.placeholder"
                      :disabled="item.isDisabled"
                    >
                      <template v-for="(item2, index2) in item.childers">
                        <el-option
                          :label="item2.name"
                          :value="item2.value"
                          :key="index2"
                        ></el-option>
                      </template>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    :label="item.labelName"
                    :prop="item.propName"
                    :rules="[
                      {
                        required: item.rulesRequired,
                        message: item.rulesMessage,
                      },
                    ]"
                    v-if="item.type == 'textarea'"
                  >
                    <el-input
                      type="textarea"
                      v-model.trim="transferSlip[item.propName]"
                      :placeholder="item.placeholder"
                      :isDisabled="item.isDisabled"
                    ></el-input>
                  </el-form-item>
                  <el-form-item v-if="item.type == 'no'" label="账户资金">
                    <span style="margin-right: 20px">
                      余额账户：<span style="color: red"
                        >{{ currencySymbol }}{{ buyerObj.PayableAmount }}</span
                      >
                    </span>
                    <span>
                      待定账户：<span style="color: red"
                        >{{ currencySymbol
                        }}{{ buyerObj.TemporaryAmount }}</span
                      >
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px">
                <el-col :span="24">
                  <el-button round @click="resetForm">重置条件</el-button>
                  <el-button type="primary" round @click="submitForm"
                    >确定新增</el-button
                  >
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="新增付款单" name="third">
          <el-form label-width="200px" class="demo-ruleForm" :inline="true">
            <el-form-item label="付款买家" prop="userNameOrId">
              <el-input
                v-model="userNameOrId"
                placeholder="请输入买家邮箱或买家编号"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="select">查 询</el-button>
            </el-form-item>
          </el-form>
          <div v-if="isShow == 1" class="contentBox">
            <span style="color: red">抱歉！买家不存在，请重新输入查询。</span>
          </div>
          <div v-else-if="isShow == 2" class="contentBox">
            <el-form
              ref="ruleForm3"
              :model="paymentOrder"
              :inline="true"
              label-width="200px"
            >
              <el-row>
                <el-col
                  v-for="(item, index) in makeData3.childers"
                  :key="index"
                  :span="item.spanNum"
                >
                  <el-form-item
                    :label="item.labelName"
                    :prop="item.propName"
                    :rules="[
                      {
                        required: item.rulesRequired,
                        message: item.rulesMessage,
                      },
                    ]"
                    v-if="item.type == 'input'"
                  >
                    <template v-if="item.isNumber">
                      <el-input
                        v-model.number="paymentOrder[item.propName]"
                        :placeholder="item.placeholder"
                        :isDisabled="item.isDisabled"
                        type="number"
                      ></el-input>
                    </template>
                    <template v-else>
                      <el-input
                        v-model.trim="paymentOrder[item.propName]"
                        :placeholder="item.placeholder"
                        :isDisabled="item.isDisabled"
                      ></el-input>
                    </template>
                  </el-form-item>
                  <el-form-item
                    :label="item.labelName"
                    :prop="item.propName"
                    :rules="[
                      {
                        required: item.rulesRequired,
                        message: item.rulesMessage,
                      },
                      { validator: myValidate, trigger: 'blur' },
                    ]"
                    v-if="item.type == 'select'"
                  >
                    <el-select
                      v-model="paymentOrder[item.propName]"
                      :placeholder="item.placeholder"
                      :disabled="item.isDisabled"
                    >
                      <template v-for="(item2, index2) in item.childers">
                        <el-option
                          :label="item2.name"
                          :value="item2.value"
                          :key="index2"
                        ></el-option>
                      </template>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    :label="item.labelName"
                    :prop="item.propName"
                    :rules="[
                      {
                        required: item.rulesRequired,
                        message: item.rulesMessage,
                      },
                    ]"
                    v-if="item.type == 'textarea'"
                  >
                    <el-input
                      type="textarea"
                      v-model.trim="paymentOrder[item.propName]"
                      :placeholder="item.placeholder"
                      :isDisabled="item.isDisabled"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px">
                <el-col :span="24">
                  <el-button round @click="resetForm">重置条件</el-button>
                  <el-button type="primary" round @click="submitForm"
                    >确定新增</el-button
                  >
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  get_paymentorder_detail,
  put_receivepayment_order,
  put_transferpay_order,
  put_payment_order,
  put_tranfer_transfer_buyercapital,
} from "@/api/bills";
export default {
  data() {
    return {
      //调拨单 模块下的币别符号
      currencySymbol: "$",
      //买家ID
      userNameOrId: null,
      //查询用户的信息
      buyerObj: {},
      activeName: "first",
      //isShow   1:查询出买家邮箱或者编号不存在  2：存在    3:查询前的状态
      isShow: 3,
      ruleForm: {
        name: "",
      },
      //新增收款单
      receivingNoteForm: {
        buyerId: null, //  买家Id
        buyerUserName: null, // 买家用户名
        payType: null, // 支付类型
        buyerPaypal: null, // 买家paypal
        receivePayAccountType: null, // 收款账户类型
        paymentNo: null, // 交易Id 号
        receiveCurrency: null, // 收款币种
        receiveAmount: null, // 收款金额
        summary: null, // 摘要
        createUserId: null, // 创建用户Id
      },
      //新增调拨单
      transferSlip: {
        buyerId: null, // 买家Id
        buyerUserName: null, // 买家用户名
        currency: null, // 币种
        billingAccountType: null, // 出账账号类型
        transferAmount: null, // 调拨金额
        buyerRecodeType: 0, // 买家流水类型
        creditAccountType: null, // 入账账户类型
        summary: null, // 摘要
        approvalStatus: 0, // 审核状态
        createUserId: null, // 创建用户Id
      },
      //新增付款单
      paymentOrder: {
        paymentNo: null, //  交易Id 号
        buyerId: null, // 买家Id
        buyerUserName: null, // 买家用户名
        payType: null, // 支付类型
        buyerPaypal: null, // 买家paypal
        payAccountType: null, // 付款账户类型
        payCurrency: null, // 付款币别
        payAmount: null, //  付款金额
        summary: null, // 摘要
        createUserId: null, // 创建用户Id
      },
      //新增收款单标签
      makeData: {
        //表单绑定的数据对象
        //表单下面的输入框
        childers: [
          {
            labelName: "收款类型", //标签名
            propName: "payType", //表单的prop属性
            rulesRequired: true, //表单验证
            rulesMessage: "请选择收款类型", //表单验证
            spanNum: 12, //表示占十二栅格里面的多少格
            isDisabled: false, //是否禁用
            placeholder: "",
            childers: [
              // {
              //   name: "--请选择--",
              //   value: -1,
              // },
              {
                name: "已收款",
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
            ], //表示select标签下面的选项
            type: "select", //表单框的类型
          },
          {
            labelName: "买家PayPal", //标签名
            propName: "buyerPaypal", //表单的prop属性
            rulesRequired: true, //表单验证
            rulesMessage: "买家PayPal账号不能为空", //表单验证
            spanNum: 12, //表示占十二栅格里面的多少格
            isDisabled: false, //是否禁用
            placeholder: "请输入转款的PayPal账号",
            childers: [], //表示select标签下面的选项
            type: "input", //表单框的类型
          },
          {
            labelName: "收款账户", //标签名
            propName: "receivePayAccountType", //表单的prop属性
            rulesRequired: true, //表单验证
            rulesMessage: "请选择收款账户", //表单验证
            spanNum: 12, //表示占十二栅格里面的多少格
            isDisabled: false, //是否禁用
            placeholder: "",
            childers: [
              // {
              //   name: "--请选择--",
              //   value: -1,
              // },
              {
                name: "收到余额账户",
                value: 1,
              },
              {
                name: "收到待定账户",
                value: 2,
              },
            ], //表示select标签下面的选项
            type: "select", //表单框的类型
          },
          {
            labelName: "交易ID号", //标签名
            propName: "paymentNo", //表单的prop属性
            rulesRequired: true, //表单验证
            rulesMessage: "交易ID号不能为空", //表单验证
            spanNum: 12, //表示占十二栅格里面的多少格
            isDisabled: false, //是否禁用
            placeholder: "请输入该笔转款交易ID",
            childers: [], //表示select标签下面的选项
            type: "input", //表单框的类型
          },
          {
            labelName: "收款币别", //标签名
            propName: "receiveCurrency", //表单的prop属性
            rulesRequired: true, //表单验证
            rulesMessage: "请选择收款币类型", //表单验证
            spanNum: 12, //表示占十二栅格里面的多少格
            isDisabled: false, //是否禁用
            placeholder: "",
            childers: [
              // {
              //   name: "--请选择--",
              //   value: -1,
              // },
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
            ], //表示select标签下面的选项
            type: "select", //表单框的类型
          },
          {
            labelName: "摘要", //标签名
            propName: "summary", //表单的prop属性
            rulesRequired: false, //表单验证
            rulesMessage: "", //表单验证
            spanNum: 12, //表示占十二栅格里面的多少格
            isDisabled: false, //是否禁用
            placeholder: "请输入摘要",
            childers: [], //表示select标签下面的选项
            type: "textarea", //表单框的类型
          },
          {
            labelName: "收款金额", //标签名
            propName: "receiveAmount", //表单的prop属性
            rulesRequired: true, //表单验证
            rulesMessage: "收款金额不能为空", //表单验证
            spanNum: 12, //表示占十二栅格里面的多少格
            isDisabled: false, //是否禁用
            placeholder: "请输入充值金额",
            childers: [], //表示select标签下面的选项
            type: "input", //表单框的类型
            isNumber: true, //是否是数字输入框
          },
          // {
          //   labelName: "买家端展示", //标签名
          //   propName: "show", //表单的prop属性
          //   rulesRequired: true, //表单验证
          //   rulesMessage: "请选择收款类型", //表单验证
          //   spanNum: 12, //表示占十二栅格里面的多少格
          //   isDisabled: true, //是否禁用
          //   placeholder: "",
          //   childers: [
          //     {
          //       name: "试用报告审核通过",
          //       value: 1,
          //     },
          //     {
          //       name: "活动奖励",
          //       value: 2,
          //     },
          //     {
          //       name: "退款退货未成功",
          //       value: 3,
          //     },
          //     {
          //       name: "提现失败",
          //       value: 4,
          //     },
          //     {
          //       name: "所款成功",
          //       value: 5,
          //     },
          //     {
          //       name: "奖励账户转入",
          //       value: 6,
          //     },
          //   ], //表示select标签下面的选项
          //   type: "select", //表单框的类型
          // },
        ],
      },
      //新增调拨单标签
      makeData2: {
        //表单绑定的数据对象
        //表单下面的输入框
        childers: [
          {
            labelName: "选择币别", //标签名
            propName: "currency", //表单的prop属性
            rulesRequired: true, //表单验证
            rulesMessage: "", //表单验证
            spanNum: 12, //表示占十二栅格里面的多少格
            isDisabled: false, //是否禁用
            placeholder: "",
            childers: [
              {
                name: "USD",
                value: 1,
              },
              {
                name: "GBP",
                value: 2,
              },
            ], //表示select标签下面的选项
            type: "select", //表单框的类型
          },
          {
            labelName: "出账账户", //标签名
            propName: "billingAccountType", //表单的prop属性
            rulesRequired: true, //表单验证
            rulesMessage: "请选择出账账户", //表单验证
            spanNum: 12, //表示占十二栅格里面的多少格
            isDisabled: false, //是否禁用
            placeholder: "",
            childers: [
              // {
              //   name: "--请选择--",
              //   value: -1,
              // },
              {
                name: "余额账户",
                value: 1,
              },
              {
                name: "待定账户",
                value: 2,
              },
            ], //表示select标签下面的选项
            type: "select", //表单框的类型
          },
          {
            labelName: "调拨金额($)", //标签名
            propName: "transferAmount", //表单的prop属性
            rulesRequired: true, //表单验证
            rulesMessage: "调拨金额不能为空", //表单验证
            spanNum: 12, //表示占十二栅格里面的多少格
            isDisabled: false, //是否禁用
            placeholder: "请输入重置金额",
            childers: [], //表示select标签下面的选项
            type: "input", //表单框的类型
            isNumber: true, //是否是数字输入框
          },
          {
            labelName: "入账账户", //标签名
            propName: "creditAccountType", //表单的prop属性
            rulesRequired: false, //表单验证
            rulesMessage: "", //表单验证
            spanNum: 12, //表示占十二栅格里面的多少格
            isDisabled: true, //是否禁用
            placeholder: "----",
            childers: [
              {
                name: "余额账户",
                value: 1,
              },
              {
                name: "待定账户",
                value: 2,
              },
            ], //表示select标签下面的选项
            type: "select", //表单框的类型
          },

          {
            labelName: "摘要", //标签名
            propName: "summary", //表单的prop属性
            rulesRequired: false, //表单验证
            rulesMessage: "", //表单验证
            spanNum: 12, //表示占十二栅格里面的多少格
            isDisabled: false, //是否禁用
            placeholder: "请输入摘要",
            childers: [], //表示select标签下面的选项
            type: "textarea", //表单框的类型
          },
          {
            type: "no", //表单框的类型
            spanNum: 12,
          },
        ],
      },
      //新增付款单标签
      makeData3: {
        //表单绑定的数据对象
        //表单下面的输入框
        childers: [
          {
            labelName: "付款类型", //标签名
            propName: "payType", //表单的prop属性
            rulesRequired: true, //表单验证
            rulesMessage: "请选择收款类型", //表单验证
            spanNum: 12, //表示占十二栅格里面的多少格
            isDisabled: false, //是否禁用
            placeholder: "",
            childers: [
              // {
              //   name: "--请选择--",
              //   value: -1,
              // },
              {
                name: "付错金额",
                value: 1,
              },
              {
                name: "付错币别",
                value: 2,
              },
              {
                name: "其他",
                value: 3,
              },
            ], //表示select标签下面的选项
            type: "select", //表单框的类型
          },
          {
            labelName: "买家PayPal", //标签名
            propName: "buyerPaypal", //表单的prop属性
            rulesRequired: true, //表单验证
            rulesMessage: "收款买家PayPal账号不能为空", //表单验证
            spanNum: 12, //表示占十二栅格里面的多少格
            isDisabled: false, //是否禁用
            placeholder: "请输入收款的买家PayPal账号",
            childers: [], //表示select标签下面的选项
            type: "input", //表单框的类型
          },
          {
            labelName: "付款账户", //标签名
            propName: "payAccountType", //表单的prop属性
            rulesRequired: true, //表单验证
            rulesMessage: "请选择收款账户", //表单验证
            spanNum: 12, //表示占十二栅格里面的多少格
            isDisabled: false, //是否禁用
            placeholder: "",
            childers: [
              // {
              //   name: "--请选择--",
              //   value: -1,
              // },
              {
                name: "从余额账户扣除资金",
                value: 1,
              },
              {
                name: "从待定账户扣除资金",
                value: 2,
              },
            ], //表示select标签下面的选项
            type: "select", //表单框的类型
          },
          {
            labelName: "交易ID号", //标签名
            propName: "paymentNo", //表单的prop属性
            rulesRequired: true, //表单验证
            rulesMessage: "交易ID号不能为空", //表单验证
            spanNum: 12, //表示占十二栅格里面的多少格
            isDisabled: false, //是否禁用
            placeholder: "请输入该笔付款交易ID",
            childers: [], //表示select标签下面的选项
            type: "input", //表单框的类型
          },
          {
            labelName: "付款币别", //标签名
            propName: "payCurrency", //表单的prop属性
            rulesRequired: true, //表单验证
            rulesMessage: "请选择收款币类型", //表单验证
            spanNum: 12, //表示占十二栅格里面的多少格
            isDisabled: false, //是否禁用
            placeholder: "",
            childers: [
              // {
              //   name: "--请选择--",
              //   value: -1,
              // },
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
            ], //表示select标签下面的选项
            type: "select", //表单框的类型
          },
          {
            labelName: "摘要", //标签名
            propName: "summary", //表单的prop属性
            rulesRequired: false, //表单验证
            rulesMessage: "", //表单验证
            spanNum: 12, //表示占十二栅格里面的多少格
            isDisabled: false, //是否禁用
            placeholder: "请输入摘要",
            childers: [], //表示select标签下面的选项
            type: "textarea", //表单框的类型
          },
          {
            labelName: "付款金额", //标签名
            propName: "payAmount", //表单的prop属性
            rulesRequired: false, //表单验证
            rulesMessage: "收款金额不能为空", //表单验证
            spanNum: 12, //表示占十二栅格里面的多少格
            isDisabled: false, //是否禁用
            placeholder: "请输入金额",
            childers: [], //表示select标签下面的选项
            type: "input", //表单框的类型
            isNumber: true,
          },
        ],
      },
    };
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name;
      this.isShow = 3;
      this.userNameOrId = null;
    },
    select() {
      let than = this;
      //     在登录接口实现后  1043  替换为 this.userNameOrId
      get_paymentorder_detail({ userNameOrId: 337 }).then((res) => {
        if (res.Data != null) {
          than.buyerObj = res.Data;
          than.isShow = 2;
        }
      });
    },
    resetForm() {
      if (this.activeName == "first") {
        this.$refs.ruleForm.resetFields();
      } else if (this.activeName == "second") {
        this.$refs.ruleForm2.resetFields();
      } else if (this.activeName == "third") {
        this.$refs.ruleForm3.resetFields();
      }
    },
    submitForm() {
      let ruleName =
        this.activeName == "first"
          ? "ruleForm"
          : this.activeName == "second"
          ? "ruleForm2"
          : this.activeName == "third"
          ? "ruleForm3"
          : "";
      this.$refs[ruleName].validate((valid) => {
        if (valid) {
          //验证是新增成功还是失败  默认失败
          //新增收款单
          if (this.activeName == "first") {
            let than = this;
            this.receivingNoteForm.buyerId = 337;
            this.receivingNoteForm.buyerUserName = this.buyerObj.BuyerUserName;
            //创建用户的ID  由于在写该功能是 登录未完成  所以先写死用户ID
            this.receivingNoteForm.createUserId = 188792;
            // this.receivingNoteForm.receiveAmount=parseInt(this.receivingNoteForm.receiveAmount);
            put_receivepayment_order(this.receivingNoteForm).then((res) => {
              if (res.Data.Result) {
                this.$message({
                  message: "新增成功！",
                  type: "success",
                });
                than.$router.push({ name: "invoiceAuditing" });
              } else {
                this.$message.error("新增失败！");
              }
            });
          } //新增调拨单
          else if (this.activeName == "second") {
            let than = this;
            this.transferSlip.buyerId = 337;
            this.transferSlip.buyerUserName = this.buyerObj.BuyerUserName;
            this.transferSlip.createUserId = 188792;
            put_transferpay_order(this.transferSlip).then((res) => {
              if (res.Data.Result) {
                this.$message({
                  message: "新增成功！",
                  type: "success",
                });
                than.$router.push({ name: "invoiceAuditing" });
              } else {
                this.$message.error("新增失败！");
              }
            });
          } //新增付款单
          else if (this.activeName == "third") {
            let than = this;
            this.paymentOrder.buyerId = 337;
            this.paymentOrder.buyerUserName = this.buyerObj.BuyerUserName;
            this.paymentOrder.createUserId = 188792;
            put_payment_order(this.paymentOrder).then((res) => {
              if (res.Data.Result) {
                this.$message({
                  message: "新增成功！",
                  type: "success",
                });
                than.$router.push({ name: "invoiceAuditing" });
              } else {
                this.$message.error("新增失败！");
              }
            });
          }
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
  },
  computed: {
    myValidate() {
      return function (rule, value, cb) {
        if (!value) {
          cb(new Error("不能为空"));
        } else if (value < 1) {
          cb(new Error("请选择下拉框内容"));
        } else {
          cb();
        }
      };
    },
  },
  watch: {
    "transferSlip.currency": {
      handler(newVal, oldVal) {
        let param = {
          buyerId: 337,
          siteId: newVal,
        };
        put_tranfer_transfer_buyercapital(param).then((res) => {
          this.buyerObj = res.Data;
        });
        if (newVal == 1) {
          this.makeData2.childers[2].labelName = "调拨金额($)";
          this.currencySymbol = "$";
        } else if (newVal == 2) {
          this.makeData2.childers[2].labelName = "调拨金额(£)";
          this.currencySymbol = "£";
        }
      },
      deep: true,
    },
    "transferSlip.billingAccountType": {
      handler(newVal, oldVal) {
        if (newVal == 1) {
          this.transferSlip.creditAccountType = 2;
        } else if (newVal == 2) {
          this.transferSlip.creditAccountType = 1;
        } else {
          this.transferSlip.creditAccountType = null;
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.documentTypeYN {
  margin: 10px;
  h3 {
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    line-height: 40px;
    color: #555555;
    font-size: 20px;
    font-weight: lighter;
  }
  & > div {
    background: #fff;
    margin-bottom: 10px;
    padding: 20px;
  }
  .el-form-item__content {
    width: 400px !important;
  }
  .contentBox {
    text-align: center;
    margin-top: 20px;
  }
  .el-select {
    input {
      width: 400px !important;
    }
  }
}
</style>