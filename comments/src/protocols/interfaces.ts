import { CommentStatusModeration } from './enum';

export interface Comments {
  postId: string;
  id: string;
  content: string;
  status: CommentStatusModeration;
}