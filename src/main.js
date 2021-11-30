import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 调试
import VueElementJent from './components/index'
Vue.use(VueElementJent)
// 图片裁剪
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
