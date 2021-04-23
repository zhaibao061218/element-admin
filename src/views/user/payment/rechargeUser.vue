<template>
  <div class="userRecharge">
    <h2>账户信息</h2>
    <p class="navTitle">
      <router-link :to="{ name: 'Payment' }">Profile</router-link> / 账户充值
    </p>
    <div class="articleView">
      <p>
        <span class="labelLeft">充值货币</span
        ><span
          v-for="item in countriesList"
          :key="item.id"
          @click="changeCountries(item.id)"
          :class="{ active: countriesIndex == item.id }"
          >{{ item.name }}</span
        >
      </p>
      <div>
        <span class="labelLeft">充值方式</span>
        <p class="paymentMethod">
          <span @click="topUptype(1)" :class="{ active: imgHover === 1 }"
            ><img alt="" src="@/assets/img/Apay.png" srcset=""
          /></span>
          <span @click="topUptype(2)" :class="{ active: imgHover === 2 }"
            ><img alt="" src="@/assets/img/Wxpay.png" srcset=""
          /></span>
          <span
            ><img alt="" src="@/assets/img/errorpaypal.png" srcset=""
          /></span>
        </p>
      </div>
      <!-- <div v-if="device=='mobile'">
        <span class="labelLeft">充值方式</span>
        <p class="paymentMethod">
          <span @click="topUptype(1)" :class="{ active: imgHover === 1 }"
            ><img alt="" src="@/assets/img/Apay.png" srcset=""
          /></span>
          <span @click="topUptype(2)" :class="{ active: imgHover === 2 }"
            ><img alt="" src="@/assets/img/Wxpay.png" srcset=""
          /></span>
          <span
            ><img alt="" src="@/assets/img/errorpaypal.png" srcset=""
          /></span>
        </p>
      </div> -->
      <p>
        <span class="labelLeft">充值金额</span>
        <input
          type="text"
          v-model="enterAmount"
          onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,4})?).*$/g, '$1')"
        />
        <label class="mobileLable">
          <span v-if="countriesIndex === 1">$</span>
          <span v-if="countriesIndex === 2">￡</span>
          <span v-if="countriesIndex === 3">￥</span>
          <img class="warnIco" src="@/assets/img/warn.png" alt="" srcset="" />
          您正在为您的
          <span v-if="countriesIndex === 1">美国</span>
          <span v-if="countriesIndex === 2">英国</span>
          <span v-if="countriesIndex === 3">日本</span>
          站点充值
        </label>
      </p>
      <p v-if="countriesIndex === 1">
        <span class="labelLeft">手续费</span>
        <span class="money">{{ handlingFees }}</span>$
        <label for="" class="mobileLable">手续费 ((充值金额 + 0.3) / (1 - 4.4%) - 充值金额)<a href="">为什么会有手续费？</a></label> 
      </p>
      <p v-if="countriesIndex === 2">
        <span class="labelLeft">手续费</span>￡
        <span class="money">{{ handlingFees }}</span>
        <label for="" class="mobileLable">手续费 ((充值金额 + 0.2) / (1 - 4.4%) - 充值金额)<a href="">为什么会有手续费？</a></label>
      </p>
      <p v-if="countriesIndex === 3">
        <span class="labelLeft">手续费</span>￥
        <span class="money">{{ handlingFees }}</span>
        <label for="" class="mobileLable">
          手续费 ((充值金额 + 0.2) / (1 - 4.4%) - 充值金额)
          <a
            href="https://www.paypal.com/c2/webapps/mpp/paypal-seller-fees?locale.x=zh_C2"
            >为什么会有手续费？</a
          >
        </label>
      </p>
      <p>
        <span class="labelLeft">总扣款金额</span>
        <span class="money">{{ totalAmount }}</span>
        <span v-if="countriesIndex === 1">$</span>
        <span v-if="countriesIndex === 2">￡</span>
        <span v-if="countriesIndex === 3">￥</span>
      </p>
      <p>
        <span class="labelLeft">您需支付</span><span>￥</span
        ><strong class="totalRmb">{{ totalRmb }}</strong
        ><span v-if="countriesIndex === 1">(当前实时汇率:6.47银行 : ICBC)</span
        ><span v-else>(当前实时汇率:9.08银行 : ICBC)</span>
      </p>
      <p>
        <span class="labelLeft"></span
        ><button class="submit" @click="submit">确认充值</button>
      </p>
      <p>
        <span class="labelLeft "  v-if="device=='desktop'"></span>
        <span class="red"
          >温馨提醒：因Paypal充值通道故障，暂时无法使用Paypal充值，请选择支付宝或微信充值，如给您带来不便，敬请谅解。</span
        >
      </p>
    </div>

    <!-- 支付二维码 -->
    <el-dialog
      title="充值"
      :visible.sync="qrCode"
      :before-close="handleClose"
      custom-class="qrCode"
    >
      <div class="qrCodeView">
        <p>
          请用<span v-if="imgHover == 1">支付宝</span
          ><span v-if="imgHover == 2">微信</span>扫描支付
        </p>
        <span class="qrCodeIco"></span>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="qrCode = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import "./index.scss";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      countriesList: [
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
      countriesIndex: 1,
      enterAmount: 0,
      handlingFees: 0,
      totalAmount: 0,
      totalRmb: 0,
      imgHover: 0,
      qrCode: false,
    };
  },
  computed: {
    ...mapGetters(["roles", "device"]),
  },
  created() {
    if (this.$route.params.id) {
      this.countriesIndex = this.$route.params.id;
    }
  },
  methods: {
    changeCountries(index) {
      this.countriesIndex = index;
      this.enterAmount = 0;
      this.totalRmb = 0;
    },
    topUptype(index) {
      this.imgHover = index;
    },
    submit() {
      console.log(this.enterAmount);
      if (this.enterAmount <= 0) {
         
        this.$alert("充值金额不能为空", "提示", {
          confirmButtonText: "确定",
          callback: (action) => {},
        });
      } else {
        this.qrCode = true;
      }
    },
    handleClose(done) {
      done();
    },
  },
  watch: {
    enterAmount: {
      handler(newValue, oldValue) {
        var site = 0;
        if (this.countriesIndex === 1) {
          site = 0.3;
        } else {
          site = 0.2;
        }
        var textAmount = newValue;
        if (parseInt(newValue) > 0) {
          console.log(newValue);
          this.handlingFees =
            (parseFloat(newValue) + site) / 0.956 - parseFloat(textAmount);
          this.handlingFees = this.handlingFees.toFixed(2);
          this.totalAmount = (
            parseFloat(this.handlingFees) + parseFloat(textAmount)
          ).toFixed(2);

          if (this.countriesIndex === 1) {
            this.totalRmb = (parseFloat(this.totalAmount) * 6.47).toFixed(2);
          } else {
            this.totalRmb = (parseFloat(this.totalAmount) * 9.08).toFixed(2);
          }
          console.log(this.totalRmb);
        } else {
          this.handlingFees = 0;
          this.totalAmount = 0;
        }
      },
    },
  },
};
</script>
<style scoped lang="scss">
* {
  margin: 0px;
  padding: 0px;
}
.red {
  color: red;
}
.userRecharge {
  color: #797979;
  h2 {
    padding: 15px;
    font-weight: 500;
  }
  .navTitle {
    height: 35px;
    line-height: 35px;
    margin: 0px 30px;
    background: #f5f5f5;
    text-indent: 14px;
    border-radius: 4px;
    margin-bottom: 20px;
  }

  .articleView {
    margin: 0 50px;
    padding: 15px;
    background: #fff;
    font-size: 14px;
    p {
      &:nth-child(1) {
        span {
          &:not(:first-child) {
            display: inline-block;
            width: 40px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            margin-right: 25px;
            cursor: pointer;
            position: relative;
            &.active {
              border: 1px solid #ff9600;
              &::before {
                content: "";
                position: absolute;
                bottom: 0px;
                right: 0px;
                width: 0;
                height: 0;
                border-bottom: 16px solid #ff9600;
                border-left: 15px solid transparent;
              }
              &::after {
                content: "√";
                color: #fff;
                position: absolute;
                bottom: 3px;
                right: 0;
                width: 10px;
                height: 20px;
                z-index: 3;
              }
            }
          }
        }
      }
      &.paymentMethod {
        position: relative;
        span {
          display: flex;
          border: 1px solid #c9c9c9;
          width: 142px;
          height: 62px;
          margin-right: 10px;
          float: left;
          overflow: hidden;
          &.active {
            border: 4px solid #ff6633;
          }
          img {
            margin: auto;
          }
        }
      }
      input {
        height: 32px;
        text-indent: 10px;
        outline: none;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        margin-right: 5px;
      }
      .warnIco {
        margin: 0 3px;
      }
      .submit {
        width: 110px;
        height: 30px;
        box-sizing: border-box;
        line-height: 16px;
        text-align: center;
        color: #fff;
        background-color: #5cb85c;
        border-color: #4cae4c;
        border: none;
        border-radius: 4px;
        outline: none;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
      .money {
        font-size: 20px;
        color: #ff9600;
        margin-right: 5px;
      }
      .totalRmb {
        font-size: 20px;
        color: #ff9600;
        margin: 0px 5px;
      }
      .mobileLable{
        font-weight: 500;
      }
    }
    .labelLeft {
      display: inline-block;
      width: 70px;
      height: auto;
      line-height: 30px;
      margin-right: 40px;
    }
    .paymentMethod {
      display: inline-block;
    }
    a {
      margin-left: 5px;
      &:hover{
        opacity: 0.8;
      }
    }
  }
  .articleView > p,
  .articleView > div {
    // display: flex;
    // align-items: center;
    margin-bottom: 15px;
  }
}
@media only screen and (max-width: 768px) {
  .userRecharge {
    font-size: 12px;
    h2 {
      padding: 10px;
      font-weight: 500;
      font-size: 16px;
    }
    .navTitle {
      margin: 0px;
      border-radius: 0px;
    }
    .articleView {
      margin: 0px;
      & > p {
        display: block;
        margin-bottom: 8px;
      }
      p {
        .warnIco {
          width: 12px;
          height: 12px;
          margin: 0 3px;
        }
      }
      & > div {
        display: block;
        p {
          &.paymentMethod {
            width: 100%;
            height: 140px;
            position: relative;
            overflow: hidden;
            span {
              margin-bottom: 10px;
            }
          }
        }
      }
      .mobileLable {
        display: block;
        padding-left: 110px;
        color: #797979;
        font-weight: 500;
        font-size: 10px;
        a{
          display: block;
          margin-left: 0px;
        }
      }
    }
  }
}
</style>