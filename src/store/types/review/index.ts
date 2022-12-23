export type Review = {
  _id: string;
  title: string;
  subtitle: string;
  tags: string[];
  body: string;
  personalScore: number;
  overallScore: number;
  overallScoresId: string[];
  comments: number;
  created: string,
  updated: string,
  userId: string;
  userName: string;
  userAvatar: string;
  likes: number;
  likesId: string[];
}

