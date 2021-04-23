<template>
  <div class="productBox">
    <el-row class="productTitle">
      <el-col :span="24"
        ><h3>{{ ProductConfig.viewTitle }}</h3></el-col>
    </el-row>
    <div class="productContent">
      <el-collapse class="productBasics">
        <el-form
          ref="ruleForm"
          :model="ruleForm  "
          :rules="rules"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-collapse-item
            :title="ProductConfig.typeView == 1 ? '基本信息设置' : '基本信息'"
            name="1"
          >
            <el-form-item
              label="所属站点："
              prop="region"
              v-if="ProductConfig.typeView == 1"
            >
              <el-select v-model="ruleForm.region" placeholder="---请选择---">
                <el-option label="US" value="US" />
                <el-option label="UK" value="UK" />
                <el-option label="JP" value="JP" />
              </el-select>
            </el-form-item>
            <el-form-item
              label="产品ASIN："
              prop="name"
              v-if="ProductConfig.typeView == 1"
            >
              <el-input
                v-model="ruleForm.name"
                placeholder="例如：B08BC555ZK"
              />
            </el-form-item>
            <el-form-item label="产品标题：" prop="name">
              <el-input
                v-model=" ruleForm.name"
                placeholder="例如：Jinglive-Multifunction-Crafting-Knitting-Accessories"
                :disabled="ProductConfig.typeView == 3 ? true :false"
              />
            </el-form-item>

            <el-form-item
              label="产品主图："
              prop="name"
              v-if="ProductConfig.typeView == 1"
            >
              <el-upload
                ref="upload"
                :limit="1"
                action=""
                class="avatar-uploader"
                :show-file-list="false"
                :data="data"
                :on-change="handlePreview"
                :auto-upload="false"
                :on-success="upSuccess"
              >
                <img
                  v-if="ruleForm.imgUrl"
                  :src="ruleForm.imgUrl"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
            <el-form-item label="产品描述：" prop="name">
              <editor
                id="tinymce"
                 v-model="ruleForm.JobDuty"
                :init="editorConfig"
                 :disabled="ProductConfig.typeView == 3 ? true :false"
              ></editor>
            </el-form-item>
            <el-form-item label="产品关键词：" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请用英文填写" />
              <span class="colorRed"
                >提示：每次只能推广一个产品关键字，需要更换产品关键字请再次进入该编辑页面修改并保存</span>
            </el-form-item>
             <el-form-item label="品牌名：" prop="name" v-if="ProductConfig.typeView == 2">
              <el-input v-model="ruleForm.name"  />
            </el-form-item>
            <el-form-item label="产品类别：" prop="region">
              <el-select v-model="ruleForm.region" placeholder="---请选择---" :disabled="ProductConfig.typeView == 3 ? true :false">
              </el-select>
              <p class="colorRed">
                提示：选择相对应的品类更有利于您的产品送测，请勿错误对应。
              </p>
            </el-form-item>

            <el-form-item label="Support Email："  v-if="ProductConfig.typeView == 3">
                <el-input v-model="ruleForm.name"  :disabled="true"/>
            </el-form-item>
             <el-form-item label="Merchant ID：" prop="region" v-if="ProductConfig.typeView == 3">
                <el-input v-model="ruleForm.name"  :disabled="true"/>
            </el-form-item>
            <el-form-item
              label="展示商品："
              prop="region"
              v-if="ProductConfig.typeView == 2"
            >
              <el-select v-model="ruleForm.region"> </el-select>
            </el-form-item>
            <el-form-item
              label="MerchantCode："
              prop="region"
              v-if="ProductConfig.typeView == 2"
            >
              <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="店铺ID：" prop="name">
              <el-input
                v-model="ruleForm.name"
                placeholder="例如：A2WMV7OOM3LJ0X"
              />
              <span class="hintMsg" @click="centerDialogVisible = true"
                >怎么获取店铺ID？</span
              >
            </el-form-item>
            <el-form-item label="物流方式：" prop="region" >
              <el-select v-model="ruleForm.region" placeholder="---请选择---" :disabled="ProductConfig.typeView == 3 ? true :false">
                <el-option
                  label="Fulfilled by Amazon"
                  value="Fulfilled by Amazon"
                />
                <el-option
                  label="Fulfilled by Merchant"
                  value="Fulfilled by Merchant"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="剩余试用：" prop="region" v-if="ProductConfig.typeView == 3">
                <el-input v-model="ruleForm.name"  :disabled="true"/>
            </el-form-item>
             <el-form-item label="免评剩余试用：" prop="region" v-if="ProductConfig.typeView == 3">
                <el-input v-model="ruleForm.name"  :disabled="true"/>
            </el-form-item>
            <el-form-item label="产品规格：" v-if="ProductConfig.typeView != 3">
              <el-input
                v-model="ruleForm.name"
                placeholder="请用英文填写，如：Color:blue,Size:M"
              />
              <span class="colorRed"
                >填写您要送测的产品的具体规格信息，防止买家买错产品。</span
              >
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="价格设置" v-if="ProductConfig.typeView == 2">
            <el-form-item label="销售价：">
              <el-input v-model.number="ruleForm.number">
                <i slot="suffix" style="font-style: normal; margin-right: 10px" >USD</i ></el-input>
            </el-form-item>
            <el-form-item label="返现：">
              <el-input v-model.number="ruleForm.number" :disabled="true">
                <i slot="suffix" style="font-style: normal; margin-right: 10px" >USD</i ></el-input>
            </el-form-item>
            <el-form-item label="买家应付：">
              <el-input v-model.number="ruleForm.number" :disabled="true">
                <i slot="suffix" style="font-style: normal; margin-right: 10px" >USD</i ></el-input>
                 <span class="colorRed">请确认该价格是否为商品在亚马逊的售价，如您调整了商品在亚马逊的售价，请及时在系统进行更新，以免返现金额不正确。</span>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="留评送测设置" v-if="ProductConfig.typeView == 2">
                <el-form-item label="总推广数量：">
              <el-input v-model.number="ruleForm.number" :disabled="true"></el-input>
            </el-form-item>
             <el-form-item label="已申请数量：">
              <el-input v-model.number="ruleForm.number" :disabled="true"></el-input>
            </el-form-item>
             <el-form-item label="可申请数量：">
              <el-input v-model.number="ruleForm.number"></el-input>
            </el-form-item>
            <el-form-item label="每日上限数量：">
              <el-input v-model.number="ruleForm.number"></el-input>
            </el-form-item>
            <el-form-item label="今日剩余数量：">
              <el-input v-model.number="ruleForm.number" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="今日已送数量：">
              <el-input v-model.number="ruleForm.number" :disabled="true"></el-input>
            </el-form-item>
            <div style="display:flex">
              <div style="width:150px;line-height: 36px;color: #606266;font-weight: 700;vertical-align: middle;text-indent: 44px;">
                <span>账户资金信息：</span>
              </div>
              <div>
                <p>1. 账户剩余可用资金：999977676.99$; 账户剩余可用e币：957242;</p>
                <p>2. 推广该产品最少需要资金：200.00$; 推广该产品最少需要e币：300.00;</p>
              </div>
            </div>
            </el-collapse-item>
             <el-collapse-item title="免评送测设置（设置后商品参加免评送测推广，无留评信息）" v-if="ProductConfig.typeView == 2">
                <el-form-item label="总推广数量：">
              <el-input v-model.number="ruleForm.number" :disabled="true"></el-input>
            </el-form-item>
             <el-form-item label="已申请数量：">
              <el-input v-model.number="ruleForm.number" :disabled="true"></el-input>
            </el-form-item>
             <el-form-item label="可申请数量：">
              <el-input v-model.number="ruleForm.number"></el-input>
            </el-form-item>
            <el-form-item label="每日上限数量：">
              <el-input v-model.number="ruleForm.number"></el-input>
            </el-form-item>
            <el-form-item label="今日剩余数量：">
              <el-input v-model.number="ruleForm.number" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="今日已送数量：">
              <el-input v-model.number="ruleForm.number" :disabled="true"></el-input>
            </el-form-item>
            <div style="display:flex">
              <div style="width:150px;line-height: 36px;color: #606266;font-weight: 700;vertical-align: middle;text-indent: 44px;">
                <span>账户资金信息：</span>
              </div>
              <div>
                <p>1. 账户剩余可用资金：999977676.99$; 账户剩余可用e币：957242;</p>
                <p>2. 推广该产品最少需要资金：200.00$; 推广该产品最少需要e币：300.00;</p>
              </div>
            </div>
            </el-collapse-item>
             <el-collapse-item title="备注信息" v-if="ProductConfig.typeView == 2" >
               <el-form-item label="备注：" placeholder="请填写该产品备注" >
                <el-input v-model="ruleForm.name" maxlength="60"></el-input>
            </el-form-item>
              </el-collapse-item>
              <el-collapse-item title="折扣信息：返现" v-if="ProductConfig.typeView == 3" >
               <el-form-item label="销售价："  >
                <el-input v-model="ruleForm.number" :disabled="true"></el-input>
            </el-form-item>
             <el-form-item label="返现："  >
                <el-input v-model="ruleForm.number" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="买家应付："  >
                <el-input v-model="ruleForm.number" :disabled="true"></el-input>
            </el-form-item>
              </el-collapse-item>
        </el-form>
      </el-collapse>

      <!-- 返回  添加（修改的按钮） -->
      <div class="btnBox">
        <el-row>
          <el-col :span="4" :offset="4">
            <el-button type="primary" @click.prevent="exit">{{
              ProductConfig.typeView == 1
                ? "取消"
                : ProductConfig.typeView == 2
                ? "取消操作"
                : ProductConfig.typeView == 3
                ? "返回"
                : ""
            }}</el-button>
          </el-col>
          <el-col
            :span="4"
            :offset="4"
            v-if="ProductConfig.typeView > 0 && ProductConfig.typeView < 3"
          >
            <el-button type="primary" @click.prevent="submit">{{
              ProductConfig.typeView == 1
                ? "保存产品"
                : ProductConfig.typeView == 2
                ? "保存信息"
                : ""
            }}</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 如何获取到店铺ID提示弹框 -->
    <el-dialog
      title="如何获取店铺ID?"
      :visible.sync="centerDialogVisible"
      :close-on-click-modal="false"
      width="30%"
      center
      class="prodctViewDialog"
      :show-close="false"
    >
      <p>
        如果有多个店铺同时销售您所推广的产品，买家有可能在下单时下错店铺。因此需要准确填写您的店铺ID。
      </p>
      <p>您可以通过以下方式获取您的推广产品所属的店铺ID：</p>
      <p>
        <span class="colorRed">第一步:</span
        >打开您当前推广产品的亚马逊前台详情页，并点击您的店铺名称，如下图：
      </p>
      <p>
        <span class="colorRed"> 第二步:</span
        >点击店铺名称进入店铺前台后，在地址栏中找到“seller=”后面的那串编码，对应的就是店铺ID，如下图：
      </p>
      <p>
        <span class="colorRed">第三步:</span
        >鼠标双击“seller=”后面的那串编码，复制并粘贴到输入框即可。
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import "@/assets/tinymce/tinymce.min.js";
import "@/assets/tinymce/langs/zh_CN.js";
import "@/assets/tinymce/themes/silver/theme.min.js";
import "@/assets/tinymce/icons/default/icons.min.js";
import "@/assets/tinymce/plugins/advlist/plugin.min.js";
import "@/assets/tinymce/plugins/autolink/plugin.min.js";
import "@/assets/tinymce/plugins/lists/plugin.min.js";
import "@/assets/tinymce/plugins/link/plugin.min.js";
import "@/assets/tinymce/plugins/anchor/plugin.min.js";
import "@/assets/tinymce/plugins/paste/plugin.min.js";
export default {
  //// typeView 1:添加  2:修改  3:查看
  props: ["ProductConfig"],
  components: {
    editor: Editor,
  },
  data() {
    return {
      data: {},
      centerDialogVisible: false,
      ruleForm: {
        region: null,
        name: "",
        imgUrl: "",
        JobDuty: "",
        number: 0,
      },
      rules: {},
      editorConfig: {
        width: "100%",
        height: "400",
        theme: "silver", // 主题 必须引入
        skin_url: "https://help.pingjiae.com/Public/tinymce/skins/ui/oxide", // 主题路径
        language: "zh_CN", // 设置富文本编辑器语言
        content_css:
          "https://help.pingjiae.com/Public/tinymce/skins/content/default/content.min.css", // 富文本编辑器内容区域样式
        fontsize_formats: "12px 14px 16px 18px 20px", // 工具栏自定义字体大小选项
        plugins: "lists link paste",
        elementpath: true, // 编辑器底部的状态栏
        menubar: false, // 最上方menu
        branding: false, // 去底部tinymce水印链接
        toolbar:
          " undo redo | bold italic underline strikethrough link | fontsizeselect forecolor align | bullist numlist", // 工具栏配置
      },
    };
  },
  created() {},
  methods: {
    // 上传图片发生改变触发的方法
    handlePreview() {},
    // 图片上传成功触发的方法
    upSuccess() {
      this.$refs.upload.clearFiles(); //清除上传图片本地缓存
    },
    //返回到商品列表页
    exit() {
      this.$emit("toProductList");
    },
    submit(){
      console.log(this.ruleForm)
    }
  },
};
</script>

<style lang="scss">
.productBox {
  .hintMsg {
    color: #409eff;
  }
  .hintMsg:hover {
    cursor: pointer;
  }
  .colorRed {
    color: red;
  }
  .productTitle {
    background-color: #4ba3d3;
    padding-left: 10px;
  }
  .productTitle h3 {
    color: white !important;
  }
  .productBox {
    background-color: white;
  }
  .productContent {
    width: 100%;
  }
  .productBasics {
    width: 98%;
    margin-left: 1%;
    margin-right: 1%;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .prodctViewDialog {
    .el-dialog__header {
      background-color: #4ba3d3 !important;
      .el-dialog__title {
        color: white !important;
      }
    }
  }
  .btnBox {
    margin-top: 20px;
  }
}
</style>

