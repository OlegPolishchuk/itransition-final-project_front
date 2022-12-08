import React from 'react';
import {Container} from "@mui/material";
import {Outlet} from 'react-router-dom';


export const AdminPanel = () => {

  return (
    <Container sx={{
      padding: '30px 10px',
    }}>

      <Outlet/>

    </Container>
  );
};
