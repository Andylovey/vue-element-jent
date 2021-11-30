<template>
  <div id="app">
    <JentButton>1</JentButton>
    <JentCropperUpload
      :autoCropWidth="200"
      :autoCropHeight="160"
      @confirmCropper="hanldeConfirmCropper"
      :imageUrl="imageUrl"
      :accept="['jpg','png','jpeg']"
      :allowMaxSize="3"
    ></JentCropperUpload>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      imageUrl: "",
    };
  },
  methods: {
    hanldeConfirmCropper(result) {
      console.log("result", result);
      this.imageUrl =
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
