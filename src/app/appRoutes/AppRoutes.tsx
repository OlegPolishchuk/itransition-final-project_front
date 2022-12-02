import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {routes} from "shared";
import {Login} from "app/login/Login";
import {ProtectedRoute} from "app/appRoutes/ProtectedRoute";
import {Register} from "app/register/Register";


type Props = {
  isUserAuth: boolean;
}

export const AppRoutes: FC<Props> = ({isUserAuth}) => {

  return (
    <Routes>
      <Route path={routes.auth.register} element={<Register />}/>
      <Route path={routes.auth.login} element={<Login />}/>
      <Route path={'/'} element={<ProtectedRoute isUserAuth={isUserAuth} children={<div>protected</div>} />} />
      <Route path={routes.notFound} element={<div>Not Found</div>}/>
    </Routes>
  );
};
