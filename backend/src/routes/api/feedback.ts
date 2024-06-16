import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    res.json({ success: true });
});

router.post("/", async (req, res) => {
    res.json({ success: true });
});

export { router };
