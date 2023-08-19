import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Loading = ({marginValue}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: marginValue }}>
      <CircularProgress />
    </Box>
  );
};
