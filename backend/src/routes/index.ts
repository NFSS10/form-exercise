import { Express } from "express";

import { router as api } from "./api";

const routes = (app: Express): void => {
    app.use("/api", api);
};

export { routes };
