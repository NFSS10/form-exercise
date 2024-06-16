import { Router } from "express";
import { z } from "zod";

import { Feedback, feedbackTypeValues } from "@shared/types/feedback";
import { ValidationError } from "@/utils/errors";
import { parseErrors } from "@/utils/validation";
import { FeedbackModel } from "@/lib/mongodb/models";

const router = Router();

router.get("/", async (req, res) => {
    const ValidationSchema = z.object({
        page: z.number().int().positive().default(1),
        pageSize: z.number().int().positive().max(100).default(20),
        name: z.string().optional(),
        type: z.enum(feedbackTypeValues).optional(),
        sort: z.enum(["name", "createdAt"]).default("createdAt")
    });

    const validation = ValidationSchema.safeParse({
        page: parseInt(req.query.page as string) || undefined,
        pageSize: parseInt(req.query.pageSize as string) || undefined,
        name: req.query.name as string,
        type: req.query.type as string,
        sort: req.query.sort as string
    });
    if (!validation.success) {
        const fieldErrors = parseErrors(validation.error);
        throw new ValidationError("Invalid query", fieldErrors);
    }

    const { page, pageSize, name, sort } = validation.data;

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const filter: any = {};
    if (name) filter.name = { $regex: name, $options: "i" };

    const totalFeedbackEntries = await FeedbackModel.countDocuments(filter);
    const totalPages = Math.ceil(totalFeedbackEntries / pageSize);

    const feedbackEntries = await FeedbackModel.find(filter)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({ [sort]: 1 });

    const entries: Feedback[] = feedbackEntries.map(entry => ({
        id: entry.id,
        name: entry.name,
        email: entry.email,
        feedbackType: entry.feedbackType,
        message: entry.message,
        createdAt: entry.createdAt.getTime()
    }));
    res.json({
        entries: entries,
        currentPage: page,
        totalPages: totalPages
    });
});

router.post("/", async (req, res) => {
    const ValidationSchema = z.object({
        name: z.string().trim().min(1),
        email: z.string().trim().email(),
        feedbackType: z.enum(feedbackTypeValues),
        message: z.string().trim().min(1)
    });

    const validation = ValidationSchema.safeParse(req.body);
    if (!validation.success) {
        const fieldErrors = parseErrors(validation.error);
        throw new ValidationError("Invalid feedback", fieldErrors);
    }

    const newFeedback = new FeedbackModel(validation.data);
    await newFeedback.save();

    const feedback: Feedback = {
        id: newFeedback.id,
        name: newFeedback.name,
        email: newFeedback.email,
        feedbackType: newFeedback.feedbackType,
        message: newFeedback.message,
        createdAt: newFeedback.createdAt.getTime()
    };
    res.json(feedback);
});

export { router };
