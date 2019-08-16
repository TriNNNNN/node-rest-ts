import { postModel } from './post.model';
import { IPost } from './post.type';

export class PostService {

  public getAllPosts = async(): Promise<IPost[]> => {
    return postModel.find();
  }

  public addPost = async(data: IPost): Promise<IPost> => {
    const postObj: IPost = new postModel(data);
    return postObj.save();
  }

  public getPostById = async(id: string): Promise<any> => {
    return postModel.findOne({ _id: id }, '-__v');
  }

}