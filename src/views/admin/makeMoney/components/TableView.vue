<template>
  <div>
    <div>
      <el-form :inline="true" :model="formInviteUsers" class="demo-form-inline">
        <el-form-item label="注册时间：">
          <el-date-picker
            type="date"
            placeholder="开始时间"
            v-model="formInviteUsers.StartTime"
            value-format="yyyy-MM-dd"
            style="width: 45%;"
            clearable
          ></el-date-picker>
          <span class="el-icon-minus"></span>
          <el-date-picker
            type="date"
            placeholder="结束时间"
            v-model="formInviteUsers.EndTime"
            value-format="yyyy-MM-dd"
            style="width: 45%;"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="账号：">
          <el-input
            v-model.trim ="formInviteUsers.UserName"
            placeholder="输入用户邮箱"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="邀请人账号：">
          <el-input
            v-model.trim ="formInviteUsers.InviterName"
            placeholder="邀请人邮箱"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableInviteUsers" height="550">
        <el-table-column prop="buyerId" label="ID编号"> </el-table-column>
        <el-table-column prop="buyerName" label="用户邮箱" width="260">
        </el-table-column>
        <el-table-column prop="createDateTime" label="注册时间">
        </el-table-column>
        <el-table-column prop="siteId" label="站点">
          <template slot-scope="scope">
            <span v-if="scope.row.siteId === 1">美国</span>
            <span v-if="scope.row.siteId === 2">英国</span>
          </template>
        </el-table-column>
        <el-table-column prop="maxState" label="当前状态">
          <template slot-scope="scope">
            <span v-if="scope.row.maxState === 1">注册</span>
            <span v-if="scope.row.maxState === 2">申请产品</span>
            <span v-if="scope.row.maxState === 3">订单号审核通过</span>
            <span v-if="scope.row.maxState === 4">提交试用报告</span>
            <span v-if="scope.row.maxState === 5">留评</span>
            <span v-if="scope.row.maxState === 6">留评检测成功</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="邀请人" width="260">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="lookPropData(scope.row)"
              >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <page-Components
        v-if="pageTota > 10"
        :total="pageTota"
        :page="currentPage"
        :limit="limit"
        @pagination="changePage"
      ></page-Components>
    </div>
    <prop ref="propCompontent" v-model="propValue"></prop>
  </div>
</template>
<script>
import pageComponents from "@/components/Pagination";
import prop from "./PropInvitWater";
import { GetInvitedUsers } from "@/api/makeMoney";
export default {
  components: { pageComponents, prop },
  props: {
    viewIndex: {
      type: String,
      default: ""
    },
    site: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      activeName: "1",
      switchTitle: 4567,
      formInviteUsers: {
        UserName:"",
        InviterName:"",
        StartTime: null,
        EndTime: null,
        Type: ""
      },
      tableInviteUsers: [],
      currentPage: 1,
      limit: 10,
      pageTota: 20,
      propTitle: "",
      showTitleIndex: 1,
      propValue: {}
    };
  },
  created() {
    this.getTabelData();
  
    this.$on("change", content => {
      alert(content);
    });
  },
  methods: {
    onSubmit() {
      if (this.verification(this.formInviteUsers)) {
        this.currentPage = 1;
        this.limit =10
        this.getTabelData(this.formInviteUsers);
      }
    },
    changePage(obj) {
      this.currentPage = obj.page;
      this.limit = obj.limit;
      this.getTabelData();
    },
    verification(obj) {
      if (obj.EndTime < obj.StartTime) {
        this.$message.error("开始日期不能大于结束日期");
        return false;
      }
      return true;
    },
    lookPropData(obj) {
      this.propValue.propTitle = "邀请用户流水";
      this.propValue.showTitleIndex = 1;
      this.propValue.Id = obj.buyerId;
      this.$refs.propCompontent.$emit("change", this.propValue);
    },
    getTabelData(obj) {
      var params = {
        PageIndex: this.currentPage,
        PageSize: this.limit,
        SiteId: parseInt(this.site),
        Type: parseInt(this.viewIndex)
      };

      if (obj) {
        for (var key in obj) {
          if (obj[key]) {
            params[key] = obj[key];
          }
        }
      }
      GetInvitedUsers(params)
        .then(res => {
          this.tableInviteUsers = res.data.data;
          this.pageTota = res.data.amount;
        })
        .catch(err => {
          console.log(err);
        });
    },
    resiteForm(){
     this.formInviteUsers = {
        UserName: "",
        InviterName: "",
        StartTime: null,
        EndTime: null,
        Type: ""
      }
    },
  },
  watch: {
    viewIndex: function(newValue, oldValue) {
      this.currentPage = 1;
      this.limit = 10;
      this.resiteForm();
      this.getTabelData();
    },
    site: function(newValue, oldValue) {
      this.currentPage = 1;
      this.limit = 10;
      this.resiteForm();
      this.getTabelData();
    }
  }
};
</script>
<style lang="scss">
.bg-white {
	margin-bottom: 10px;
	.el-form {
		margin-top: 30px;
		.el-form-item {
			margin-right: 20px;
		}
		.el-icon-minus {
			display: inline-block;

			margin: 0 5px;
		}
	}
	.el-table::before {
		height: 0;
	}
}

</style>
