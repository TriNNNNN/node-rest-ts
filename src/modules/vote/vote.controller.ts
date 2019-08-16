import { Request, Response, Application, NextFunction } from "express";
import { BaseCotroller } from '../baseApi';
import { AuthHelper } from '../../helpers/AuthHelper';

import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';
import { VoteService } from '../vote/vote.service';

import { IUser } from '../user/user.type';
import { IPost } from '../post/post.type';
import { IVote } from './vote.type';

import userDefinedError  from '../../exceptions/error.handler';


export class Vote extends BaseCotroller{

  constructor() {
        super();
        this.init();
    }

    public register(express: Application): void {
        express.use('/api/vote', this.router);
        express.use('/api/vote/*', function send(req, res) { res.json(res.locals.data); });
    }

    public init(): void {
        const authHelper: AuthHelper = new AuthHelper();
        this.router.post('/upvote', this.upVotePost);
        this.router.post('/downvote', this.downVotePost);
        this.router.get('/', this.getVotes);

    }

    public upVotePost = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const voteData: any = req.body;
            const userService: UserService = new UserService();
            const postService: PostService = new PostService();
            const voteService: VoteService = new VoteService();

            let user: IUser = await userService.getUserByEmail(req.body.email);
            voteData.byUser = user._id
            let post: IPost = await postService.getPostById(req.body.postId);
            if(user && post) {
                let vote: any = await voteService.findVote(voteData);
                if(vote.length > 0) {
                    vote.map( (voteItem: any) => {
                        voteData.upVote += voteItem.upVote ? voteItem.upVote : 0 
                    })
                    voteData.voteId = vote[0]._id
                }
                let upVoteResp: any = await voteService.findUpdateOrCreate(voteData);
                res.locals.data = upVoteResp;
                return next();
            } else {
                next(new userDefinedError(404, 'Invalid user / post'))
            }

        } catch (err) {
            next(new userDefinedError(404, err.message))
        }
    }

    public downVotePost = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const voteData: IVote = req.body;
            const userService: UserService = new UserService();
            const postService: PostService = new PostService();
            const voteService: VoteService = new VoteService();

            let user: IUser = await userService.getUserByEmail(req.body.email);
            voteData.byUser = user._id
            let post: IPost = await postService.getPostById(req.body.postId);
            if(user && post) {
                let vote: any = await voteService.findVote(voteData);
                if(vote.length > 0) {
                    vote.map( (voteItem: any) => {
                        voteData.downVote += voteItem.downVote ? voteItem.downVote : 0
                    })
                    voteData.voteId = vote[0]._id
                }
                let downVoteResp: any = await voteService.findUpdateOrCreate(voteData);
                res.locals.data = downVoteResp;
                return next();
            } else {
                next(new userDefinedError(404, 'Invalid user / post'))
            }

        } catch (err) {
            next(new userDefinedError(404, err))
        }
    }

    public getVotes = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const voteService: VoteService = new VoteService();
          const votes: IVote[] = await voteService.getAllVotes();
          res.locals.data = votes;
          return next();
        } catch (err) {
          res.locals.data = err;
          next(new userDefinedError(404, 'err.message'))
        }
    }
}