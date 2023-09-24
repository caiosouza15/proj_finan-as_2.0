import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../Context/DataContext";


export const SucessBar = () =>{
    const {openSnackbar, setOpenSnackbar} = useContext(DataContext);
    console.log(openSnackbar);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }    
        setOpenSnackbar(false);
      };

    return(
        <Snackbar open={openSnackbar} autoHideDuration={3000}  onClose={handleClose}>
        <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
          Novo lançamento adicionado.
        </Alert>
      </Snackbar>
    );
}