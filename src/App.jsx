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
  const { openSnackbar, items } = useContext(DataContext);

  return (
    <Container >
      <Container>
        <Box marginBottom={4}>
          <Box color="secundary" marginBottom>
            <NavBar />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Cards />
            </Grid>
          </Grid>
          {openSnackbar &&
            <SucessBar />
          }
        </Box>
        <Box>
          <Grid item >
            {items != undefined ? <TableItems /> : <EmptyPage />}

          </Grid>
        </Box>
      </Container>

    </Container>



  );
};

export default App;
