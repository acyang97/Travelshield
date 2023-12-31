import { Post, PostLikes, User } from "@prisma/client";

export interface IFullPost extends Post {
  user: User;
  comments: Comment[];
  postLikes: PostLikes[];
}

export interface FormattedFullPost extends IFullPost {
  likedByUser: boolean;
}

export interface SearchQueryBuilder {
  country?: string;
  city?: string;
  content?: string;
  categories?: string[];
}
