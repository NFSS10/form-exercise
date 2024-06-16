type Feedback = {
    id: string;
    name: string;
    email: string;
    feedbackType: FeedbackType;
    message: string;
    createdAt: number;
}

const feedbackTypeValues = ["bug", "suggestion"] as const;
type FeedbackType = typeof feedbackTypeValues[number];

export type { FeedbackType, Feedback };
export { feedbackTypeValues };
