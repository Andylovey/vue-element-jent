<template>
  <el-button 
    v-bind="$attrs" 
    v-on="$listeners" 
    :style="{color}"
  >
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: "JentButton",
  props: {
    color: {
      type: String,
      default: "",
      required: false,
    },
  },
};
</script>