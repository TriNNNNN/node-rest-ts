"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class PostRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getPost(req, res) {
        res.send('Came Inside getPose');
        console.log('Came Inside getPost');
    }
    getPosts() { }
    createPost() { }
    updatePost() { }
    deletePost() { }
    routes() {
        this.router.get('/api/post', this.getPost);
    }
}
const postRoutes = new PostRoutes();
exports.default = postRoutes.router;
