<template>
  <div class="m-20">
    <div class="pageTitle">
      <h2>兼职用户</h2>
    </div>
    <div class="p-20 bg-white">
      <span>站点：</span>
      <el-radio-group v-model="site" size="small" @change="getRadioValue">
        <el-radio-button label="1">美国</el-radio-button>
        <el-radio-button label="2">英国</el-radio-button>
      </el-radio-group>
    </div>
    <div class="p-20 bg-white">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="总邀请用户" name="1">
        
        </el-tab-pane>
        <el-tab-pane label="申请订单" name="2">
      
        </el-tab-pane>
        <el-tab-pane label="订单号审核通过" name="3">
          
        </el-tab-pane>
        <el-tab-pane label="试用报告审核通过" name="4">
         
        </el-tab-pane>
        <el-tab-pane label="留评" name="5">
        
        </el-tab-pane>
        <el-tab-pane label="留评检测成功" name="6">
         
        </el-tab-pane>
         <Table-View  :viewIndex="activeName" :site="site"></Table-View>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import  TableView from './components/TableView'
export default {
  components: { TableView, },
  data() {
    return {
      activeName: "1",
      site: "1"
    };
  },
  created() {
   
  },
  methods: {
    handleClick(tab, event) {
    },
    getRadioValue() {
      if (this.site === "1") {
        //美国
      } else {
        //英国
      }
    },
  }
};
</script>
<style lang="scss">
.bg-white {
	margin-bottom: 10px;
}

</style>
