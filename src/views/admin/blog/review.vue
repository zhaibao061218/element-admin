<template>
  <div class="getting m-20">
    <div class="pageTitle">
      <h2>{{ viewTitle }}</h2>
      <span class="back" @click="goBack">
        <svg-icon icon-class="return" />返回
      </span>
    </div>
    <div class="p-20 bg-white">
      <!-- <el-form :model="formInline" class="demo-form" ref="ruleForm"> -->
      <el-form
        :model="formInline"
        ref="formInline"
        label-width="100px"
        class="demo-formInline"
      >
        <el-form-item label="站点：" prop="site">
          <el-radio v-model="formInline.site" label="1">美国</el-radio>
          <el-radio v-model="formInline.site" label="2">英国</el-radio>
        </el-form-item>
        <el-form-item label="页面选择：" prop="checkView">
          <el-select v-model="formInline.checkView" placeholder="请选择">
            <el-option label="博客首页banner" value="0"></el-option>
            <el-option label="博客首页产品推荐" value="1"></el-option>
            <el-option label="博客分类页banner" value="2"></el-option>
            <el-option label="博客首页本月推荐" value="3"></el-option>
            <el-option label="博客首页最新活动和开奖公告" value="4"></el-option>
            <el-option label="博客首页用户分享" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称：" prop="name">
          <el-input
            v-model="formInline.name"
            placeholder="请填写名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="URL：" prop="URL">
          <el-input
            v-model="formInline.URL"
            placeholder="请输入URL链接"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
          <el-input
            v-model.number="formInline.sort"
            placeholder="请输入数字"
            oninput="value=value.replace(/[^\d]/g,'')"
          ></el-input>
        </el-form-item>
        <el-form-item label="PC图片：">
            <UploadView  width="478"
            height="350"
            class="upload"
            v-model="PcData"></UploadView>
        </el-form-item>
        <el-form-item label="M图片：">
            <UploadView  width="750" 
            height="500"
            class="upload"
            v-model="mData"></UploadView>
        </el-form-item>
        <el-form-item label="自动上下线：" prop="OnOff">
          <el-radio v-model="formInline.OnOff" label="1" type="number"
            >是</el-radio
          >
          <el-radio v-model="formInline.OnOff" label="2" type="number"
            >否</el-radio
          >
        </el-form-item>
        <el-form-item>
          <el-button type="info"  @click="resetForm('formInline')"
            >重置</el-button
          >
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import UploadView from "../../../components/Upload/shareUpload";
export default {
  components: { UploadView },
  data() {
    return {
      viewTitle: "",
      formInline: {
        site: "1",
        checkView: "",
        name: "",
        URL: "",
        sort: "",
        OnOff: "1"
      },
      mData:[],
      PcData:[],
    };
  },
  created() {
    if (this.$route.params.id == 1) {
      this.viewTitle = "新增评论";
    } else {
      this.viewTitle = "评论编辑";
    }
  },
  methods: {
    onSubmit() {
      console.log(this.formInline);
    },
    resetForm(formName) {
      console.log(formName);
      this.$refs[formName].resetFields();
    },
    goBack(){
        this.$router.push({name:"blogComment"})
    }
  }
};
</script>
<style lang="scss" scoped>
.back{
    cursor: pointer;
}
</style>
