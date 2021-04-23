<template>
  <div class="hlepView">
    <h3>新增帮助</h3>
    <div>
      <p>
        <span>标题</span
        ><el-input v-model="inputTitle" placeholder="请输入内容"></el-input>
      </p>
      <p>
        <span>分类</span
        ><el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </p>
      <div>
        <span>内容</span>
        <div class="editorView">
           <Editor ref="content" v-model="editorValue"></Editor>
        </div>
      </div>
      <p class="btnGroup">
        <span @click="clearContent">取消</span
        ><span @click="saveContent(1)">存草稿</span
        ><span @click="saveContent(2)">发布</span>
      </p>
    </div>
  </div>
</template>
<script>
import Editor from "@/components/Tinymce/index";
export default {
  data() {
    return {
      inputTitle: "",
      options: [
        {
          value: "1",
          label: "代理商介绍",
        },
        {
          value: "2",
          label: "Rebatest 会员介绍",
        },
        {
          value: "3",
          label: "关于平台提现及支付说明",
        },
      ],
      value: "",
      editorValue: "",
    };
  },
  components: { Editor },
  methods: {
    getValue() {
      this.editorHtml = tinyMCE.activeEditor.getContent();
      //console.log(this.editorHtml);
    },
    clearContent() {
      this.editorValue = "";
      this.$refs.content.$emit("change", this.editorValue);
    },
    saveContent(index) {
      if (index === 1) {
        //存草稿
        this.$message({ message: "已保存", type: "warning" });
        console.log(this.editorValue)
      } else {
        //发布
        this.$message({ message: "已发布", type: "warning" });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.hlepView {
  margin: 20px;
  font-size: 12px;
  h3 {
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    line-height: 40px;
    color: #555555;
    font-size: 20px;
    font-weight: lighter;
  }
  & > div {
    background: #fff;
    padding-top: 20px;
    padding-left: 50px;
    padding-bottom: 50px;
    & > p {
      overflow: hidden;
      height: 36px;
      line-height: 36px;
      margin-bottom: 20px;
      .el-input--medium {
        width: 400px;
      }
      .el-select {
        width: 400px;
      }
      span {
        float: left;
        margin-right: 10px;
      }
      &.btnGroup {
        clear: left;
        height: 50px;
        text-align: center;
        margin-top: 50px;
        span {
          display: inline-block;
          border: 1px solid #797979;
          width: 140px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          border-radius: 4px;
          margin-right: 35px;
          float: none;
          cursor: pointer;
        }
      }
    }
    & > div {
      overflow: hidden;
      span {
        float: left;
        margin-right: 10px;
      }
      .editorView {
        width: 80%;
        float: left;
      }
    }
  }
}
</style>