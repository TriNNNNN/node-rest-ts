"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_controller_1 = require("./modules/post/post.controller");
function registerRoutes(app) {
    new post_controller_1.Post().register(app);
}
exports.registerRoutes = registerRoutes;
