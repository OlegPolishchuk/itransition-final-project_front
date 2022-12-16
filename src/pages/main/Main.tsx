import React from 'react';
import {Box, Container, Grid} from "@mui/material";
import {Outlet} from "react-router-dom";
import {MainNav, TagsCloud} from "common";

export const Main = () => {

  return (
    <Container>

      <Box mb={'50px'}>
        <MainNav />
      </Box>

      <Grid container spacing={4}>

        <Grid item xs={12} md={8} lg={9}>
          <Outlet />
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <TagsCloud />
        </Grid>

      </Grid>

    </Container>
  );
};
