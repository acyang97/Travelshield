import { Comment, Post, PostLikes, User } from "@prisma/client";

export interface IFullPost extends Post {
  user: User;
  comments: Comment[];
  postLikes: PostLikes[];
}

export interface FormattedFullPost extends IFullPost {
  likedByUser: boolean;
}

export interface ISearchParams {
  limit: number;
  page: number;
  country?: string;
  city?: string;
  content?: string;
  categories?: string; // might be more than 1
}
