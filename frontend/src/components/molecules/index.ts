import FeedbackItem from "./feedback-item/feedback-item.vue";
import Pagination from "./pagination/pagination.vue";

const install = (Vue: any) => {
    Vue.component("feedback-item", FeedbackItem);
    Vue.component("pagination", Pagination);
};

export { FeedbackItem, Pagination };

export default install;
