import React from 'react';
import {Box, Container, Grid, useMediaQuery} from "@mui/material";
import {Outlet} from "react-router-dom";
import {Search, TagsCloud} from "common";

export const Main = () => {
  const isLargeScreen = useMediaQuery('(min-width: 900px)')

  return (
    <Container sx={{paddingBottom: '50px'}}>

      <Grid container spacing={4}>

        <Grid item xs={12} md={8} lg={9}>
          <Outlet />
        </Grid>

        <Grid item xs={12} md={4} lg={3}>

          <Box sx={{position: 'sticky',top: '50px'}}>
            {isLargeScreen && (
              <Box mb={'30px'}>
                <Search />
              </Box>
            )}

            <TagsCloud />
          </Box>

        </Grid>

      </Grid>

    </Container>
  );
};
