<template>
  <div class="getting m-20">
    <div class="pageTitle">
      <h2>博客页面管理</h2>
      <span class="back" @click="hideAddBlog()">
        <!-- <svg-icon icon-class="return" />返回 -->
      </span>
    </div>
    <div class="p-20 bg-white topView">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="搜索">
          <el-input v-model="formInline.bannerName" placeholder="输入名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="站点">
          <el-select v-model="formInline.siteName" placeholder="请选择">
            <el-option label="美国" value="US"></el-option>
            <el-option label="英国" value="UK"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="页面位置">
          <el-select v-model="formInline.showType" placeholder="请选择">
            <el-option label="全部" value="-8"></el-option>
            <el-option label="博客首页Banner" value="1"></el-option>
            <el-option label="博客首页产品推荐" value="2"></el-option>
            <el-option label="博客分类页Banner" value="3"></el-option>
            <el-option label="博客首页本月推荐" value="4"></el-option>
            <el-option label="博客首页最新活动和开奖活动" value="5"></el-option>
            <el-option label="博客首页用户分享" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间：">
          <el-date-picker type="date" placeholder="开始时间" v-model="formInline.stratTime" value-format="yyyy-MM-dd" style="width: 45%;" clearable></el-date-picker>
          <span class="el-icon-minus"></span>
          <el-date-picker type="date" placeholder="结束时间" v-model="formInline.endTime" value-format="yyyy-MM-dd" style="width: 45%;" clearable></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-button type="success" class="addBlog" @click="addNewBlog">新建</el-button>
      </el-form>
    </div>
    <div class="p-20 bg-white topView">
      <el-table :data="tableData" height="476" style="width: 100%">
        <el-table-column prop="BannerName" label="名称"> </el-table-column>
        <el-table-column prop="ShowType" label="页面位置"></el-table-column>
        <el-table-column prop="StieName" label="站点"></el-table-column>
        <el-table-column prop="Sort" label="排序"> </el-table-column>
        <!-- <el-table-column prop="address" label="上下线时间"> </el-table-column> -->
        <el-table-column prop="CreateTime" label="创建时间"> </el-table-column>
        <el-table-column prop="UserName" label="操作人"> </el-table-column>
        <el-table-column prop="address" label="操作" width="260px">
          <template>
            <el-button size="mini" type="primary" @click="updateData()">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteData()">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pageComponent v-if="pageTotal > 10" :total="pageTotal" :page="currentPage" :limit="limit" @pagination="changePage"></pageComponent>
    </div>
  </div>
</template>
<script>
import { getBlogBannerList } from '@/api/blog.js'
import pageComponent from '@/components/Pagination'
export default {
  components: { pageComponent },
  data() {
    return {
      formInline: {
        bannerName: '',
        siteName: 'US',
        showType: '-8',
        stratTime: '',
        endTime: '',
      },
      tableData: [],
      pageTotal: 20,
      currentPage: 1,
      limit: 10,
    }
  },
  created() {
    this.getTableData(this.formInline)
  },
  methods: {
    getTableData(obj) {
      var params = {
        PageIndex: this.currentPage,
        PageSize: this.limit,
      }
      for (var key in obj) {
        if (obj[key]) {
          params[key] = obj[key]
        }
      }
      getBlogBannerList(params)
        .then((res) => {
          console.log(res)
          this.tableData = res.Data.Data
          this.pageTotal = res.Data.Total
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onSubmit() {
      if (this.validation(this.formInline)) {
        this.currentPage = 1
        this.limit = 10
        this.getTableData(this.formInline)
      }
    },
    updateData() {
      console.log('更新')
      this.$router.push({ name: 'reviewEdit', params: { id: 2 } })
    },
    deleteData() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {})
    },
    changePage(obj) {
      this.currentPage = obj.page
      this.limit = obj.limit
      this.getTableData(this.formInline)
    },
    addNewBlog() {
      this.$router.push({ name: 'reviewEdit', params: { id: 1 } })
    },
    validation(obj) {
      if (obj.stratTime > obj.endTime) {
        this.$message.error('开始日期不能大于结束日期')
        return false
      }
      return true
    },
  },
}
</script>
<style lang="scss" scoped>
.bg-white {
  margin-bottom: 10px;
}
.topView {
  position: relative;
  .el-form-item {
    margin-right: 50px;
  }
  .el-icon-minus {
    display: inline-block;
    margin: 0 5px;
  }
  .addBlog {
    position: absolute;
    right: 20px;
  }
  .el-table {
    &::before {
      height: 0;
    }
  }
}
</style>
