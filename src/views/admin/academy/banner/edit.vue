<template>
  <div class="managementBanner m-20">
    <div class="pageTitle">
      <h2>学院页Banner编辑</h2>
      <span class="back">
        <router-link :to="{ name: 'academy-index', params: { showType: 2 } }"
          ><svg-icon icon-class="return" />返回</router-link
        >
      </span>
    </div>

    <div class="p-20 bg-white">
      <el-form label-width="150px">
        <el-form-item label="PC端封面：">
          <upload-View
            width="1920"
            height="510"
            class="upload"
            v-model="pcData"
          ></upload-View>
        </el-form-item>

        <el-form-item label="M端封面：">
          <upload-View
            width="750"
            height="500"
            class="upload"
            v-model="mData"
          ></upload-View>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import uploadView from "@/components/Upload/shareUpload";
import { getBanner, updateBanner } from "@/api/management";

export default {
  components: { uploadView },
  data() {
    return {
      form: {
        bannerName: "",
      },
      videoPC: [],
      videoM: [],
      pcData: [],
      mData: [],
      pcImgId: 0,
      mImgId: 0,
      showUpLoad: false,
    };
  },
  computed: {},
  created() {
    getBanner()
      .then((res) => {
        //console.log(res);
        res.ResponseData.map((item) => {
          if (item.ShowType === 1) {
            //   this.videoPC.push(item);
            this.pcData = [{url:item.ImageUrl}];
            this.pcImgId = item.Id
          }
          if (item.ShowType === 2) {
            this.mData = [{url:item.ImageUrl}];
            this.mImgId = item.Id
            //this.videoM.push(item);
          }
        });
        if (this.videoM[0].ImageUrl.length <= 0) {
          this.videoM[0].ImageUrl = "55555";
        }
       // this.mData = this.videoM[0].ImageUrl;
       // this.pcData = his.videoPC[0].ImageUrl;
        //this.pcImgId = this.videoPC[0].Id;
       // this.mImgId = this.videoM[0].Id;
       // this.showUpLoad = true;
      })
      .catch((err) => {
        //console.log(err);
      });
  },
  methods: {
    onSubmit() {
      if (this.verifySubmit()) {
        var params = [
          {
            id: this.pcImgId,
            showType: 1,
            imageUrl: this.pcData[0].url,
          },
          {
            id: this.mImgId,
            showType: 2,
            imageUrl: this.mData[0].url,
          },
        ];
        updateBanner(params)
          .then((res) => {
            //console.log(res);
            if (res.ResponseData === true) {
              this.$message({
                type: "success",
                message: "修改成功!",
              });
              this.$router.push({ name: "academy-index", params: { showType: 2 } });
            }
          })
          .catch((err) => {
            this.$message.error("修改失败失败");
          });
      }
    },
    gitFileImggPC(url) {
      if (url === 2) {
        this.pcData = "";
      } else {
        this.pcData = url;
      }
      //console.log(url);
    },
    gitFileImggM(url) {
      if (url === 2) {
        this.mData = "";
      } else {
        this.mData = url;
      }

      //console.log(url);
    },
    verifySubmit() {
      if (this.pcData.length <1) {
        this.$message.error("请上传pc端封面");
        return false;
      }
      if (this.mData.length <1) {
        this.$message.error("请上传移动端封面");
        return false;
      }
      return true;
    },
  },
};
</script>
<style lang="scss">
.managementBanner {
  .el-input {
    width: 50%px;
  }
}
</style>
