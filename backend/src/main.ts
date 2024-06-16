import "dotenv/config";
import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import { routes } from "@/routes";
import { NotFoundError, ValidationError } from "@/utils/errors";

const buildExpressApp = (): Express => {
    const app = express();

    app.use(express.json());

    routes(app);

    app.use(onGlobalErrorCatch);

    return app;
};

const initDatabase = async (): Promise<void> => {
    const uri = process.env.MONGODB_URI ?? null;
    if (!uri) throw new Error("MongoDB URI not found");

    await mongoose.connect(uri);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onGlobalErrorCatch = (error: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(`[ENDPOINT ERROR] ${error}`);

    let code = 500;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const resBody: any = { message: "Internal server error" };

    if (error instanceof NotFoundError) {
        code = 404;
        resBody.message = error.message;
    } else if (error instanceof ValidationError) {
        code = 400;
        resBody.message = error.message;
        resBody.errors = error.fieldErrors;
    }

    res.status(code).json(resBody);
};

(async (): Promise<void> => {
    await initDatabase();

    const app = buildExpressApp();

    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`PORT: ${port}\nServer started!`));
})();
