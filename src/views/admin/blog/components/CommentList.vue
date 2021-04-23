<template>
  <div class="getting m-20">
    <div class="pageTitle">
      <h2>博客评论</h2>
      <span class="back" @click="hideAddBlog()">
        <svg-icon icon-class="return" />返回
      </span>
    </div>
    <div class="p-20 bg-white ">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="搜索评论人">
          <el-input v-model="formInline.user" placeholder="请输入评论人名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" height="530" style="width: 100%" @expand-change="slideDown">
        <el-table-column type="expand">
          <template>
            <ul class="commentsDetail">
              <p class="p-b-10 title">评论回复：</p>
              <li v-for="item in commentsDetail" :key="item.Id">{{item.FromUserName}} <span>//</span> {{item.ToUserName}}:{{item.Content}}</li>
            </ul>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="Title" label="评论标题"></el-table-column> -->
        <el-table-column prop="Content" label="评论内容"></el-table-column>
        <el-table-column prop="CreateTime" label="评论时间"></el-table-column>
        <el-table-column prop="UserName" label="评论人"></el-table-column>
        <el-table-column prop="State" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.State === 0 ">正常显示</span>
            <span v-else>不显示</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="showReplyBlog(scope.row)">回复</el-button>
            <el-button size="mini" type="warning" @click="setListBlog(scope.row,1)" v-if="scope.row.State === 0">隐藏</el-button>
            <el-button size="mini" type="danger" @click="setListBlog(scope.row,2)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pageCompont v-if="pageTotal>10" :total="pageTotal" :page="currentPage" :limit="limit" @pagination="changePage"></pageCompont>
    </div>
    <Reply-BlogProp v-model="blogInfo" ref="blogProp"></Reply-BlogProp>
  </div>
</template>
<script>
import pageCompont from '@/components/Pagination'
import ReplyBlogProp from './ReplyComment'
import {
  getBlogCommentList,
  getCommentsDetail,
  editBlogCommentState,
} from '@/api/blog.js'
export default {
  components: { pageCompont, ReplyBlogProp },
  props: {
    value: {
      typeof: Number,
    },
  },
  data() {
    return {
      formInline: {
        user: '',
      },
      tableData: [],
      pageTotal: 100,
      currentPage: 1,
      limit: 10,
      blogInfo: {},
      currentBlogId: -1,
      commentsDetail: [],
      showComments: false,
    }
  },
  created() {
    if (this.$props.value) {
      this.currentBlogId = this.$props.value
      this.getTableData()
    }
  },
  mounted() {
    console.log('75454')
  },
  methods: {
    getTableData(obj) {
      var params = {
        PageIndex: this.currentPage,
        PageSize: this.limit,
        BlogId: this.currentBlogId,
      }
      if (obj) {
        params.userName = obj.user
      }

      getBlogCommentList(params)
        .then((res) => {
          console.log(res)
          this.tableData = res.Data.Data
          this.pageTotal = res.Data.Total
          this.slideDown(res.Data.Data[0])
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onSubmit() {
      this.currentPage = 1
      this.limit = 10
      this.getTableData(this.formInline)
    },
    hideAddBlog() {
      this.$emit('goback')
    },
    changePage(obj) {
      this.currentPage = obj.page
      this.limit = obj.limit
      this.getTableData()
    },
    showReplyBlog(obj) {
      this.blogInfo = obj
      this.$refs.blogProp.dialogFormVisible = true
    },
    setListBlog(obj, index) {
      var state = 0
      if (index === 1) {
        //隐藏
        state = 1
      } else {
        //删除
        state = 2
      }
      var params = {
        Id: obj.Id, //评论Id,
        conmmentType: obj.ReplyType, // 评论列表带过来,
        state: state,
      }
      editBlogCommentState(params)
        .then((res) => {
          console.log(res)
          this.getTableData()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    slideDown(row) {
      var params = {
        PageIndex: 1,
        PageSize: 10,
        commemtId: row.Id,
        ReplyType: row.ReplyType,
      }
      getCommentsDetail(params)
        .then((res) => {
          this.commentsDetail = res.Data
          this.showComments = true
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  watch: {
    value: function (newValue, oldValue) {
      this.currentBlogId = newValue
      this.getTableData()
    },
  },
}
</script>
<style lang="scss" scoped>
.back {
  cursor: pointer;
}
.el-table::before {
  height: 0px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.commentsDetail {
  li {
    height: 24px;
    line-height: 24px;
    color: #999;
    span {
      color: #4ba3d3;
    }
    .title {
      color: #666;
    }
  }
}
</style>
