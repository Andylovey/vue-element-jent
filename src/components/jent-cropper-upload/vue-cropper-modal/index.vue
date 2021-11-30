<template>
  <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false" :close-on-press-escape="false">
    <VueCropper
      ref="cropper"
      :img="options.img"
      :info="true"
      :original="true"
      :autoCrop="options.autoCrop"
      :autoCropWidth="options.autoCropWidth"
      :autoCropHeight="options.autoCropHeight"
      :fixedBox="options.fixedBox"
      :fixed="options.fixed"
      @realTime="realTime"
      @imgLoad="imgLoad"
      style="height: 300px"
    ></VueCropper>
    <div class="preview-wrapper">
      <div class="result-wrapper" :style="previews.div">
        <div class="tar-img">
          <img :src="previews.url" :style="previews.img" />
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "VueCropperModal",
  data() {
    return {
      options: {
        img: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        autoCrop: true, //是否默认生成截图框
        autoCropWidth: this.autoCropWidth, //默认生成截图框宽度
        autoCropHeight: this.autoCropHeight, //默认生成截图框高度
        fixedBox: true, //固定截图框大小 不允许改变
        fixed: false, // 是否开启截图框宽高固定比例
      },
      previews: {},
      fileInfo: {}
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
      required: false,
    },
    autoCropWidth: {
      type: Number,
      default: 200,
      required: false,
    },
    autoCropHeight: {
      type: Number,
      default: 160,
      required: false,
    },
  },

  methods: {
    handleCancel() {
      this.$emit("cancelModal");
    },
    handleConfirm() {
      this.$refs.cropper.getCropBlob((dataBolb) => {
        console.log("dataBolb", dataBolb);

        // 上传接口操作，向上暴露一些所需值
        this.$emit("confirmModal", {
            dataBolb,
            fileInfo: this.fileInfo
        });
      });

      
    },
    imgLoad(msg) {
      console.log("工具初始化函数=====" + msg);
    },
    realTime(data) {
      this.previews = data;
    },
    edit(record) {
    //   console.log("record", record);
      const { options } = this;
      this.options = Object.assign({}, options, record);
    },
    setInfo(info) {
      console.log("setInfo", info);
      this.fileInfo = info;
    },
  },
};
</script>

<style scoped>
.preview-wrapper {
  display: flex;
  justify-content: center;
}
.result-wrapper {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.tar-img {
  overflow: hidden;
}
</style>