<template>
  <div class="management m-20">
    <div class="pageTitle">
      <h2>学院页设置</h2>
      <span class="back">
        <router-link :to="{ name: 'academy-index', params: { showType: 1 } }"
          ><svg-icon icon-class="return" />返回</router-link
        >
      </span>
    </div>

    <div class="p-20 bg-white">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="ICON下标题:">
          <el-input v-model="form.description"></el-input>
        </el-form-item>

        <el-form-item label="URL:">
          <el-input v-model="form.linkUrl"></el-input>
        </el-form-item>

        <el-form-item label="PC端视频封面：">
          <upload-View
            :width="setWidthPC"
            :height="setHeightPC"
            class="upload"
            v-model="videoPCurl"
          ></upload-View>
        </el-form-item>

        <el-form-item label="M端视频封面：">
          <upload-View
            :width="setWidthM"
            :height="setHeightM"
            class="upload"
            v-model="videoMurl"
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
import { getIndexinfo, updataCatalog } from "@/api/management";
export default {
  name: "edit",
  components: {
    uploadView,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        description: "",
        linkUrl: "",
      },
      videoPC: {},
      videoM: {},
      videoPCurl: [],
      videoMurl: [],
      currentId: 0,
      showUpload: false,
      setWidth: "",
      setHeight: "",
      setWidthM: "",
      setHeightM: "",
    };
  },
  computed: {},
  created() {
    this.getContentList(this.$route.query.id);
    //console.log(this.$route.query.id);
    if (this.$route.query.id > 5) {
      this.setWidthPC = "540";
      this.setHeightPC = "320";
      this.setWidthM = "310";
      this.setHeightM = "190";
    } else {
      this.setWidthPC = "122";
      this.setHeightPC = "116";
      this.setWidthM = "122";
      this.setHeightM = "116";
    }
  },
  mounted() {},
  methods: {
    getContentList(id) {
      getIndexinfo({
        Id: id,
      })
        .then((res) => {
          //console.log(res);
          this.form.description = res.ResponseData.Description;
          this.form.linkUrl = res.ResponseData.LinkUrl;
          this.videoPCurl = [{url:res.ResponseData.CatalogPcImage}];
          this.videoMurl = [{url:res.ResponseData.CatalogMobileImage}];
          this.currentId = res.ResponseData.Id;
          this.showUpload = true;
          //console.log(this.videoMurl);
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    onSubmit() {
      if (this.validation()) {
        //console.log(this.videoPC);
        var params = {
          id: this.currentId,
          catalogPcImage: this.videoPCurl[0].url,
          catalogMobileImage: this.videoMurl[0].url,
          linkUrl: this.form.linkUrl,
          description: this.form.description,
        };
        updataCatalog(params)
          .then((res) => {
            //console.log(res);
            if (res.ResponseData === true) {
              this.$message({
                type: "success",
                message: "修改成功!",
              });
              this.$router.push({
                name: "academy-index",
                params: {
                  showType: 1,
                },
              });
            }
          })
          .catch((err) => {
            //console.log(err);
          });
      }
    },
    gitFileImggPC(url) {
      if (url === 2) {
        this.videoPCurl = "";
      } else {
        this.videoPCurl = url;
      }
    },
    gitFileImggM(url) {
      if (url === 2) {
        this.videoMurl = "";
      } else {
        this.videoMurl = url;
      }
    },
    validation() {
      if (!this.form.description) {
        this.$message.error("标题不能为空");

        return false;
      } else if (this.form.linkUrl == "") {
        this.$message.error("视频链接为空");
      } else if (this.videoPCurl.length <= 0) {
        this.$message.error("请上传pc端封面");

        return false;
      } else if (this.videoMurl.length <= 0) {
        this.$message.error("请上传移动端封面");

        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="scss">
.management {
  .el-input {
    width: 50%;
  }
}
</style>
