<template>
  <div>
    <el-dialog  :title="title" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column
        v-if="showTitleIndex === 1"
          property="buyerId"
          label="好友账号"
        ></el-table-column>
        <el-table-column
          property="state"
          label="当前状态"
        >
         <template slot-scope="scope">
            <span v-if="scope.row.state === 1">注册</span>
            <span v-if="scope.row.state === 2">申请产品</span>
            <span v-if="scope.row.state === 3">提交订单号</span>
            <span v-if="scope.row.state === 4">提交试用报告</span>
            <span v-if="scope.row.state === 5">留评</span>
            <span v-if="scope.row.state === 6">留评检测成功</span>
          </template>
        </el-table-column>
        <el-table-column
          property="createTime"
          label="注册时间"
        ></el-table-column>
      </el-table>
       <!-- <page-Component
        v-if="pageTotal>10"
        :total="pageTotal"
        :page="currentPage"
        :limit="limit"
        @pagination="changePage"
      ></page-Component> -->
    </el-dialog>
  </div>
</template>
<script>
// import pageComponent from "@/components/Pagination";
import {getRunningWater} from "@/api/makeMoney";
export default {
  props: {
    value: {
      type: Object,
      default: {
          title:"标题",
          showTitleIndex:1
      },
    },
     
  },
  // components: { pageComponent },
  data() {
    return {
      gridData: [],
      dialogTableVisible: false,
      title:"",
      showTitleIndex:1,
      pageTotal:20,
      currentPage:1,
      limit:10,
      currentId:0
    };
  },
  created() {
      this.$on("change", (obj) => {
      this.currentId = obj.Id;
      this.getTableData()
      this.title = obj.propTitle;
      this.showTitleIndex = obj.showTitleIndex;
      this.dialogTableVisible = true
    });

  },
  methods: {
    // changePage(obj) {
    //   this.currentPage = obj.page;
    //   this.limit = obj.limit
    //   this.getTableData()
    // },
    getTableData(){
      getRunningWater({"BuyerId":this.currentId}).then(res=>{
          this.gridData = res.data
        }).catch(err=>{
          console.log(err)
        })
    }
  },
};
</script>
<style lang="scss" scoped></style>
