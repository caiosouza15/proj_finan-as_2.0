import React, { useContext, useEffect, useState } from "react";

import { NavBar } from "./components/NavBar/NavBar";
import { Box, Container, Grid } from "@mui/material";
import { Cards } from "./components/Cards/Cards";
import { DataContext } from "./components/Context/DataContext";
import TableItems from "./components/TableItems";
import { SucessBar } from "./components/Snackbars/Snackbars";

const App = () => {  
  const {openSnackbar} = useContext(DataContext);

  return (
    <Container>
      <Box>
        <Box color="secundary" marginBottom>
          <NavBar />
        </Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {" "}
          <Cards />{" "}
        </Grid>
        <Grid item xs={8}>
           <TableItems />
             
                   
        </Grid>
      </Grid>
      {openSnackbar && 
        <SucessBar />
      }
    </Box>
    </Container>
    
  );
};

export default App;
