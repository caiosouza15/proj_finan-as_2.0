import React from "react";

import { Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { Box, Grid } from "@mui/material";
import { Cards } from "./components/Cards/Cards";

const App = () => {
  return (
    <Box>
      <Box color="secundary" marginBottom>
        <NavBar />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {" "}
          <Cards />{" "}
        </Grid>
        <Grid item xs={6}>
          {" "}
          <Outlet />{" "}
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
