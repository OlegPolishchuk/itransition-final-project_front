export type Review = {
  _id: string;
  title: string;
  subtitle: string;
  tags: string[];
  body: string;
  personalScore: number;
  overallScore: number;
  comments: [];
  created: string,
  updated: string,
  userId: string;
  userName: string;
  userAvatar: string;
}

export type SortReviews = 'created' | 'overallScore'  | '';
