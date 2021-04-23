<template>
  <div class="getting m-20">
    <div class="pageTitle">
      <h2>{{ viewTitle }}</h2>
      <span class="back">
        <router-link :to="{ name: 'academy-index', params: { showType: 2 } }">
          <svg-icon icon-class="return" />返回</router-link
        >
      </span>
    </div>

    <div class="p-20 bg-white">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="标题：">
          <el-input v-model="form.gettTitle" :disabled="disabled"></el-input>
        </el-form-item>

        <el-form-item label="内容：">
          <div class="editorView">
            <Editor ref="content" v-model="editorValue"></Editor>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onrelease">发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Editor from "@/components/Tinymce/index";
import { getQaInfo, updateQaInfo } from "@/api/management";
export default {
  components: {
    Editor,
  },
  data() {
    return {
      form: {
        gettTitle: "",
      },
      currentId: 0,
      disabled: false,
      editorValue: "",
      viewTitle: "",
    };
  },
  created() {
    //console.log(this.$route.query);
    if (parseInt(this.$route.query.id) === 2) {
      this.getArticle(2);
      this.viewTitle = "Q & A（文章）";
    } else {
      this.getArticle(1);
      this.disabled = true;
      this.viewTitle = "Getting started";
    }
  },
  methods: {
    getValue() {
      this.editorValue = tinyMCE.activeEditor.getContent();
    },
    onrelease() {
      var params = {
        id: this.currentId,
        title: this.form.gettTitle,
        articleContent: this.editorValue,
      };
      updateQaInfo(params)
        .then((res) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.$router.push({
            name: "academy-index",
            params: {
              showType: 2,
            },
          });
        })
        .catch((err) => {
          this.$message.error("操作失败!");
        });
    },
    getArticle(id) {
      getQaInfo({
        ArticleType: id,
      })
        .then((res) => {
          this.form.gettTitle = res.ResponseData.Title;
          this.currentId = res.ResponseData.Id;
          this.editorValue = res.ResponseData.ArticleContent;
          this.$refs.content.$emit("change", this.editorValue);
        })
        .catch((err) => {
          //console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.getting {
  .el-input {
    width: 50%;
  }

  .editorView {
    width: 50%;
  }
}
</style>
