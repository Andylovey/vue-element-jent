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