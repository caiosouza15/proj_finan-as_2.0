import React, { useContext, useEffect, useState } from "react";

import { NavBar } from "./components/NavBar/NavBar";
import { Box, Container, Grid } from "@mui/material";
import { Cards } from "./components/Cards/Cards";
import { DataContext } from "./components/Context/DataContext";
import TableItems from "./components/TableItems";
import { SucessBar } from "./components/Snackbars/Snackbars";
import { Loading } from "./components/Load/Load";
import { EmptyPage } from "./components/EmptyPage/EmptyPage";

const App = () => {  
  const {openSnackbar, items} = useContext(DataContext);  

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
           {items != undefined ? <TableItems /> : <EmptyPage />}            
                   
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
