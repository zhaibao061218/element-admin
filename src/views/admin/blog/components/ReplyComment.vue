<template>
  <div>
    <el-dialog title="回复" :visible.sync="dialogFormVisible" width="70%" custom-class="blogProp">
      <el-form :model="form">
        <el-form-item label="评论标题：" label-width="120px">
          <span v-text="form.Title">Not helpful</span>
        </el-form-item>
        <el-form-item label="评论内容：" label-width="120px">
          <span class="commentContent" v-html="form.Content"></span>
        </el-form-item>
        <el-form-item label="评论时间：" label-width="120px">
          <span v-text="form.CreateTime">5555</span>
        </el-form-item>
        <el-form-item label="评论人：" label-width="120px">
          <span v-text="form.UserName">5555</span>
        </el-form-item>
        <el-form-item label="状态：" label-width="120px">
          <span v-if="form.State === 0">下架</span>
          <span v-if="form.State === 1">上架</span>
          <span v-if="form.State === -1">草稿</span>
        </el-form-item>
        <el-form-item label="回复：" label-width="120px">
          <Editor ref="content" v-model="editorValue"></Editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitBlog()">确定并回复</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Editor from '@/components/Tinymce'
import { replyComment } from '@/api/blog.js'
export default {
  components: { Editor },
  props: {
    value: {
      typeof: Object,
    },
  },
  data() {
    return {
      form: this.value,
      dialogFormVisible: false,
      editorValue: '',
    }
  },
  created() {
    this.form = this.value
  },
  methods: {
    submitBlog() {
      var params = {
        blogId: this.form.BlogId,
        content: this.editorValue,
        toUserId: this.form.UserId,
        commentId: this.form.Id,
      }
      console.log
      replyComment(params)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
      this.dialogFormVisible = false
    },
  },
  watch: {
    value: function (newValue, oldValue) {
      this.form = newValue
    },
  },
}
</script>
<style lang="scss" scoped>
.commentContent {
  display: inline-block;
  line-height: 20px;
}
.blogProp {
  min-width: 800px;

  .el-dialog__header {
    padding: 0px;
    background: red;
  }
}
</style>
<style lang="scss">
.blogProp {
  margin-bottom: 100px;
  .el-dialog__header {
    background: #1890ff;
    text-align: center;
    .el-dialog__title,
    .el-dialog__close {
      color: #fff;
    }
  }
}
</style>
