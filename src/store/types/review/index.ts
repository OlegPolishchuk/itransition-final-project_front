export type Review = {
  _id: string;
  title: string;
  subtitle: string;
  tags: string[];
  group: string;
  body: string;
  personalScore: number;
  overallScore: number;
  overallScoresId: string[];
  comments: number;
  created: string;
  updated: string;
  userId: string;
  userName: string;
  userLikes: number;
  userAvatar: string;
  likes: number;
  likesId: string[];
};

export type ReviewWithCheckbox = Review & { checked: boolean };
