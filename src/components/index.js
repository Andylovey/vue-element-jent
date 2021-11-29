import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import JentButton from "./jent-button/index";

const components = [
    JentButton
]

const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}

export default {
    version: '1.0.0',
    install,
    JentButton
}