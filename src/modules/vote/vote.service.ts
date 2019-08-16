import { voteModel } from './vote.model';
import { IVote } from './vote.type';

export class VoteService {

  public getAllVotes = async(): Promise<IVote[]> => {
    return voteModel.find();
  }

  public findVote = async(data: any): Promise<IVote[]> => {
    return voteModel.find({'postId': data.postId, 'byUser': data.byUser});
  }

  public addVote = async(data: IVote): Promise<IVote> => {
    const postVote: IVote = new voteModel(data);
    return postVote.save();
  }

 public findUpdateOrCreate = async(data: any): Promise<any> => {
    return voteModel.findOneAndUpdate( data.voteId ? {'_id': data.voteId } : 0, data,{upsert:true, new: true})
 }
}