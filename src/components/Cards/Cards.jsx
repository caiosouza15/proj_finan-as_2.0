import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { DataContext } from "../Context/DataContext";
import { useContext } from "react";
import { totalValores } from "../../helpers";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { FormItem } from "../FormItem/FormItem";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignSelf: "center",
  rounded: true,
  borderRadius: 2
};

export const Cards = () => {
  const [open, setOpen] = useState(false);

  const dataItems = useContext(DataContext);
  const currenteData = dataItems.response;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const valores = currenteData.map((item) => item.valor);

  return (
    <Grid container spacing={5}>
      <Grid item xs={4}>
        <Card sx={{ minWidth: 2 }}>
          <CardContent>
            <Typography  color="text.secondary" gutterBottom>             
              Total gasto:
            </Typography>
            <Typography variant="h6" color="error"> {totalValores(valores)} R$</Typography>
          </CardContent>
        </Card>{" "}
      </Grid>
      <Grid item xs={4}>
        {" "}
        <Card sx={{ minWidth: 2 }}>
          <CardContent>
            <Typography gutterBottom>
              Total ganho:
            </Typography>
            <Typography variant="h6" color="primary"> 00,00R$ R$</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4} alignSelf={"center"}>
        <Button variant="contained" onClick={handleOpen}>
          Novo lançamento
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{
               display: "flex",              
               justifyContent: "flex-end",
            }}><Button color="error" onClick={handleClose}><CloseIcon /></Button>
            </Box>            
            <FormItem />
          </Box>
        </Modal>
      </Grid>
    </Grid>
  );
};
