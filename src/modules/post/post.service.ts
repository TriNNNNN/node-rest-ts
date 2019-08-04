import { postModel } from './post.model';
import { IPost } from './post.type';

export class PostService {

  public async getAllPosts(): Promise<IPost[]> {
    return postModel.find();
  }

  public async addPost(data: IPost): Promise<IPost> {
    const postObj: IPost = new postModel(data);
    return postObj.save();
  }

}