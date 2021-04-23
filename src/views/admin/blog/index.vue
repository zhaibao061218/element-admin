<template>
  <div class="m-20">
    <div class="p-20 bg-white " v-show="isShowList === 1">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="状态：">
          <el-select v-model="formInline.State" placeholder="请选择">
            <el-option label="全部" value="-8"></el-option>
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
            <el-option label="草稿" value="-1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="亚马逊站点：">
          <el-radio-group v-model="formInline.SiteName" size="small">
            <el-radio-button label="US">US</el-radio-button>
            <el-radio-button label="UK">UK</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="栏目选择：">
          <el-select v-model="formInline.BlogType" placeholder="请选择">
            <el-option label="全部类型" value="-8"></el-option>
            <el-option label="本月推荐" value="1"></el-option>
            <el-option label="最新活动" value="2"></el-option>
            <el-option label="用户分享" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-form-item label="博客标题：">
            <el-input v-model.trim="formInline.title" placeholder="请输入标题" clearable></el-input>
          </el-form-item>
          <el-button type="primary" class="placeholder" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item class="addBlog">
          <el-button type="warning" @click="addBlogList()"><span class="el-icon-plus"></span>添加新博客 </el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" height="526">
        <el-table-column prop="Title" label="标题"> </el-table-column>
        <el-table-column prop="comments" label="评论数">
          <template slot-scope="scope">
            <span>{{ scope.row.CommentCount }}</span>
            <span class="lookComments" @click="lookComment(scope.row)">查看评论</span>
          </template>
        </el-table-column>
        <el-table-column prop="ShareCount" label="分享数"> </el-table-column>
        <el-table-column prop="State" label="博客状态">
          <template slot-scope="scope">
            <el-button size="mini" v-if="scope.row.State === 1" type="success">上架</el-button>
            <el-button size="mini" v-if="scope.row.State === 0" type="warning">下架</el-button>
            <el-button size="mini" v-if="scope.row.State === -1" type="info">草稿</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="LikesCount" label="点赞数"> </el-table-column>
        <el-table-column prop="BrowseCount" label="浏览数"> </el-table-column>
        <el-table-column prop="BlogType" label="栏目分类">
          <template slot-scope="scope">
            <span v-if="scope.row.BlogType === 1">本月推荐</span>
            <span v-if="scope.row.BlogType === 2">最新活动和开奖公告</span>
            <span v-if="scope.row.BlogType === 3">用户分享</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" size="mini" type="primary">编辑</el-button>
            <el-button v-if="scope.row.State === 1" @click="deleteBlog(scope.row)" size="mini" type="info">下架</el-button>
            <el-button v-else @click="deleteBlog(scope.row)" size="mini" type="info">上架</el-button>
            <el-button @click="deleteBlog(scope.row,2)" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pageComponent v-if="pageTotal > 1" :total="pageTotal" :page="currentPage" :limit="limit" @pagination="changePage"></pageComponent>
    </div>
    <Blog-Comment @goback="swtichView()" v-show="isShowList === 2" v-model="blogId"></Blog-Comment>
  </div>
</template>

<script>
import pageComponent from '@/components/Pagination'
import BlogComment from './components/CommentList'
import { fetchList, setBlogState } from '@/api/blog'
export default {
  components: { pageComponent, BlogComment },
  data() {
    return {
      formInline: {
        title: '',
        State: '-8',
        SiteName: 'US',
        BlogType: '-8',
      },
      tableData: [],
      pageTotal: 0,
      currentPage: 1,
      limit: 10,
      isShowList: 2,
      blogId: 0,
    }
  },
  created() {
    this.isShowList = 1
    this.getFetchList(this.formInline)
  },
  methods: {
    getFetchList(obj) {
      var params = {
        PageIndex: this.currentPage,
        PageSize: this.limit,
        State: parseInt(this.formInline.State),
        orderby: 1,
        BlogType: parseInt(this.formInline.BlogType),
        SiteName: this.formInline.SiteName,
      }
      if (obj.title) {
        params.BlogTitle = obj.title
      }
      fetchList(params).then((res) => {
        this.tableData = res.Data.Data
        this.pageTotal = res.Data.Total
      })
    },
    onSubmit() {
      this.currentPage = 1
      this.limit = 10
      this.getFetchList(this.formInline)
      console.log(this.formInline)
    },
    addBlogList() {
      // console.log("添加博客");
      this.$router.push({ name: 'blogEdit', query: { id: 0 } })
    },
    edit(obj) {
      //编辑
      // console.log("编辑")
      this.$router.push({ name: 'blogEdit', query: { id: 1, blogId: obj.Id } })
    },
    deleteBlog(obj, index) {
      console.log(obj)
      var state = 0
      var messsage = ''
      if (index != 2) {
        switch (obj.State) {
          case 0:
            state = 1
            messsage = '博客已上架'
            break
          case 1:
            state = 0
            messsage = '博客已下架'
            break
          case -1:
            state = 1
            messsage = '博客已上架'
            break
          default:
            state = 0
            messsage = '博客已下架'
        }
      } else {
        state = 4
      }

      //删除
      setBlogState({ Id: obj.Id, state: state })
        .then((res) => {
          this.$message({
            type: 'success',
            message: messsage,
          })
          this.getFetchList(this.formInline)
        })
        .catch((err) => {
          this.$message.error('删除操作失败')
        })
    },
    changePage(obj) {
      this.currentPage = obj.page
      this.limit = obj.limit
      this.getFetchList(this.formInline)
      console.log(this.formInline)
    },
    lookComment(obj) {
      console.log(obj)
      this.blogId = obj.Id
      this.isShowList = 2
    },
    swtichView() {
      this.isShowList = 1
    },
  },
}
</script>
<style lang="scss" scoped>
.el-form {
  position: relative;
  .el-form-item {
    margin-right: 50px;
  }
  .addBlog {
    position: absolute;
    z-index: 10;
    right: 0;
  }
  .placeholder {
    display: inline-block;

    margin-right: 160px;
  }
}
.el-table {
  margin-top: 50px;
  .lookComments {
    display: inline-block;

    margin-left: 5px;

    cursor: pointer;

    color: #1890ff;

    font-size: 10px;
  }
  &::before {
    height: 0;
  }
}
</style>
