import * as express from "express";

import { Post } from "./modules/post/post.controller";

export function registerRoutes(app: express.Application): void {
    new Post().register(app);
}