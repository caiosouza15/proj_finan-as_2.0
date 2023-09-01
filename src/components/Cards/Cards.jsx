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
import { NewCategory } from "../Modals/ModalNewCategory";
import { Loading } from "../Load/Load";

export const Cards = () => {
  const [openNewRelease, setOpenNewRelease] = useState(false);
  const [openNewCategory, setOpenNewCategory] = useState(false);

  const { items, modalIsOpen, setmodalIsOpen } = useContext(DataContext); 

  const handleToggleNewCategory = (isOpen) => {
    setOpenNewCategory(isOpen);
  };

  const valores = items.map((item) => item.valor);

  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Card sx={{ minWidth: 2 }}>
          <CardContent>
            <Typography color="text.secondary" gutterBottom>
              Total gasto:
            </Typography>
            <Typography variant="h6" color="error">
              {items.length ? (
                <div>{totalValores(valores)} R$</div>
              ) : (
                <Loading marginValue={5} />
              )}
            </Typography>
          </CardContent>
        </Card>{" "}
      </Grid>
      <Grid item xs={4}>
        <Card sx={{ minWidth: 2 }}>
          <CardContent>
            <Typography gutterBottom>Total ganho:</Typography>
            <Typography variant="h6" color="primary">
              {" "}
              00,00R$ R$
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4} alignSelf={"center"}>
        <Button
          variant="contained"
          onClick={() => setmodalIsOpen(true)}
          size="small"
          sx={styleButton}
        >
          Novo lançamento
        </Button>
        <Modal
          open={modalIsOpen}
          onClose={() => setmodalIsOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>            
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

            <NewCategory />
          </Box>
        </Modal>
      </Grid>
    </Grid>
  );
};
