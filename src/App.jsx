import React, { useContext, useEffect, useState } from "react";

import { NavBar } from "./components/NavBar/NavBar";
import { Box, Grid } from "@mui/material";
import { Cards } from "./components/Cards/Cards";
import { DataContext } from "./components/Context/DataContext";
import TableItems from "./components/TableItems";

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
           <TableItems />
             
                   
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
