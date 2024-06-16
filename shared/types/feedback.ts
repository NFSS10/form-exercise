type Feedback = {
    id: string;
    name: string;
    email: string;
    feedbackType: FeedbackType;
    title: string;
    message: string;
    createdAt: number;
}

const feedbackTypeValues = ["bug", "suggestion"] as const;
type FeedbackType = typeof feedbackTypeValues[number];

type FeedbackCreatePayload = {
    name: string;
    email: string;
    feedbackType: FeedbackType;
    title: string;
    message: string;
}

export type { FeedbackType, Feedback, FeedbackCreatePayload };
export { feedbackTypeValues };
