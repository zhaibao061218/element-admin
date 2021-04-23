<template>
  <div class="newClass">
    <div class="pageTitle">
      <h2>新手课程管理</h2>
      <span class="back">
        <router-link :to="{ name: 'academy-course-list', params: { showType: 1 } }">
          <svg-icon icon-class="return" />返回</router-link
        >
      </span>
    </div>

    <div class="main">
      <el-form label-width="150px">
        <el-form-item label="课程标题：">
          <el-input v-model="classTitle" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="PC视频：">
          <el-input v-model="pcVideoLink" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="M视频：">
          <el-input v-model="MVideoLink" placeholder="请输入内容" clearable></el-input>
        </el-form-item>

        <el-form-item label="PC视频封面：">
          <uploadView
            class="upload"
            width="1361"
            height="570"
            :limit="1"
            v-model="adminImgPC"
          ></uploadView>
        </el-form-item>

        <el-form-item label="M视频封面：">
          <uploadView
            class="upload"
            width="600"
            height="251"
            :limit="1"
            v-model="adminImgM"
          ></uploadView>
        </el-form-item>

        <el-form-item label="权限：">
          <el-select
            v-model="permissions"
            placeholder="请选择"
            @change="changePermissions()"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="浏览人数：">
          <el-radio-group v-model="peopleNumber" @change="browseNumber()">
            <el-radio :label="1">实际浏览人数</el-radio>
            <el-radio :label="2">在实际浏览人数上加</el-radio>
          </el-radio-group>
          <el-input
          style="display: inline-block; width: 180px"
            v-model="addPeople"
            placeholder="请输入人数(只限整数)"
            class="addPeople m-l-10"
            :disabled="peopleInput"
            oninput="value=value.replace(/[^\d]/g,'')"
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
import "./index.scss";
import uploadView from "@/components/Upload/shareUpload";
import { addNewCourse, getNewCourseInfo, updateNewCourse } from "@/api/course";
import { isArray } from "@/utils/validate";
export default {
  name: "ArticleDetail1",
  components: { uploadView },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isAdd: this.$route.query.id,
      text: "",
      classTitle: "",
      dialogImageUrl: "",
      dialogVisible: false,
      options: [
        {
          value: "0",
          label: "下架",
        },
        {
          value: "1",
          label: "上架",
        },
      ],
      permissions: "",
      checked: 0,
      checkboxDisabled: true,
      peopleNumber: 1,
      addPeople: "",
      peopleInput: true,
      adminImgM: [],
      adminImgPC: [],
      showUpLoad: true,
      UserId: 0,
      pcVideoLink: "",
      MVideoLink: "",
      courseId: 0,
    };
  },
  computed: {},
  created() {
    this.courseId = this.$route.query.courseId;

    if (this.$route.query.courseId) {
      const id = this.$route.query.courseId;
      this.getCalssInfo(id);
      this.showUpLoad = false;
    } else {
      this.showUpLoad = true;
    }
  },
  methods: {
    getCalssInfo(id) {
      getNewCourseInfo({ Id: id })
        .then((res) => {
          console.res;
          this.classTitle = res.ResponseData.CourseTitle;
          this.adminImgM = [{url:res.ResponseData.MobileImageUrl}];
          this.adminImgPC = [{url:res.ResponseData.PcImageUrl}];
          this.permissions = res.ResponseData.IsOnline + "";
          if (res.ResponseData.IsOnline === 1) {
            this.checkboxDisabled = false;
          }
          this.UserId = res.ResponseData.CreateUserId;
          this.pcVideoLink = res.ResponseData.PcViedoUrl;
          this.MVideoLink = res.ResponseData.MobileVideoUrl;
          if (res.ResponseData.IsTop === 1) {
            this.checked = true;
          } else {
            this.checked = false;
          }
          this.CreateUserId = res.ResponseData.CreateUserId;

          this.showUpLoad = true;
        })
        .catch((err) => {
          //console.log(err);
        });
    },
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
        this.checkboxDisabled = true;
      } else {
        this.checkboxDisabled = false;
      }
    },
    browseNumber() {
      if (this.peopleNumber === 1) {
        this.peopleInput = true;
        this.addPeople = "";
      } else {
        this.peopleInput = false;
      }
    },
    submitData() {
      if (this.validation()) {
        if (this.$route.query.id > 2) {
          //增加课程
          if (this.pcVideoLink.length <= 0) {
            this.$message.error("请添加pc端课程视频");
          } else if (this.MVideoLink.length <= 0) {
            this.$message.error("请添加移动端课程视频");
          } else {
            this.addNewCourseData();
          }
        } else {
          //编辑课程
          this.updateNewCourse();
        }
      }
    },
    validation() {
      if (!this.classTitle) {
        this.$message.error("课程标题不能为空");

        return false;
      } else if (this.adminImgPC.length <1 || this.adminImgM.length <1) {
        this.$message.error("请上传课程图片");

        return false;
      } else if (!this.permissions) {
        this.$message.error("请选择权限");
      } else if (!this.peopleNumber) {
        this.$message.error("请选择浏览人数");
      } else {
        return true;
      }
    },
    addNewCourseData() {
      var formData = {
        courseTitle: this.classTitle,
        mobileVideoUrl: this.MVideoLink,
        pcViedoUrl: this.pcVideoLink,
        pcImageUrl: this.adminImgPC[0].url,
        mobileImageUrl: this.adminImgM[0].url,
        browseCount: parseInt(this.addPeople) > 0 ? parseInt(this.addPeople) : 0,
        createUserId: this.CreateUserId,
        isTop: 0,
        isOnline: parseInt(this.permissions),
        browseCountType: this.peopleNumber,
      };
      addNewCourse(formData)
        .then((res) => {
          if (res.ResponseData === "true") {
            this.$message({
              type: "success",
              message: "课程已添加!",
            });
            this.$router.push({
              name: "academy-course-list",
              params: { showType: 1 },
            });
          } else {
            this.$message({
              type: "warning",
              message: res.ResponseData,
            });
          }
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    updateNewCourse() {
      //console.log(this.peopleNumber)
      var params = {
        id: this.$route.query.courseId,
        courseTitle: this.classTitle,
        isOnline: parseInt(this.permissions),
        createUserId: this.CreateUserId,
        isTop: 0,
        articleContent: this.editorHtml,
        pcViedoUrl: this.pcVideoLink,
        mobileVideoUrl: this.MVideoLink,
        MobileImageUrl: this.adminImgM[0].url,
        PcImageUrl: this.adminImgPC[0].url,
        browseCount: parseInt(this.addPeople)  > 0 ? parseInt(this.addPeople) : 0,
        browseCountType: this.peopleNumber,
        updateUserId: this.UserId,
      };

      updateNewCourse(params)
        .then((res) => {
          if (res.ResponseData === "true") {
            this.$message({
              type: "success",
              message: "课程修改成功!",
            });
            this.$router.push({
              name: "academy-course-list",
              params: { showType: 1 },
            });
          }
        })

        .catch((err) => {
          this.$message.error("课程修改失败!");
        });
    },
  },
};
</script>
<style scoped lang="scss">
.newClass {
  .main {
    background: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
  }
   .el-input,.editorView {
    width: 50%;
  }
}
</style>
