<template>
  <div class="newClass m-20">
    <div class="pageTitle">
      <h2>Rebatest brand story</h2>
      <span class="back">
        <router-link :to="{ name: 'academy-index', params: { showType: 2 } }">
          <svg-icon icon-class="return" />返回</router-link
        >
      </span>
    </div>

    <div class="main">
      <el-form label-width="150px">
        <el-form-item label="PC端视频：" prop="name">
          <el-input placeholder="请输入内容" v-model="PcViedo"> </el-input>
        </el-form-item>

        <el-form-item label="M端视频：">
          <el-input placeholder="请输入内容" v-model="MobileViedo"> </el-input>
        </el-form-item>

        <el-form-item label="PC端视频封面：">
          <upload-View
            width="1361"
            height="570"
            class="upload"
            v-model="adminImgPC"
            :limit="1"
          >
          </upload-View>
        </el-form-item>

        <el-form-item label="M端视频封面：">
          <upload-View
            width="600"
            height="251"
            class="upload"
            v-model="adminImgM"
            :limit="1"
          ></upload-View>
        </el-form-item>

        <el-form-item label="浏览人数：">
          <el-radio-group v-model="peopleNumber" @change="browseNumber()">
            <el-radio :label="1">实际浏览人数</el-radio>
            <el-radio :label="2">在实际浏览人数上加</el-radio>
          </el-radio-group>
          <el-input
            style="display: inline-block; width: 150px"
            v-model="addPeople"
            placeholder="请输入内容"
            class="addPeople m-l-10"
            :disabled="peopleInput"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitData()">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import "../course/components/index.scss";
import uploadView from "@/components/Upload/shareUpload";
import { getBrandssory, updateBrandssory } from "@/api/management";
export default {
  name: "ArticleDetail1",
  components: {
    uploadView,
  },
  data() {
    return {
      isAdd: this.$route.query.id,
      dialogImageUrl: "",
      dialogVisible: false,
      peopleNumber: 1,
      addPeople: "",
      peopleInput: true,
      videoPC: {},
      videoM: {},
      PcViedo: "",
      MobileViedo: "",
      adminImgPC: [],
      adminImgM: [],
      checkedId: 0,
      showUpLoad: false,
    };
  },
  computed: {},
  created() {
    this.getBrandssoryData();
  },
  methods: {
    handleRemove(file, fileList) {
      //console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    gitFileImggPC(url) {
      if (url === 2) {
        this.adminImgPC = "";
      } else {
        this.adminImgPC = url;
      }
    },
    gitFileImggM(url) {
      if (url === 2) {
        this.adminImgM = "";
      } else {
        this.adminImgM = url;
      }
    },
    changePermissions() {
      if (this.permissions === "0") {
        this.checkboxDisabled = false;
      } else {
        this.checkboxDisabled = true;
      }
      //console.log(this.permissions);
    },
    browseNumber() {
      //console.log(this.peopleNumber);
      if (this.peopleNumber === 1) {
        this.peopleInput = true;
        this.addPeople = "";
      } else {
        this.peopleInput = false;
      }
    },
    submitData() {
      if (this.validation()) {
        this.updateBrandssoryInfo();
      }
    },
    validation() {
      //console.log(this.PcViedo.length);

      if (this.PcViedo.length <= 0) {
        this.$message.error("请上传pc端视频");
        return false;
      } else if (this.MobileViedo.length <= 0) {
        this.$message.error("请上传移动端视频");

        return false;
      } else if (this.adminImgPC.length <1 || this.adminImgM.length <1) {
        this.$message.error("请上传视频封面");
        return false;
      } else if (!this.peopleNumber) {
        this.$message.error("请选择浏览人数");

        return false;
      } else {
        return true;
      }
    },
    getBrandssoryData() {
      getBrandssory()
        .then((res) => {
          //console.log(res);
          this.PcViedo = res.ResponseData.PcViedoUrl;
          this.MobileViedo = res.ResponseData.MobileViedoUrl;
          this.adminImgPC = [{url:res.ResponseData.PcImageUrl}];
          this.adminImgM = [{url:res.ResponseData.MobileImageUrl}];
          this.checkedId = res.ResponseData.Id;
          this.showUpLoad = true;
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    updateBrandssoryInfo() {
      var params = {
        id: this.checkedId,
        pcViedoUrl: this.PcViedo,
        mobileViedoUrl: this.MobileViedo,
        pcImageUrl: this.adminImgPC[0].url,
        mobileImageUrl: this.adminImgM[0].url,
        browseCount: parseInt(this.addPeople) > 0 ? parseInt(this.addPeople) : 0,
      };
      updateBrandssory(params)
        .then((res) => {
          //console.log(res);
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
          this.$message({
            type: "success",
            message: "修改失败!",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.newClass {
  margin: 20px;

  .el-input {
    width: 50%;
  }

  .main {
    background: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
  }
}
</style>
