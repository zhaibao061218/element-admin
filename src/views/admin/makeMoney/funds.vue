<template>
  <div class="m-20">
    <div class="pageTitle">
      <h2>数据统计</h2>
    </div>
    <div class="p-20 bg-white">
      <span>站点：</span>
      <el-radio-group v-model="site" size="small" @change="changeSite">
        <el-radio-button label="1">美国</el-radio-button>
        <el-radio-button label="2">英国</el-radio-button>
      </el-radio-group>
    </div>
    <div class="p-20 bg-white ">
      <el-form :inline="true" :model="formScreening" class="demo-form-inline">
        <el-form-item label="注册时间：">
          <el-date-picker
            type="date"
            placeholder="开始时间"
            v-model="formScreening.StartTime"
            style="width: 45%;"
            value-format="yyyy-MM-dd"
            clearable
          ></el-date-picker>
          <span class="el-icon-minus"></span>
          <el-date-picker
            type="date"
            placeholder="结束时间"
            v-model ="formScreening.EndTime"
            style="width: 45%;"
            value-format="yyyy-MM-dd"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="用户邮箱：">
          <el-input
            v-model.trim ="formScreening.UserName"
            placeholder="输入用户邮箱"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="交易类型：">
          <el-select v-model="formScreening.Type" placeholder="请选择">
            <el-option label="全部" value="0"></el-option>
            <el-option label="系统奖励" value="1"></el-option>
            <el-option label="转入" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="p-20 bg-white fundsList">
      <el-table :data="tableData" height="476" style="width: 100%">
        <el-table-column prop="alreadyCapital" label="流水号">
        </el-table-column>
        <el-table-column prop="userName" label="用户邮箱"> </el-table-column>
        <el-table-column prop="createTime" label="交易时间"> </el-table-column>
        <el-table-column prop="type" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 1">系统奖励</span>
            <span v-if="scope.row.type === 2">转入</span>
          </template>
        </el-table-column>
        <el-table-column prop="capital" label="资金变化($)"> </el-table-column>
        <el-table-column prop="amount" label="活动累积奖励"> </el-table-column>
      </el-table>
      <pageCompont
        v-if="pageTotal > 10"
        :total="pageTotal"
        :page="currentPage"
        :limit="limit"
        @pagination="changePage"
      ></pageCompont>
    </div>
  </div>
</template>
<script>
import pageCompont from "@/components/Pagination";
import { GetMoneyWater } from "@/api/makeMoney";
export default {
  components: { pageCompont },
  data() {
    return {
      formScreening: {
        UserName: "",
        StartTime:null,
        EndTime: null,
        Type: "0"
      },
      tableData: [],
      pageTotal: 100,
      currentPage: 1,
      limit: 10,
      site: 1
    };
  },
  created() {
    this.getMoneyWater();
  },
  methods: {
    onSubmit() {
      if (this.verification(this.formScreening)) {
        this.currentPage = 1;
        this.limit = 10;
        this.getMoneyWater(this.formScreening);
      }
    },
    verification(obj) {
      if (obj.EndTime < obj.StartTime) {
        this.$message.error("开始日期不能大于结束日期");
        return false;
      }
      return true;
    },
    changePage(obj) {
      this.currentPage = obj.page;
      this.limit = obj.limit;
      this.getMoneyWater();
    },
    changeSite() {
      this.currentPage = 1;
      this.limit = 10;
      this.formScreening = {
        UserName: "",
        StartTime: null,
        EndTime: null,
        Type: "0"
      },
      this.getMoneyWater();
    },
    getMoneyWater(obj) {
      var params = {
        PageIndex: this.currentPage,
        SiteId: this.site,
        PageSize: this.limit
      };
      if (obj) {
        for (var key in obj) {
          if (obj[key]) {
            params[key] = obj[key];
          }
        }
      }
      GetMoneyWater(params)
        .then(res => {
          this.pageTotal = res.data.amount;
          this.tableData = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.bg-white {
	margin-bottom: 10px;
	&.fundsList {
		.el-table {
			margin-top: 30px;
		}
		.el-table::before {
			height: 0;
		}
	}
}

</style>
