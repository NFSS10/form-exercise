import Btn from "./btn/btn.vue";
import Card from "./card/card.vue";
import Icon from "./icon/icon.vue";

const install = (Vue: any) => {
    Vue.component("btn", Btn);
    Vue.component("card", Card);
    Vue.component("icon", Icon);
};

export { Btn, Card, Icon };

export default install;
