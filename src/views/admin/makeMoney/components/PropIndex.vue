<template>
  <div>
    <el-dialog title="邀请好友状态" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column
          property="date"
          label="邀请好友账号"
          width="150"
        ></el-table-column>
        <el-table-column
          property="name"
          label="注册时间"
          width="200"
        ></el-table-column>
        <el-table-column property="maxState" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.maxState === 1">注册</span>
            <span v-if="scope.row.maxState === 2">申请产品</span>
            <span v-if="scope.row.maxState === 3">提交订单号</span>
            <span v-if="scope.row.maxState === 4">提交试用报告</span>
            <span v-if="scope.row.maxState === 5">留评</span>
            <span v-if="scope.row.maxState === 6">留评检测成功</span>
          </template>
        </el-table-column>
      </el-table>
      <Page-View
        v-if="pageTota > 10"
        :total="pageTota"
        :page="currentPage"
        :limit="limit"
        @pagination="changePage"
      ></Page-View>
    </el-dialog>
  </div>
</template>
<script>
import PageView from "@/components/Pagination";
export default {
  components: { PageView },
  data() {
    return {
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          maxState: 2
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          maxState: 5
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          maxState: 1
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          maxState: 3
        }
      ],
      dialogTableVisible: false,
      pageTota: 20,
      currentPage: 1,
      limit: 10
    };
  },
  methods: {
    changePage(obj) {
      this.currentPage = obj.page;
      this.limit = obj.limit;
      console.log(obj);
    }
  }
};
</script>
<style lang="scss" scoped></style>
