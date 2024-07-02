import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { DataContext } from "../Context/DataContext";
import { useContext } from "react";
import { totalValores } from "../../helpers";
import Modal from "@mui/material/Modal";
import { FormItem } from "../FormItem/FormItem";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { styleButton, styleModal } from "./styles/styles";

import { AmountEarned } from "./AmountsEarned";
import { ModalNewCategory } from "../Modals/NewCategory/ModalNewCategory";

export const Cards = () => { 
  const [openNewCategory, setOpenNewCategory] = useState(false);
  const [ modalIsOpen, setmodalIsOpen] = useState(false);

  const { items } = useContext(DataContext); 

  const handleToggleNewCategory = (isOpen) => {
    setOpenNewCategory(isOpen);
  };

  const handleToggleNewDespesa = (isOpen) => {
    setmodalIsOpen(isOpen);
  }; 
  
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
  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Card sx={{ minWidth: 2 }}>
          <AmountEarned />
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card sx={{ minWidth: 2 }}>
          <CardContent>
            <Typography gutterBottom>Total ganho:</Typography>
            <Typography variant="h6" color="primary">              
              00,00 R$
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4} alignSelf={"center"}>
       
          <Button
            variant="contained"
            onClick={() => handleToggleNewDespesa(true)}
            size="small"
            sx={styleButton}
          >
            Novo lançamento
          </Button>
          <Modal
            open={modalIsOpen}            
            onClose={() => handleToggleNewDespesa(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleModal}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                color="error"
                onClick={() => handleToggleNewDespesa(false)}
              >
                <CloseIcon />
              </Button>
            </Box>

              <FormItem />
            </Box>
          </Modal>
       
       
        <Button
          variant="contained"
          size="small"
          onClick={() => handleToggleNewCategory(true)}
          sx={styleButton}
        >
          Nova Categoria
        </Button>
        <Modal
          open={openNewCategory}
          onClose={() => handleToggleNewCategory(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                color="error"
                onClick={() => handleToggleNewCategory(false)}
              >
                <CloseIcon />
              </Button>
            </Box>

            <ModalNewCategory />
          </Box>
        </Modal>
      </Grid>
    </Grid>
  );
};
