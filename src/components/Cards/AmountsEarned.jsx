import { useContext } from "react";
import { DataContext } from "../Context/DataContext";
import { CardContent, Typography } from "@mui/material";

export const AmountEarned = () => {

    const { items } = useContext(DataContext); 

    const verifyItems = ({valor} = items??0) => {
        if(items === undefined){
          return "00.00 R$";
        }else{
          const valores =  items.map(({valor} = items) => {        
            if (Number.isInteger(valor)){              
              return ` ${valor.toFixed(2)} R$` ;
            } 
          }); 
          return valores;
        }
      }

    return(
        <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Total gasto:
            </Typography>
            <Typography variant="h6" color="error">
              {verifyItems(items)}
            </Typography>
          </CardContent>
    )
}