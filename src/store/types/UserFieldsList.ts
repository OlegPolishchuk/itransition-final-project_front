export type UserFieldsList = {
  admin: CommonFieldList[];
  user: CommonFieldList[];
}

type CommonFieldList = {
  value: string;
  title: string;
  editable: boolean;
}