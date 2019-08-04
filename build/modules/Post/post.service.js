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
const post_model_1 = require("./post.model");
class PostService {
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return post_model_1.postModel.find();
        });
    }
    addPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const postObj = new post_model_1.postModel(data);
            return postObj.save();
        });
    }
}
exports.PostService = PostService;
