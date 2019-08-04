import { Request, Response, Application, NextFunction } from "express";
import { BaseCotroller } from '../BaseApi';

import { PostService } from './post.service'
import { IPost } from './post.type';


export class Post extends BaseCotroller{

  constructor() {
    super();
    this.init();
  }

  public register(express: Application): void {
    express.use('/api/post', this.router);
    express.use('/api/post/*', function send(req, res) { res.json(res.locals.data); });
  }

  public init(): void {
    this.router.get('/', this.listPosts);
    this.router.post('/create', this.addPost);
  }

  public async listPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const postService: PostService = new PostService();
      const posts: IPost[] = await postService.getAllPosts();
      res.locals.data = posts;
      return next();
    } catch (err) {
      res.locals.data = err;
      return next();
    }
  }

  public async addPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const postService: PostService = new PostService();
      const post: IPost = await postService.addPost(req.body);
      res.locals.data = post;
      console.log(post)
      return next();
    } catch (err) {
      console.log(err)
      res.locals.data = err;
      return next();
    }
  }
}