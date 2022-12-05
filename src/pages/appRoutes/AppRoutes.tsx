import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {routes} from "shared";
import {Login, Main, ProtectedRoute, Register} from "pages";

import {Protected} from "pages";


type Props = {
  isUserAuth: boolean;
}

export const AppRoutes: FC<Props> = ({isUserAuth}) => {

  return (
    <Routes>
      <Route path={routes.auth.register} element={<Register />}/>
      <Route path={routes.auth.login} element={<Login />}/>
      <Route path={routes.mainPage} element={<ProtectedRoute isUserAuth={isUserAuth} children={<Main />} />} />
      <Route path={routes.notFound} element={<div>Not Found</div>}/>

      <Route path={routes.protectedRoute} element={<Protected />}/>
    </Routes>
  );
};
