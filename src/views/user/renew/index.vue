<template>
  <div class="rennew">
    <div class="main">
      <h3>套餐续费页面</h3>
      <p>请选择您要选择续费的套餐</p>
      <div class="steps">
        <el-steps :active="packageIndex" finish-status="success">
          <el-step title="套餐" icon="el-icon-s-unfold"></el-step>
          <el-step title="支付方式" icon="el-icon-suitcase"></el-step>
          <el-step title="完成续费" icon="el-icon-edit"></el-step>
        </el-steps>
      </div>
      <div class="warnTitle" v-if="packageIndex !== 3">
        <p v-if="packageIndex === 1">请选择要续费的套餐</p>
        <p v-if="packageIndex === 2">请选择支付方式</p>
      </div>
      <div>
        <div v-if="packageIndex === 1">
          <ul>
            <li @click="hasActive(1)" :class="{ 'active': activeIndex === 1 }">
              <p>原价： 299.00元</p>
              <p>折扣价：49.00元</p>
              <p>可管理店铺数：8</p>
              <p>可发布产品数量：40</p>
            </li>
            <li @click="hasActive(2)" :class="{ 'active': activeIndex === 2 }">
              <p>原价： 599.00元</p>
              <p>折扣价：499.00元</p>
              <p>可管理店铺数：10</p>
              <p>可发布产品数量：80</p>
            </li>
            <li @click="hasActive(3)" :class="{ 'active': activeIndex === 3 }">
              <p>原价： 1099.00元</p>
              <p>折扣价：999.00元</p>
              <p>可管理店铺数：30</p>
              <p>可发布产品数量：无限制</p>
            </li>
          </ul>
          <hr class="line" />
          <div class="sliderTime">
            <span class="demonstration">请选择续费时间（月份）</span>
            <el-slider
              v-model="sliderValue"
              :min="1"
              :max="12"
              @change="getSlideValue()"
            >
            </el-slider>
            <span class="money">总金额：{{ totalMoney }}元</span>
          </div>
        </div>
        <div v-if="packageIndex === 2" class="moneyType">
          <p>
            <img @click="getPaymentMethod(1)" src="@/assets/img/zfb.jpg" alt="" srcset="" />
            <img @click="getPaymentMethod(2)" src="@/assets/img/wx.jpg" alt="" srcset="" />
          </p>
        </div>
        <div v-if="packageIndex === 3" class="successfulRecharge">
           <p> <img src="@/assets/img/successfulRecharge.png" alt="" srcset=""> <span>充值完成</span></p>
          
        </div>
      </div>

      <p v-if="packageIndex == 1" class="nextStep">
        <span @click="next">下一步</span>
      </p>
      <p v-if="packageIndex == 2" class="recharge">
        <span @click="packageIndex--">上一步</span><span @click="next">下一步</span>
      </p>
    </div>
    <el-dialog
      title="套餐续费说明"
      :visible.sync="dialogVisible"
      width="30%"
      custom-class="rennewProp"
      :before-close="handleClose"
    >
      <div class="propBody">
        <h4>一、套餐续费</h4>
        <p>
          套餐续费为可推广产品的店铺数量和可推广产品数量的套餐购买页面，购买此套餐之后，只会单独增加可推广的店铺数量和可推广的产品数量，并不包含推广需使用到的产品本金和佣金。
        </p>
        <h4>二、温馨提示</h4>
        <p>
          若您只有一个店铺的产品需要推广，暂时可以不需要购买此套餐，若需要增加推广店铺或产品数量时，您先联系我们的在线客服或您的账户经理咨询后，在账户经理的引导下来充值。
        </p>
        <h4>三、特别说明</h4>
        <p>
          此项充值一经付费购买成功，将无法办理退款，请谨慎购买。（若有不清楚的地方，及时与在线客服或您的账户经理联系确认）
        </p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >接受</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="warnRecharge"
      width="30%"
      custom-class="warnRecharge"
      :before-close="handleClose"
    >
      <div class="propBody">
        <h4>您好！您选择<span v-if="activeIndex == 1">入门版</span><span v-if="activeIndex == 2">进阶版</span><span v-if="activeIndex == 3">高阶版</span>套餐,成功续费<span>{{sliderValue}}</span>个月，共计需支付</h4>
        <h3>{{totalMoney.toFixed(2)}}元</h3>
        <p v-if="activeIndex == 1">此次购买增加：可管理店铺数+8，可发布产品数+40。</p>
        <p v-if="activeIndex == 2">此次购买增加：可管理店铺数+10，可发布产品数+80。</p>
        <p v-if="activeIndex == 3">此次购买增加：可管理店铺数+30，可发布产品数+无限制。</p>
        <p><button @click="warnRecharge = false">已知晓，继续充值</button></p>
        <p class="warnText"><i class="el-icon-warning-outline"></i> 若确认充值并充值成功，将无法办理退款</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "./index.scss";
export default {
  name: "Renew",
  data() {
    return {
      dialogVisible: true,
      packageIndex: 1,
      activeIndex: 1,
      sliderValue: 0,
      totalMoney: 49,
      warnRecharge:false,
      paymentType:1,
      isFirst:1,
    };
  },
  methods: {
    handleClose(done) {
      done();
    },
    next() {
      if(this.packageIndex === 1){
        this.packageIndex++;
        this.isFirst = 1
      }
      if (this.packageIndex === 2) {
        if(this.isFirst === 1){
          this.warnRecharge = true;
          this.isFirst = 2
          
        }else{
          this.packageIndex++;
        }
         
      }
     
    },
    hasActive(index) {
      this.activeIndex = index;
      this.sliderValue = 1;
      this.getSlideValue();
    },
    getSlideValue() {
      if (this.activeIndex == 1) {
        this.totalMoney = this.sliderValue * 49;
      } else if (this.activeIndex == 2) {
        this.totalMoney = this.sliderValue * 499;
      } else if (this.activeIndex == 3) {
        this.totalMoney = this.sliderValue * 999;
      }
    },
    getPaymentMethod(index){
      this.paymentType = index;
      console.log(this.paymentType)
    }
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
}
ul,
li {
  list-style-type: none;
}
.rennew {
  font-size: 14px;
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("~@/assets/img/rennew.jpg") no-repeat;
  background-size: 100% 100%;
  .main {
    width: 700px;
    margin: auto;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 20px 16px -15px rgba(0, 0, 0, 0.57);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 10%;
    // text-align: center;
    h3 {
      font-weight: 300;
      padding-top: 30px;
      color: #252422;
      font-size: 26px;
      text-align: center;
    }
    h3 + p {
      color: #9a9a9a;
      text-align: center;
    }
    .steps {
      width: 80%;
      margin: auto;
      margin-top: 20px;
    }
    .warnTitle {
      p {
        text-align: center;
        padding: 20px 0px;
        width: 90%;
        margin: auto;
        margin-top: 20px;
        transition: transform 0.3s;
        font-size: 16px;
        cursor: pointer;
        &:hover {
          box-shadow: 0px 12px 17px -7px rgba(0, 0, 0, 0.3);
          -webkit-transform: translateY(-10px);
          -moz-transform: translateY(-10px);
          -o-transition: translateY(-10px);
          -ms-transform: translateY(-10px);
          transform: translateY(-10px);
        }
      }
    }
    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      margin-top: 20px;
      li {
        width: 30%;
        border-radius: 4px;
        transition: transform 0.3s;
        background: #f3f2ee;
        padding: 20px 0;
        cursor: pointer;
        &:hover {
          box-shadow: 0px 12px 17px -7px rgba(0, 0, 0, 0.3);
          -webkit-transform: translateY(-10px);
          -moz-transform: translateY(-10px);
          -o-transition: translateY(-10px);
          -ms-transform: translateY(-10px);
          transform: translateY(-10px);
        }
        &.active {
          background: #4ba3d3;
          p {
            color: #fff;
          }
        }
        P {
          font-size: 14px;
          color: #0000004d;
          line-height: 30px;
          text-indent: 14px;
          &:nth-child(1) {
            text-decoration: line-through;
          }
          &:nth-child(2) {
            color: #f6a951;
            font-size: 20px;
            margin: 5px 0px;
          }
        }
      }
    }
    .line {
      border: none;
      height: 1px;
      background: #ff6600;
      width: 98%;
      margin: auto;
      margin-top: 50px;
    }
    .sliderTime {
      overflow: hidden;
      line-height: 38px;
      position: relative;
      margin-top: 20px;
      .demonstration {
        float: left;
        margin-left: 30px;
        display: inline-block;
        height: 38px;
        line-height: 38px;
        font-weight: 700;
        color: #333;
        margin-right: 5px;
      }
      .el-slider {
        float: left;
        width: 300px;
      }
      .money {
        position: absolute;
        right: 10px;
        font-size: 18px;
      }
    }
    .nextStep {
      text-align: right;
      span {
        display: inline-block;
        width: 140px;
        height: 38px;
        line-height: 38px;
        background: #7a9e9f;
        text-align: center;
        color: #fff;
        border-radius: 50px;
        margin: 10px 30px 30px 0px;
        cursor: pointer;
      }
    }
    .recharge {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px 30px;
      span {
        display: inline-block;
        width: 140px;
        height: 38px;
        border-radius: 50px;
        border: 1px solid red;
        line-height: 38px;
        text-align: center;
        cursor: pointer;
        &:last-child {
          background-color: #f6a951;
          border: 1px solid #f6a951;
          color: #fff;
          &:hover {
            opacity: 0.8;
          }
        }
        &:first-child {
          border-color: #66615b;
          color: #66615b;
          &:hover {
            background: #66615b;
            color: #fff;
          }
        }
      }
    }
    .moneyType {
      p {
        text-align: center;
        margin-top: 20px;
        img {
          width: 121px;
          height: 121px;
          transition: transform 0.1s;
          margin-right: 10px;
          margin-bottom: 20px;
          border: 6px solid #F3F2EE;
          border-radius: 4px;
          &:hover {
            box-shadow: 0px 12px 17px -7px rgba(0, 0, 0, 0.3);
            -webkit-transform: translateY(-10px);
            -moz-transform: translateY(-10px);
            -o-transition: translateY(-10px);
            -ms-transform: translateY(-10px);
            transform: translateY(-10px);
          }
        }
      }
    }
    .successfulRecharge{
      p{
        text-align: center;
        img{
          display: block;
          margin: auto;
        }
        span{
          display: inline-block;
          border: 1px solid #5bc0de;
          margin: 10px auto;
          width: 140px;
          height: 38px;
          line-height: 38px;
          background: #5bc0de;
          color: #fff;
          border-radius: 50px;
        }
      }
    }
  }
  .rennewProp {
    h4 {
      color: #ff6600;
    }
  }
}
</style>
