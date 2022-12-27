import React from 'react';
import {Box, Container} from "@mui/material";
import {Outlet} from 'react-router-dom';
import {AdminNav} from "pages/adminPanel/adminNav/AdminNav";


export const AdminPanel = () => {
  return (
    <Container sx={{padding: '10px 10px 30px 10px'}}>

      <Box mb={'30px'}>
        <AdminNav />
      </Box>

      <Outlet/>

    </Container>
  );
};
