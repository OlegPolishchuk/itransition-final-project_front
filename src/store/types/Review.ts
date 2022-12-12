export type Review = {
  userId: string;
  title: string;
  subtitle: string;
  tag: string;
  body: string;
  personalScore: number;
  overallScore: number;
  comments: [];
  created: string,
  updated: string,
}