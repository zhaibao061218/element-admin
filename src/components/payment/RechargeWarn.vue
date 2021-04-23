<template>
  <div>
    <!-- 弹窗 -->
    <el-dialog
      title="信息"
      :visible.sync="rechargeWarn"
      width="400px"
      :before-close="handleClose"
      custom-class="rechargeWarn"
      top="15%"
    >
      <div class="propView">
        温馨提示：为不影响您的商品推广，请您在为外币可用余额充值之后，同时确保可用e币余额充足。<span
          @click="ruleText = true"
          class="rule"
          >点击查看细则</span
        >
      </div>
      <span slot="footer" class="dialog-footer" center>
        <p class="closeBtn">
          <span @click="goRecharge()">已知晓，继续充值</span>
        </p>
      </span>
    </el-dialog>
    <!-- 规则 -->
    <el-dialog
      title="信息"
      :visible.sync="ruleText"
      width="500px"
      :before-close="handleClose"
      custom-class="ruleText"
      top="15%"
      :closeOnClickModal="false"
    >
      <div class="propView">
        <p>充值分为两部分：产品本金（外币）和E币都需要充值</p>
        <p>
          “充值美金”充值的是美国站点产品的本金，每笔订单的产品售价是全额返现给买家
        </p>
        <p>
          “充值英镑”充值的是英国站点产品的本金，每笔订单的产品售价是全额返现给买家
        </p>
        <p>
          “充值E币”充值的是平台佣金，每笔订单都会收取佣金，留评区域订单30E币，免评区域订单15E币，人民币一比一充值
        </p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Order",
  props: ["showHide"],
  data() {
    return {
      rechargeWarn: false,
      ruleText: false,
      withdrawal: false,
      propTYpe: 1,
    };
  },
  mounted() {

  },
  methods: {
    changeCountry(index) {
      this.currentCountry = index;
    },
    handleClose(done) {
      done();
    },
    goRecharge() {
      this.rechargeWarn = false
      this.$emit("clickType", this.propTYpe);
    },
  },
  watch: {
    showHide: {
      handler(newValue, oldValue) {
        this.propTYpe = newValue;
          if (newValue > 0) {
            this.rechargeWarn = true;
          }
        
      },
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
}

.rechargeWarn {
  font-size: 14px;
  .propView {
    width: 80%;
    margin: 10px auto;
    line-height: 26px;
    .rule {
      color: blue;
      cursor: pointer;
    }
  }
  .closeBtn {
    text-align: center;
    span {
      border-color: #1e9fff;
      background-color: #1e9fff;
      color: #fff;
      font-size: 14px;
      padding: 5px 10px;
      cursor: pointer;
    }
  }
}
.ruleText {
  .propView {
    margin: 0 20px;
    padding-bottom: 10px;
    p {
      color: red;
      line-height: 20px;
      &:first-child {
        margin-bottom: 30px;
      }
    }
  }
}
</style>

