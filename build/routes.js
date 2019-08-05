"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_controller_1 = require("./modules/post/post.controller");
const user_controller_1 = require("./modules/user/user.controller");
const auth_controller_1 = require("./modules/auth/auth.controller");
function registerRoutes(app) {
    new post_controller_1.Post().register(app);
    new user_controller_1.User().register(app);
    new auth_controller_1.AuthController().register(app);
}
exports.registerRoutes = registerRoutes;
