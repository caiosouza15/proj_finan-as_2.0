import { useContext } from "react";
import { DataContext } from "../Context/DataContext";
import { CardContent, Typography } from "@mui/material";
import { verifyItems } from "../../helpers";

export const AmountEarned = () => {

  const { items } = useContext(DataContext);
  const currentValue = items.map(items => items.valor);
  return (
    <CardContent>
      <Typography color="text.secondary" gutterBottom>
        Total gasto:
      </Typography>
      <Typography variant="h6" color="error">
        {verifyItems(currentValue)}
      </Typography>
    </CardContent>
  )
}