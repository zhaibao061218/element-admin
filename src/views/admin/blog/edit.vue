<template>
  <div class="getting m-20">
    <div class="pageTitle">
      <h2>{{viewTitle}}</h2>
      <span class="back" @click="hideAddBlog()">
        <svg-icon icon-class="return" />返回
      </span>
    </div>
    <div class="p-20 bg-white">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="站点：">
          <!-- @change="getRadioValue" -->
          <el-radio-group v-model="form.SiteId " size="small">
            <el-radio-button label="1" v-if="form.SiteId == 1">美国</el-radio-button>
            <el-radio-button label="2" v-if="form.SiteId == 2">英国</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请填写博客标题"></el-input>
        </el-form-item>
        <el-form-item label="封面图">
          <uploadView width="631" height="481" class="upload" v-model="form.CoverImg"></uploadView>
        </el-form-item>
        <el-form-item label="栏目选择">
          <el-select v-model="form.BlogType" placeholder="请选择">
            <el-option label="本月推荐" value="1"></el-option>
            <el-option label="最新活动和开奖公告" value="2"></el-option>
            <el-option label="用户分享" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="博客状态">
          <el-select v-model="form.state" placeholder="请选择">
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
            <el-option label="草稿" value="-1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="form.tag " placeholder="请填写博客标签"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="form.SortDescribe " placeholder="请填写博客标题"></el-input>
        </el-form-item>
        <el-form-item label="博客内容">
          <Editor ref="content" v-model="form.Content "></Editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="lookBlog()">预览</el-button>
          <el-button type="info" @click="deleteBlog()">取消操作</el-button>
          <el-button type="success" @click="onSubmit()">确定</el-button>
          <!-- <el-button type="danger" @click="saveBlog()">存入草稿</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Editor from '@/components/Tinymce/index'
import uploadView from '@/components/Upload/shareUpload'
import { newBlog, getBlogInfo, editBlogInfo } from '@/api/blog'
export default {
  components: { uploadView, Editor },
  data() {
    return {
      site: '1',
      form: {
        title: '',
        SortDescribe: '',
        SiteId: '1',
        state: '',
        tag: '',
        CoverImg: [],
        Content: '',
        BlogType: '',
      },
      currentId: '',
    }
  },
  created() {
    this.currentId = this.$route.query.id
    if (parseInt(this.$route.query.id) === 0) {
      this.viewTitle = '新增博客'
    } else {
      this.viewTitle = '编辑博客'
      getBlogInfo({ BlogId: this.$route.query.blogId })
        .then((res) => {
          this.form.SiteId = res.Data.SiteId + ''
          this.form.title = res.Data.Title
          this.form.BlogType = res.Data.BlogType + ''
          this.form.state = res.Data.State + ''
          this.form.tag = res.Data.Tag
          this.form.SortDescribe = res.Data.SortDescribe
          this.form.Content = res.Data.Content
          this.$refs.content.$emit('change', this.form.Content)
          this.form.CoverImg = [{ url: res.Data.CoverImg }]
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  methods: {
    addNewBlog() {
      if (this.validationform(this.form)) {
        newBlog(this.form)
          .then((res) => {
            console.log(res)
            this.$router.push({ name: 'blogIndex' })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    editorBlog() {
      if (this.validationform(this.form)) {
        this.form.id = this.$route.query.blogId
        editBlogInfo(this.form)
          .then((res) => {
            console.log(res)
            this.$router.push({ name: 'blogIndex' })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    hideAddBlog() {
      //   this.$emit("hideView");
      this.$router.push({ name: 'blogIndex' })
    },
    onSubmit() {
      console.log(this.CoverImg)
      if (this.$route.query.blogId) {
        this.editorBlog()
      } else {
        this.addNewBlog()
      }
    },

    validationform(obj) {
      console.log(obj)
      if (!obj.title) {
        this.$message.error('请输入博客标题')
        return false
      }
      if (obj.CoverImg.length <= 0) {
        this.$message.error('请上传博客封面')
        return false
      }
      if (!obj.BlogType) {
        this.$message.error('请选择博客栏目')
        return false
      }
      if (!obj.state) {
        this.$message.error('请选择博客状态')
        return false
      }
      if (!obj.tag) {
        this.$message.error('请输入博客标签')
        return false
      }
      if (!obj.SortDescribe) {
        this.$message.error('请输入博客简介')
        return false
      }
      if (!obj.Content) {
        this.$message.error('请输入博客内容')
        return false
      }

      return true
    },
    // getRadioValue(value) {
    //   this.form.SiteId = parseInt(value)
    // },
    lookBlog() {
      //预览博客
      console.log('预览博客')
    },
    // saveBlog() {
    //   //保存草稿
    //   console.log('保存草稿')
    // },
    deleteBlog() {
      //发表博客
      console.log('取消博客')
      this.$router.push({ name: 'blogIndex' })
    },
  },
}
</script>
<style lang="scss" scoped>
.back {
  cursor: pointer;
}
</style>
