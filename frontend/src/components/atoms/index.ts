import Btn from "./btn/btn.vue";
import Icon from "./icon/icon.vue";

const install = (Vue: any) => {
    Vue.component("btn", Btn);
    Vue.component("icon", Icon);
};

export { Btn, Icon };

export default install;
