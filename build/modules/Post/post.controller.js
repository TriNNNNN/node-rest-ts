"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseApi_1 = require("../BaseApi");
const post_service_1 = require("./post.service");
class Post extends BaseApi_1.BaseCotroller {
    constructor() {
        super();
        this.init();
    }
    register(express) {
        express.use('/api/post', this.router);
        express.use('/api/post/*', function send(req, res) { res.json(res.locals.data); });
    }
    init() {
        this.router.get('/', this.listPosts);
        this.router.post('/create', this.addPost);
    }
    listPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postService = new post_service_1.PostService();
                const posts = yield postService.getAllPosts();
                res.locals.data = posts;
                return next();
            }
            catch (err) {
                res.locals.data = err;
                return next();
            }
        });
    }
    addPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postService = new post_service_1.PostService();
                const post = yield postService.addPost(req.body);
                res.locals.data = post;
                console.log(post);
                return next();
            }
            catch (err) {
                console.log(err);
                res.locals.data = err;
                return next();
            }
        });
    }
}
exports.Post = Post;
