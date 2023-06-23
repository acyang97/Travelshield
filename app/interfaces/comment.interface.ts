import { Comment, CommentLikes, User } from "@prisma/client";

export interface FullComment extends Comment {
  user: User;
  commentLikes: CommentLikes[];
}
