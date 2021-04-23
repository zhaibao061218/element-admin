<template>
  <div class="getting m-20">
    <div class="pageTitle">
      <h2>兼职用户</h2>
    </div>
    <div class="p-20 bg-white">
      <span>站点：</span>
      <el-radio-group v-model="site" size="small" @change="changeSite">
        <el-radio-button label="1">美国</el-radio-button>
        <el-radio-button label="2">英国</el-radio-button>
      </el-radio-group>
    </div>
    <div class="p-20 bg-white">
      <ul class="list5">
        <li><span>总兼职用户数： </span><span  class="fw-bold">{{pageTotal}}</span></li>
        <li><span>总邀请用户注册数：</span><span  class="fw-bold">{{dataTotalList.registerSum}}</span></li>
        <li><span>总订单号审核通过：</span><span class="fw-bold">{{dataTotalList.orderReviewSum}}</span></li>
        <li><span>总留评检测成功：</span><span class="fw-bold">{{dataTotalList.reviewSum}}</span></li>
        <li><span>总活动赚取金额：</span><span class="fw-bold">{{dataTotalList.capitalSum}}</span></li>
      </ul>
    </div>
    <div class="p-20 bg-white">
      <el-form ref="form" :model="form" :inline="true" class="demo-form-inline">
        <el-form-item label="账号：">
          <el-input
            v-model.trim="form.name"
            placeholder="请输入用户的邮箱"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="邀请注册人数：">
          <el-input
            v-model="form.registerNumStar"
            class="peopleNumber"
            oninput="value=value.replace(/[^\d]/g,'')"
            placeholder="只限数字"
            clearable
          ></el-input>
          <span class="el-icon-minus"></span>
          <el-input
            v-model="form.registerNumEnd"
            class="peopleNumber"
            oninput="value=value.replace(/[^\d]/g,'')"
            placeholder="只限数字"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="试用报告审核通过人数：">
          <el-input
            v-model="form.reportNumStar"
            class="peopleNumber"
            oninput="value=value.replace(/[^\d]/g,'')"
            placeholder="只限数字"
            clearable
          ></el-input>
          <span class="el-icon-minus"></span>
          <el-input
            v-model="form.reportNumEnd"
            class="peopleNumber"
            oninput="value=value.replace(/[^\d]/g,'')"
            placeholder="只限数字"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="留评检测成功人数：">
          <el-input
            v-model="form.leaveReviewStar"
            class="peopleNumber"
            oninput="value=value.replace(/[^\d]/g,'')"
            placeholder="只限数字"
            clearable
          ></el-input>
          <span class="el-icon-minus"></span>
          <el-input
            v-model="form.leaveReviewEnd"
            class="peopleNumber"
            oninput="value=value.replace(/[^\d]/g,'')"
            placeholder="只限数字"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        height="476"
        style="width: 100%"
      >
        <el-table-column prop="userName" label="邮箱"> </el-table-column>
        <el-table-column prop="firstloginTime" label="最后登录时间">
        </el-table-column>
        <el-table-column prop="registerQty" label="邀请好友注册人数">
        </el-table-column>
        <el-table-column prop="applyQty" label="订单号审核通过">
        </el-table-column>
        <el-table-column prop="orderReviewQty" label="留评检测成功">
        </el-table-column>
        <el-table-column  label="活动赚取金额"> 
          <template slot-scope="scope"><span>{{scope.row.alreadyCapital + scope.row.capital}}</span></template>
        </el-table-column>
      </el-table>
      <page-Component
        v-if="pageTotal > 10"
        :total="pageTotal"
        :page="currentPage"
        :limit="limit"
        @pagination="changePage"
      ></page-Component>
    </div>
    <!-- <PropIndex ref="propTable"></PropIndex> -->
  </div>
</template>
<script>
import pageComponent from "@/components/Pagination";
import { GetUserStatistics, GetSum } from "@/api/makeMoney";
import PropIndex from "./components/PropIndex";
export default {
  components: { pageComponent, PropIndex },
  data() {
    return {
      site: "1",
      form: {
        name: "",
        registerNumStar: "",
        registerNumEnd: "",
        reportNumStar: "",
        reportNumEnd: "",
        leaveReviewStar: "",
        leaveReviewEnd: "",
        payableStar: "",
        payableEnd: ""
      },
      tableData: [],
      pageTotal: 0,
      currentPage: 1,
      limit: 10,
      dataTotalList: {}
    };
  },
  created() {
    this.GetUserStatistics();
    this.getDataSunList();
  },
  methods: {
    changeSite() {
      (this.form = {
        name: "",
        registerNumStar: "",
        registerNumEnd: "",
        reportNumStar: "",
        reportNumEnd: "",
        leaveReviewStar: "",
        leaveReviewEnd: "",
        payableStar: "",
        payableEnd: ""
      }),
      this.GetUserStatistics();
      this.getDataSunList();
    },
    onSubmit() {
      var obj = {
        UserName: this.form.name,
        RegisterQtyStart:parseInt(this.form.registerNumStar) > 0? parseInt(this.form.registerNumStar): 0,
        RegisterQtyEnd:parseInt(this.form.registerNumEnd) > 0? parseInt(this.form.registerNumEnd): 0,
        SubmitTrialQtyStart: parseInt(this.form.reportNumStar) > 0? parseInt(this.form.reportNumStar): 0,
        SubmitTrialQtyEnd:parseInt(this.form.reportNumEnd) > 0? parseInt(this.form.reportNumEnd): 0,
        OrderReviewQtyStart:parseInt(this.form.leaveReviewStar) > 0? parseInt(this.form.leaveReviewStar): 0,
        OrderReviewQtyEnd:parseInt(this.form.leaveReviewEnd) > 0? parseInt(this.form.leaveReviewEnd): 0,
        PageIndex: this.currentPage,
        PageSize: this.limit
      };
      this.currentPage = 1;
      this.limit = 10;
      this.GetUserStatistics(obj);
    },
    changePage(obj) {
      this.currentPage = obj.page;
      this.limit = obj.limit;
      this.GetUserStatistics();
    },
    GetUserStatistics(obj) {
      var params = {
        PageIndex: this.currentPage,
        PageSize: this.limit,
        SiteId: this.site
      };
      if (obj) {
        for (var key in obj) {
          params[key] = obj[key];
        }
      }

      GetUserStatistics(params)
        .then(res => {
          this.tableData = res.data.data;
          this.pageTotal = res.data.amount;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataSunList() {
      GetSum({ SiteId: parseInt(this.site) })
        .then(res => {
          this.dataTotalList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // showTable() {
    //   this.$refs.propTable.dialogTableVisible = true;
    // }
  }
};
</script>
<style lang="scss" scoped>
.bg-white {
	overflow: hidden;

	margin-bottom: 10px;
	.list5 {
		display: flex;
		justify-content: flex-start;
		li {
			margin-right: 4%;
		}
	}
	.el-form {
		overflow: hidden;
	}
	.el-form-item {
		float: left;

		margin-right: 30px;
		.el-icon-minus {
			margin: 0 5px;

			line-height: 36px;
		}
		.peopleNumber {
			width: 150px;
		}
	}
	.el-table {
		margin-top: 30px;
	}
	.el-table::before {
		height: 0;
	}
}

</style>
<style lang="scss">
// .bg-white {
//   .el-table {
//     th,
//     td {
//       cursor: pointer;
//     }
//   }
// }

</style>
