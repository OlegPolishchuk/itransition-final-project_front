export type UserFieldsList = {
  admin: CommonFieldList[];
  user: CommonFieldList[];
}

export type CommonFieldList = {
  value: string;
  title: string;
  editable: boolean;
}