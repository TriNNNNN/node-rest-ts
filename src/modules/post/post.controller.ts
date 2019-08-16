import { Request, Response, Application, NextFunction } from "express";
import { BaseCotroller } from '../baseApi';

import { PostService } from './post.service';
import { UserService } from '../user/user.service';
import { IPost } from './post.type';
import { IUser } from '../user/user.type';
import { AuthHelper } from '../../helpers/AuthHelper';
import userDefinedError  from '../../exceptions/error.handler';
import { postRules } from './post.rules';


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
    const authHelper: AuthHelper = new AuthHelper();
    this.router.get('/',authHelper.guard, this.listPosts);
    this.router.post('/create', postRules.createPost, 
    authHelper.validation, this.addPost);
  }

  public listPosts = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postService: PostService = new PostService();
      const posts: IPost[] = await postService.getAllPosts();
      res.locals.data = posts;
      return next();
    } catch (err) {
      next(new userDefinedError(404, err.message, err))
    }
  }

  public addPost = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const postService: PostService = new PostService();
      const userService: UserService = new UserService();
      let user: IUser = await userService.getUserByEmail(req.body.email);
      if (user !== null) {
        const post: IPost = await postService.addPost(req.body);
        userService.updateUserPost(user, post._id)
        res.locals.data = post;
        return next();
      } else {
        next(new userDefinedError(404, 'user doesnt exists'))
      }
    } catch (err) {
      next(new userDefinedError(404, 'err.message'))
    }
  }
}