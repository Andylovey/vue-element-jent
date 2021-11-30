<template>
  <div>
    <el-upload
      class="avatar-cropper-uploader"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="handleAvatarChange"
      action=""
    >
      <img v-if="isHaveImageUrl && imageUrl" :src="imageUrl" class="avatar-cropper" />
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
      default: '',
      required: false,
    },
  },
  data() {
    return {
      dialogVisibleFlag: false,
      isHaveImageUrl: false
    };
  },
  methods: {
    handleAvatarChange(file) {
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
      //   const isJPG = file.raw.type === "image/jpeg";
      //   const isLt2M = file.raw.size / 1024 / 1024 < 2;

      //   if (!isJPG) {
      //     this.$message.error("上传头像图片只能是 JPG 格式!");
      //     return false;
      //   }
      //   if (!isLt2M) {
      //     this.$message.error("上传头像图片大小不能超过 2MB!");
      //     return false;
      //   }
    },
    handleCancelModal() {
      this.dialogVisibleFlag = false;
    //   this.isHaveImageUrl = false
    },
    handleConfirmModal(result) {
      this.dialogVisibleFlag = false;
      this.isHaveImageUrl = true
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