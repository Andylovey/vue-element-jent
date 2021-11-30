import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 图片裁剪
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)

import JentButton from "./jent-button/index";
import JentCropperUpload from "./jent-cropper-upload/index";

const components = [
    JentButton,
    JentCropperUpload
]

const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}

export default {
    version: '1.0.0',
    install,
    JentButton,
    JentCropperUpload
}