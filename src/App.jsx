import React, { useContext, useEffect, useState } from "react";

import { NavBar } from "./components/NavBar/NavBar";
import { Box, Grid } from "@mui/material";
import { Cards } from "./components/Cards/Cards";
import { DataContext } from "./components/Context/DataContext";
import TableItems from "./components/TableItems";

const App = () => {

  const [myItems, setMyItems] = useState();
  const [myCategory, setMyCategory] = useState();

  const { data } = useContext(DataContext);

  useEffect(() => {
    console.log(data);
  }, [])
  
  // setMyItems(data.items);
  // setMyCategory(data.category); 
  
  // console.log(items);
  // console.log(category);
console.log(data);
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
          { data ? "TEST" : <TableItems />}
             
                   
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
