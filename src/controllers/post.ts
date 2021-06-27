import { Request, Response } from 'express';
import Post, { IPost } from '../models/post';
import image, {IImage} from '../models/image';

class PostControllers {
  public async index(req: Request, res: Response) {
    const posts = await Post.find({});
    res.json({ message: "all Posts", posts });    
  }
  public async newPost(req: Request, res: Response) {
    const { title, content} = req.body;
    const nPost = new Post(req.body);
    await nPost.save();
    res.json({ message: "Post created", nPost });      
  }
  public async editPost(req: Request, res: Response) {
    const {id } = req.params;
    const { title, content} = req.body;
    const ePost = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Post update", ePost });       
  }
  public async deletePost(req: Request, res: Response) {
    const { id } = req.params;
    const dPost = await Post.findByIdAndDelete(id);
    res.json({ message: "Post delete", dPost });
  }
  public async createimg (request: Request, response: Response) {
    const {idP} = request.params;
    const {idI} = request.params;
    let createI = await Post.findById(idP);
    let imgI = await image.findById(idI);
    if (createI != null && imgI != null){
        const{title, url, content} = request.body;
        const newI = new Post(request.body);
        newI ["image"] = imgI.relativepath;
        await newI.save();
        response.status(300).json({message: "imagen asignado a Post", newI});
    }
    
  }
}

export const postControllers = new PostControllers();