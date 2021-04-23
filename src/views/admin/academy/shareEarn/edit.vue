<template>
  <div class="newClass m-20">
    <div class="pageTitle">
      <h2>Share & Earn</h2>
      <span class="back">
        <router-link :to="{ name: 'academy-index', params: { showType: 2 } }">
          <svg-icon icon-class="return" />返回</router-link
        >
      </span>
    </div>

    <div class="main">
      <el-form label-width="150px">
        <el-form-item label="PC端海报封面：">
          <uploadView
            width="552"
            height="820"
            :limit="4"
            v-model="adminImgPC"
          ></uploadView>
        </el-form-item>

        <el-form-item
          v-for="item in fileDescPC"
          :key="item.id"
          :label="item.name + '：'"
        >
          <el-input
            v-model="item.modelName"
            placeholder="请输入海报分享链接文案"
          ></el-input>
        </el-form-item>

        <el-form-item label="M端海报封面：">
          <uploadView
            width="552"
            height="820"
            :limit="4"
            v-model="adminImgM"
          ></uploadView>
        </el-form-item>

        <el-form-item
          v-for="item in fileDescM"
          :key="item.id"
          :label="item.name + '：'"
        >
          <el-input
            v-model="item.modelName"
            placeholder="请输入海报分享链接文案"
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
import { getshareInfo, updateShare } from "@/api/management";
export default {
  name: "ArticleDetail1",
  components: {
    uploadView,
  },
  data() {
    return {
      isAdd: this.$route.query.id,
      dialogImageUrl: "",
      fileDescPC: [
        {
          name: "海报标题1",
          modelName: "",
          id: 0,
        },
        {
          name: "海报标题2",
          modelName: "",
          id: 1,
        },
        {
          name: "海报标题3",
          modelName: "",
          id: 2,
        },
        {
          name: "海报标题4",
          modelName: "",
          id: 3,
        },
      ],
      fileDescM: [
        {
          name: "海报标题1",
          modelName: "",
          id: 4,
        },
        {
          name: "海报标题2",
          modelName: "",
          id: 5,
        },
        {
          name: "海报标题3",
          modelName: "",
          id: 6,
        },
        {
          name: "海报标题4",
          modelName: "",
          id: 7,
        },
      ],
      adminImgPC: [],
      adminImgM: [],
    };
  },
  computed: {},
  created() {
    this.getshare();
  },
  methods: {
    getshare() {
      this.adminImgPC = [];
      this.adminImgM = [];
      getshareInfo()
        .then((res) => {

          let pcData=[],mData=[];

          res.ResponseData.map((item) => {
            if (item.ShowType === 1) {
              pcData.push(item);
            } else {
              mData.push(item);
            }
          });

          pcData.map((item, index) => {
            if (index <= 3) {
              this.adminImgPC.push({
                url: item.ImageUrl,
                name: item.Id,
                Id: item.Id,
              });
              this.fileDescPC[index].modelName = item.Copywriting;
              this.fileDescPC[index].Id = item.id;
            }
          });

          mData.map((item, index) => {
            if (index <= 3) {
              this.adminImgM.push({
                url: item.ImageUrl,
                name: item.Id,
                Id: item.Id,
              });
              this.fileDescM[index].modelName = item.Copywriting;
              this.fileDescM[index].Id = item.id;
            }
          });
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    submitData() {
      if (this.validation()) {
        //console.log(this.adminImgPC);
        var params = [];
        var imgPcId = 0;
        var imgMId = 0;
        for (var i = 0; i < this.adminImgPC.length; i++) {
          if (this.adminImgPC[i].Id) {
            imgPcId = this.adminImgPC[i].Id;
          } else {
            imgPcId = 0;
          }
          params.push({
            id: imgPcId,
            showType: 1,
            // imageUrl: this.adminImgPC[i].ImageUrl?this.adminImgPC[i].ImageUrl:this.adminImgPC[i].url,
            imageUrl: this.adminImgPC[i].url,
            copywriting: this.fileDescPC[i].modelName,
          });
        }
        //console.log(this.adminImgM);
        for (var i = 0; i < this.adminImgM.length; i++) {
          if (this.adminImgM[i].Id) {
            imgMId = this.adminImgM[i].Id;
          } else {
            imgMId = 0;
          }
          params.push({
            id: imgMId,
            showType: 2,
            // imageUrl: this.adminImgM[i].ImageUrl?this.adminImgM[i].ImageUrl:this.adminImgM[i].url,
            imageUrl: this.adminImgM[i].url,
            copywriting: this.fileDescM[i].modelName,
          });
        }
        updateShare(params)
          .then((res) => {
           //console.log(res);
            if (res.ResponseData === true) {
              this.$message({
                type: "success",
                message: "操作成功",
              });
              this.$router.push({
                name: "academy-index",
                params: {
                  showType: 2,
                },
              });
            }
          })
          .catch((err) => {
            this.$message.error("操作失败！");
          });
      }
    },
    validation() {
      var that = this;
      if (this.adminImgPC.length === 0 || this.adminImgM.length === 0) {
        that.$message.error("海报封面不能为空");
        return false;
      }
      for (var i = 0; i < this.adminImgPC.length; i++) {
        if (this.fileDescPC[i].modelName.length == 0) {
          that.$message.error(`pc端海报标题${i + 1}不能为空`);
          return false;
        }
      }
      for (var i = 0; i < this.adminImgM.length; i++) {
        if (this.fileDescM[i].modelName.length == 0) {
          that.$message.error(`移动端海报标题${i + 1}不能为空`);

          return false;
        }
      }

      return true;
    }
  },
};
</script>

<style lang="scss" scoped>
.newClass {
  margin: 20px;

  .main {
    background: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .el-input {
    width: 50%;
  }
}
</style>
