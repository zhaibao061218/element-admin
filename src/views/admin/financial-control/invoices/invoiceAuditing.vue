<template>
  <div class="invoiceAuditingYN">
    <h3>审核单据</h3>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane  name="first" >
          <span slot="label">待审核收款单<el-badge :value="stateObj.ApprovalReceiveOrderCount"></el-badge></span>
          <keep-alive>
          <paymentOrder @refresh="refresh"></paymentOrder>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane name="second"> 
           <span slot="label">待审核调拨单<el-badge :value="stateObj.ApprovalTransferOrderCount "></el-badge></span>
          <keep-alive>
          <transferSlip @refresh="refresh"></transferSlip>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane name="third"> 
          <span slot="label">待审核付款单<el-badge :value="stateObj.ApprovalPayOrderCount "></el-badge></span>
          <keep-alive>
          <receipt @refresh="refresh"></receipt>
          </keep-alive>
        </el-tab-pane>
        
      </el-tabs>
    </div>
  </div>
</template>

<script>
import paymentOrder from './components/paymentOrder'
import transferSlip from './components/transferSlip'
import receipt from './components/receipt'
import {get_approvalorder_count} from '@/api/bills'
export default {
  data() {
    return {
      stateObj:{
        ApprovalPayOrderCount:null,
        ApprovalReceiveOrderCount:null,
        ApprovalTransferOrderCount:null,
      },
      activeName: "first",
        currency:-1,
    };
  },
  components:{
      paymentOrder,
      transferSlip,
      receipt
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name;
    },
    //刷新待审核数量 
    refresh(){
      get_approvalorder_count().then((res)=>{
      this.stateObj=res.Data;
    })
    }
  },
  created(){
    this.refresh();
  }
};
</script>

<style lang="scss">
.invoiceAuditingYN {
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
  .contentBox {
    text-align: center;
    margin-top: 20px;
  }
  .el-tabs__nav-wrap:after {
    background-color: transparent !important;
  }
}
</style>