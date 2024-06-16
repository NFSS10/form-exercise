import FeedbackItem from "./feedback-item/feedback-item.vue";

const install = (Vue: any) => {
    Vue.component("feedback-item", FeedbackItem);
};

export { FeedbackItem };

export default install;
