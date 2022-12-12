import {UserFieldsList} from "store/types/UserFieldsList";

export const userFields: UserFieldsList = {
  admin: [
    {value: '_id', title: 'app.user.info.field-id.title', editable: false},
    {value: 'login', title: 'app.user.info.field-login.title', editable: false},
    {value: 'userName', title: 'app.user.info.field-userName.title', editable: true},
    {value: 'role', title: 'app.user.info.field-role.title', editable: true},
    {value: 'status', title: 'app.user.info.field-status.title', editable: true},
    {value: 'reviewsCount', title: 'app.user.info.field-reviews.title', editable: false},
    {value: 'created', title: 'app.user.info.field-created.title', editable: false},
    {value: 'lastLogin', title: 'app.user.info.field-lastLogin.title', editable: false},
  ],
  user: [
    {value: '_id', title: 'app.user.info.field-id.title', editable: false},
    {value: 'login', title: 'app.user.info.field-login.title', editable: false},
    {value: 'userName', title: 'app.user.info.field-userName.title', editable: true},
    {value: 'reviewsCount', title: 'app.user.info.field-reviews.title', editable: false},
    {value: 'created', title: 'app.user.info.field-created.title', editable: false},
  ]
}