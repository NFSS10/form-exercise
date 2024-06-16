import { Router } from "express";

import { router as feedback } from "./feedback";

const router = Router();
router.use("/feedback", feedback);

export { router };
