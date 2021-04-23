<template>
  <div class="tinymce-container">
    <textarea :id="tinymceId" ref="textarea" class="tinymce-textarea" />
  </div>
</template>

<script>
import axios from 'axios'

import '@/assets/tinymce/tinymce.min.js'
import '@/assets/tinymce/langs/zh_CN.js'
import '@/assets/tinymce/themes/silver/theme.min.js'
import '@/assets/tinymce/icons/default/icons.min.js'
import '@/assets/tinymce/plugins/advlist/plugin.min.js'
import '@/assets/tinymce/plugins/autolink/plugin.min.js'
import '@/assets/tinymce/plugins/lists/plugin.min.js'
import '@/assets/tinymce/plugins/link/plugin.min.js'
import '@/assets/tinymce/plugins/anchor/plugin.min.js'
import '@/assets/tinymce/plugins/paste/plugin.min.js'
import '@/assets/tinymce/plugins/image/plugin.min.js'
import '@/assets/tinymce/plugins/imagetools/plugin.min.js'
import '@/assets/tinymce/plugins/preview/plugin.min.js'
import '@/assets/tinymce/plugins/emoticons/plugin.min.js'

export default {
  name: 'Tinymce',
  props: {
    id: {
      type: String,
      default: function () {
        return (
          'vue-tinymce-' +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + '')
        )
      },
    },
    value: {
      type: String,
      default: '',
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360,
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto',
    },
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || '')
        )
      }
    },
  },
  mounted() {
    this.init()
  },
  created() {
    this.$on('change', (content) => {
      tinyMCE.activeEditor.setContent(content)
    })
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  beforeDestroy() {
    this.$off('change')
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    init() {
      this.initTinymce()
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        emoticons_database_url: '/tinymce/plugins/emoticons/js/emojis.min.js',
        emoticons_images_url:
          '/tinymce/plugins/emoticons/js/emojiimages.min.js',
        theme: 'silver', // 主题 必须引入
        skin_url: '/tinymce/skins/ui/oxide', // 主题路径
        language: 'zh_CN', // 设置富文本编辑器语言
        content_css: '/tinymce/skins/content/default/content.min.css', // 富文本编辑器内容区域样式
        fontsize_formats: '12px 14px 16px 18px 20px', // 工具栏自定义字体大小选项
        plugins: 'preview lists link paste image imagetools emoticons',
        elementpath: true, //编辑器底部的状态栏
        menubar: false, // 最上方menu
        branding: false, // 去底部tinymce水印链接
        toolbar:
          'preview | undo redo | bold italic underline strikethrough emoticons link image imagetools | fontselect formatselect fontsizeselect forecolor align | bullist numlist', // 工具栏配置
        height: this.height,
        body_class: 'panel-body',
        object_resizing: false,
        init_instance_callback: (editor) => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        images_upload_handler: function (blobInfo, success, failure) {
          let uploadData = new FormData()
          uploadData.append('formFile', blobInfo.blob(), blobInfo.filename())
          uploadData.append('Platform', 'Image_')
          uploadData.append('UserId', '')

          axios
            .post(
              'https://api.trialimg.com/api/ImgUpload/ImageUpload',
              uploadData
            )
            .then(function (res) {
              success(res.data.result)
            })
        },
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      this.$nextTick(() => {
        window.tinymce.get(this.tinymceId).setContent(value)
      })
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
  },
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
