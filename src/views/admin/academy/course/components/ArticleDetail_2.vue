<template>
  <div class="advancedCourses">
    <div class="pageTitle">
      <h2>{{ text }}级课程管理</h2>
      <span class="back">
        <router-link
          :to="{
            name: 'academy-course-list',
            params: { showType: Courselevel + 1 },
          }"
        >
          <svg-icon icon-class="return" />返回</router-link
        >
      </span>
    </div>

    <div class="main">
      <el-form label-width="150px">
        <el-form-item label="课程标题：">
          <el-input v-model="classTitle" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="内容：">
          <div class="editorView">
            <Editor ref="content" v-model="editorValue"></Editor>
          </div>
        </el-form-item>

        <el-form-item label="文章封面：">
          <el-row type="flex">
            <div class="m-r-20">
              <p>PC端</p>
              <upload-View
                width="405"
                height="258"
                class="upload"
                v-model="adminImgPC"
                :limit="1"
              ></upload-View>
            </div>
            <div>
              <p>M端</p>
              <upload-View
                
                width="405"
                height="258"
                class="upload"
                v-model="adminImgM"
                :limit="1"
              ></upload-View>
            </div>
          </el-row>
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
import Editor from "@/components/Tinymce/index";
import { getCourseInfo, addCourseSenior, updateCourse } from "@/api/course";
export default {
  name: "ArticleDetail2",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  components: { uploadView, Editor },
  data() {
    return {
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
      ArticleInfo: {},
      Courselevel: 0, //0:初级 1 中级 2 高级
      adminImgM: [],
      adminImgPC: [],
      showUpLoad: false,
      CreateUserId: 0,
      editorValue: "",
    };
  },
  computed: {},
  created() {
    if (this.$route.query.type == 1) {
      this.showUpLoad = true;
    }
    if (this.$route.query.courseId) {
      //编辑获取idy读取文章内容
      // const id = this.$route.params && this.$route.params.id
      getCourseInfo({ Id: this.$route.query.courseId })
        .then((res) => {
          this.ArticleInfo = res.ResponseData;
          this.classTitle = res.ResponseData.CourseTitle;

          this.editorValue = res.ResponseData.ArticleContent;

          this.$refs.content.$emit("change", this.editorValue);

          this.adminImgM = [{url:res.ResponseData.MobileImageUrl}];
          this.adminImgPC =  [{url:res.ResponseData.PcImageUrl}];
          this.permissions = res.ResponseData.IsOnline + "";
          if (res.ResponseData.IsOnline === 1) {
            this.checkboxDisabled = false;
          }
          if (res.ResponseData.IsTop === 1) {
            this.checked = true;
          } else {
            this.checked = false;
          }
          this.CreateUserId = res.ResponseData.CreateUserId;
          // this.videoM[0].url = res.ResponseData.MobileImageUrl;
          // this.videoM[0].url = res.ResponseData.PcImageUrl;

          this.showUpLoad = true;
        })
        .catch((err) => {
          //console.log(err);
        });
    } else {
      this.showUpLoad = true;
    }
    switch (this.$route.query.classType) {
      case 1 || "1":
        this.Courselevel = 0;
        break;
      case 2 || "2":
        this.Courselevel = 1;
        this.text = "中";
        break;
      case 3 || "3":
        this.Courselevel = 2;
        this.text = "高";
        break;
      default:
        this.Courselevel = 2;
    }
  },
  mounted() {},
  methods: {
    getValue() {
      this.editorValue = tinyMCE.activeEditor.getContent();
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
        this.adminImgPC = "url";
      } else {
        this.adminImgPC = url;
      }
    },
    gitFileImggM(url) {
      if (url === 2) {
        this.adminImgM = "url";
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

          this.addClass();
        } else {
          //编辑课程
          this.updataClass();
        }
      }
    },
    validation() {
      if (!this.classTitle) {
        this.$message.error("课程标题不能为空");

        return false;
      } else if (this.editorValue == "") {
        this.$message.error("请输入课程内容");
      } else if (this.adminImgPC.length <1 || this.adminImgM.length <1) {
        this.$message.error("请上传课程图片");
      } else if (!this.permissions) {
        this.$message.error("请选择权限");
      } else if (!this.peopleNumber) {
        this.$message.error("请选择浏览人数");
      } else {
        return true;
      }
    },
    addClass() {
      var formData = {
        id: this.$route.query.courseId,
        courseType: this.Courselevel,
        courseTitle: this.classTitle,
        isOnline: parseInt(this.permissions),
        createUserId: this.$route.query.CreateUserId,
        isTop: 0,
        articleContent: this.editorValue,
        PcImageUrl: this.adminImgPC[0].url,
        MobileImageUrl: this.adminImgM[0].url,
        browseCount: parseInt(this.addPeople) > 0 ? parseInt(this.addPeople) : 0,
        browseCountType: this.peopleNumber,
      };
      addCourseSenior(formData)
        .then((res) => {
          if (res.ResponseData === "true") {
            this.$message({
              type: "success",
              message: "课程已添加!",
            });
            if (this.Courselevel === 1) {
              this.$router.push({
                name: "academy-course-list",
                params: { showType: 2 },
              });
            }
            if (this.Courselevel === 2) {
              this.$router.push({
                name: "academy-course-list",
                params: { showType: 3 },
              });
            }
          } else {
            this.$message({
              type: "warning",
              message: res.ResponseData,
            });
          }
        })
        .catch((err) => {
          this.$message.error("添加失败!");
        });
    },
    updataClass() {
      var params = {
        id: this.$route.query.courseId,
        courseType: this.Courselevel,
        courseTitle: this.classTitle,
        isOnline: parseInt(this.permissions),
        createUserId: this.CreateUserId,
        isTop: 0,
        articleContent: this.editorValue,
        PcImageUrl: this.adminImgPC[0].url,
        MobileImageUrl: this.adminImgM[0].url,
        browseCount: parseInt(this.addPeople) > 0 ? parseInt(this.addPeople) : 0,
        browseCountType: this.peopleNumber,
      };
      updateCourse(params)
        .then((res) => {
          this.$message({
            type: "success",
            message: "课程修改成功!",
          });
          if (this.Courselevel === 1) {
            this.$router.push({
              name: "academy-course-list",
              params: { showType: 2 },
            });
          }
          if (this.Courselevel === 2) {
            this.$router.push({
              name: "academy-course-list",
              params: { showType: 3 },
            });
          }
        })
        .catch((err) => {
          this.$message.error("修改失败!");
        });
    },
  },
};
</script>
<style scoped lang="scss">
.advancedCourses {
  .main {
    background: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .el-input,
  .editorView {
    width: 50%;
  }
}
</style>
