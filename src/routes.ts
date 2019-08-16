import * as express from "express";

import { Post } from "./modules/post/post.controller";
import { User } from "./modules/user/user.controller";
import { Vote } from "./modules/vote/vote.controller";
import { AuthController } from "./modules/auth/auth.controller";


export function registerRoutes(app: express.Application): void {
    new Post().register(app);
    new User().register(app);
    new AuthController().register(app);
    new Vote().register(app);

}