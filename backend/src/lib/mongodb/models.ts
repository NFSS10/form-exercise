import mongoose from "mongoose";

import { feedbackSchema } from "./schemas";

const FeedbackModel = mongoose.model("Feedback", feedbackSchema);

export { FeedbackModel };
