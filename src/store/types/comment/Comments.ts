export type Comments = {
  comments: Comment[],
  reviewId: string;
}

export type Comment = {
  userId: string;
  userName: string;
  userAvatar: string;
  createdAt: Date;
  message: string;
}