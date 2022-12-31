export type UserFieldsList = {
  admin: CommonFieldList[];
  user: CommonFieldList[];
  currentUser: CommonFieldList[];
};

export type CommonFieldList = {
  value: string;
  title: string;
  editable: boolean;
};
