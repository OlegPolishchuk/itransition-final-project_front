export type Review = {
  userId: string;
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
}