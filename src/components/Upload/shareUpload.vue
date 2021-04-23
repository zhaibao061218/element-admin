<template>
  <div>
    <el-upload
      list-type="picture-card"
      action="https://api.trialimg.com/api/ImgUpload/ImageUpload"
      :file-list="fileList"
      name="formFile"
      :data="{ Platform: 'Image_', UserId: '' }"
      :multiple="true"
      :limit="limit"
      :before-upload="beforeUpload"
      :on-success="handleImageSuccess"
      :on-exceed="overNumber"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i slot="default" class="el-icon-plus"></i>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import { Message } from "element-ui";
// import { number } from 'node_modules/echarts/lib/export';
//import  {updateImg} from '@/api/course'
export default {
  props: {
    width: {
      type: String,
      default: 300,
    },
    height: {
      type: String,
      default: 300,
    },
    limit: {
      type: Number,
      default: 1,
    },
    picSrc: {
      type: String,
    },
    picSrcArr: {
      type: Array,
    },
    value: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },
  computed: {
    fileList() {
      return this.value
    },
  },
  mounted() {},
  methods: {
    emitInput(val) {
      this.fileList.push({
        url: val,
      });
      this.$emit("input", this.fileList);
    },
    handleImageSuccess(response, file, fileList) {
      this.$message({
        type: "success",
        message: "图片上传成功!",
      });
      //
      this.emitInput(response.result);
    },
    handleRemove(file, fileList) {
      for(var i=0; i<this.fileList.length;i++){
          if(this.fileList[i].url==file.url){
            this.fileList.splice(i,1)
          }
      }
      this.$emit("input", this.fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isSvg = file.type === "image/svg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG && !isSvg) {
        this.$message.error("上传头像图片只能是 JPG/PNG/SVG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      var _this = this;
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (event) {
          var image = new Image();
          image.onload = function () {
            var width = parseInt(_this.width);
            var height = parseInt(_this.height);
            if (image.width !== width || image.height !== height) {
              _this.$message.error(`图片尺寸必须等于${width}*${height}!`);
              reject();
            }
            resolve();
          };
          image.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
    },
    overNumber() {
      this.$message.error(`超出图片上传个数!`);
    },
  },
};
</script>
<style lang="scss" scoped></style>
