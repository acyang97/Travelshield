import { Comment, Post, PostLikes, User } from "@prisma/client";

export interface IFullPost extends Post {
  user: User;
  comments: Comment[];
  postLikes: PostLikes[];
}
