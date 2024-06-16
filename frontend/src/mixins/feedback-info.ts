import type { FeedbackType } from "@shared/types/feedback";
import { feedbackTypeValues } from "@shared/types/feedback";

export const feedbackInfoMixin = {
    methods: {
        feedbackIcon(feedbackType: FeedbackType) {
            if (!feedbackTypeValues.includes(feedbackType)) throw new Error(`Invalid feedback type: ${feedbackType}`);

            return feedbackType === "bug" ? "bug" : "suggestion";
        },
        postedAtText(timestamp: number) {
            const now = Date.now();
            const diffInMilliseconds = now - new Date(timestamp).getTime();
            const diffInMinutes = Math.floor(diffInMilliseconds / 60000);
            const diffInHours = Math.floor(diffInMinutes / 60);
            const diffInDays = Math.floor(diffInHours / 24);

            if (diffInMinutes < 60) return `${diffInMinutes}min ago`;
            else if (diffInHours < 24) return `${diffInHours}hrs ago`;
            else return `${diffInDays} days ago`;
        }
    }
};
