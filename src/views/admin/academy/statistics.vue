<template>
  <div class="view m-20">
    <div class="pageTitle"><h2>数据统计</h2></div>
    <div class="p-20 bg-white main">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="课程标题">
          <el-input v-model="form.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="所属课程">
          <el-select v-model="form.course" placeholder="请选择课程">
            <el-option label="全部课程" value="-1"></el-option>
            <el-option label="新手课程" value="1"></el-option>
            <el-option label="中级课程" value="2"></el-option>
            <el-option label="高级课程" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- :default-sort = "{prop: 'RealBrowseCount', order: 'descending'}" -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="CourseTitle" label="标题" align="left">
        </el-table-column>
        <el-table-column prop="CourseType" label="所属课程" align="left" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.CourseType === 1">新手课程</span>
            <span v-if="scope.row.CourseType === 2">中级课程</span>
            <span v-if="scope.row.CourseType === 3">高级课程</span>
          </template>
        </el-table-column>
        <el-table-column prop="RealBrowseCount" label="点击量" sortable align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.RealBrowseCount }}</span>
          </template>
        </el-table-column>
      </el-table>
      <paging
        v-if="pagetotal > 10"
        :total="pagetotal"
        :page="currentPage"
        :limit="limit"
        @pagination="changePage"
      ></paging>
    </div>
  </div>
</template>
<script>
import { getcoursedata } from "@/api/statistical";
import paging from "@/components/Pagination/index";
export default {
  components: { paging },
  data() {
    return {
      tableData: [],
      form: {
        title: "",
        course: "-1",
      },
      pagetotal: 0,
      limit: 10,
      currentPage: 1,
      orderType: 0,
    };
  },
  created() {
    this.getListData();
    // this.form.course = "新手课程"
  },
  methods: {
    getListData() {
      var params = {
        PageIndex: this.currentPage,
        PageSize: this.limit,
        clickType: 0,
      };
      //console.log(this.form);
      if (this.form.title.length > 0) {
        params.CourseTitle = this.form.title;
      }
      if (this.form.course.length > 0) {
        params.CourseType = parseInt(this.form.course);
      }
      getcoursedata(params)
        .then((res) => {
          //console.log(res);
          this.tableData = res.ResponseData.Data;
          this.pagetotal = res.ResponseData.Total;
        })
        .catch((err) => {
          //console.log(err);
        });
    },

    onSubmit() {
      this.currentPage = 1;
      this.getListData();
    },
    changePage(obj) {
      this.limit = obj.limit;
      this.currentPage = obj.page;
      this.getListData();
    },
    sortData() {
      if (this.orderType === 0) {
        this.orderType = 1;
      } else {
        this.orderType = 0;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.view {
  h3 {
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    line-height: 40px;
    color: #555555;
    font-size: 20px;
    font-weight: lighter;
  }
  .main {
    background: #fff;
    padding: 20px;
    .el-form-item {
      float: left;
      margin-right: 20px;
    }
  }
}
</style>
