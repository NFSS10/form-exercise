import mongoose from "mongoose";

import { feedbackTypeValues } from "@shared/types/feedback";

const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    feedbackType: { type: String, required: true, enum: feedbackTypeValues },
    title: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export { feedbackSchema };
