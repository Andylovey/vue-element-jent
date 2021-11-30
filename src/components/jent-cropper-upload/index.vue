<template>
  <div>
    <el-upload
      class="avatar-cropper-uploader"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="handleAvatarChange"
      action=""
    >
      <img
        v-if="isHaveImageUrl && imageUrl"
        :src="imageUrl"
        class="avatar-cropper"
      />
      <i v-else class="el-icon-plus avatar-cropper-uploader-icon"></i>
    </el-upload>
    <VueCropperModal
      ref="VueCropperModal"
      :dialogVisible="dialogVisibleFlag"
      @cancelModal="handleCancelModal"
      @confirmModal="handleConfirmModal"
      :autoCropWidth="autoCropWidth"
      :autoCropHeight="autoCropHeight"
    />
  </div>
</template>

<script>
import VueCropperModal from "./vue-cropper-modal/index.vue";

export default {
  name: "JentCropperUpload",
  components: {
    VueCropperModal,
  },
  props: {
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
    imageUrl: {
      type: String,
      default: "",
      required: false,
    },
    accept: {
      type: Array,
      default: () => ["jpg", "png", "jpeg", "gif", "webp"],
      require: false,
    },
    allowMaxSize: {
      type: Number,
      require: false,
    },
  },
  data() {
    return {
      dialogVisibleFlag: false,
      isHaveImageUrl: false,
    };
  },
  methods: {
    handleAvatarChange(file) {
      const picType = file.raw.type;
      let isIncludesType = this.accept.some((element) => {
        return picType === `image/${element}`;
      });

      if (!isIncludesType) {
        this.$message.error("请上传正确的图片格式");
        return false;
      }

      if (this.allowMaxSize) {
        const isLt = file.raw.size / 1024 / 1024 < this.allowMaxSize;
        if (!isLt) {
          this.$message.error(`上传头像图片大小不能超过 ${this.allowMaxSize} MB!`);
          return false;
        }
      }

      this.$refs.VueCropperModal.setInfo(file);
      this.getBase64(file.raw, (_imageUrl) => {
        const target = Object.assign(
          {},
          {
            img: _imageUrl,
          }
        );
        this.dialogVisibleFlag = true;
        this.$refs.VueCropperModal.edit(target);
      });
    },
    handleCancelModal() {
      this.dialogVisibleFlag = false;
      //   this.isHaveImageUrl = false
    },
    handleConfirmModal(result) {
      this.dialogVisibleFlag = false;
      this.isHaveImageUrl = true;
      this.$emit("confirmCropper", result);
    },
    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    },
  },
};
</script>

<style>
.avatar-cropper-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-cropper-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-cropper-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-cropper {
  width: 178px;
  height: 178px;
  display: block;
}
</style>