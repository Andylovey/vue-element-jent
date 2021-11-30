# vue-element-jent

基于element开发的组件库

# 注意
先执行npm init 写入入口文件 否则可能会下载包并使用的时候会报错找不到包

npm address

## 发布包
npm publish

## 更新包
修改package.json的version
npm publish


# 使用方式
yarn add vue-element-jent

import VueElementJent from 'vue-element-jent'
Vue.use(VueElementJent)

# 组件信息

1.jent-button 新增了 color 属性

2.jent-cropper-upload 新增了支持上传图片时做裁剪

<JentCropperUpload
    :autoCropWidth="120"
    :autoCropHeight="120"
    @confirmCropper="hanldeConfirmCropper"
    :imageUrl="imageUrl"
    :accept="['jpg','png','jpeg']"
    :allowMaxSize="3"
></JentCropperUpload>

autoCropWidth：生成截图框宽度
autoCropHeight: 生成截图框高度
confirmCropper：确定上传事件
imageUrl：确定上传后生成的图片路径
accept: 允许上传的类型
allowMaxSize： 允许上传的大小（M）
