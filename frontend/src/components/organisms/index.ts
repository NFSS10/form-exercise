import FeedbackContent from "./feedback-content/feedback-content.vue";
import FeedbackList from "./feedback-list/feedback-list.vue";
import FormNewFeedback from "./forms/form-new-feedback.vue";

const install = (Vue: any) => {
    Vue.component("feedback-content", FeedbackContent);
    Vue.component("feedback-list", FeedbackList);
    Vue.component("form-new-feedback", FormNewFeedback);
};

export { FeedbackContent, FeedbackList, FormNewFeedback };

export default install;
