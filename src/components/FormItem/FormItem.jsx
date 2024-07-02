import React, { useEffect, useState, useContext } from "react";

import { useForm } from "react-hook-form";
import { supabase } from "../../dbConfig";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  Container,
} from "@mui/material";
import { DataContext } from "../Context/DataContext";

import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

export const FormItem = () => {

  const [categories, setCategories] = useState("");

  const {
    setmodalIsOpen,
    category,
    getDados,
    setItems,
    openSnackbar,
    setOpenSnackbar,

  } = useContext(DataContext);

  const handleChange = (event) => {
    setCategories(event.target.value);
    setValue("categoria", categories);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.valor = data.valor.replace(/[\.,]/g, '');
    await supabase
      .from("registers")
      .insert(data)
      .then((response) => {
        if (response.status !== 201) {
          alert("OPA, OPA, OPA... Calma ia meu patrão.");
        } else {
          setOpenSnackbar(true);
          getDados().then((data) => setItems(data));
          setTimeout(() => { window.location = "/"; }, 500);
        }
      });
  };

  return (
    <Container>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        alignSelf={"center"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            variant="h5"
            marginLeft={1.5}
            align="center"
            marginBottom={2}
          >
            Novo lançamento
          </Typography>

          <Box>
            <TextField
              {...register("name")}
              id="outlined-basic"
              label={"Nome do gasto"}
              variant="outlined"
              required
              type="text"
              inputProps={{
                maxLength: "20",
                minLength: "4",
              }}
            />

            <TextField
              id="outlined-basic"
              variant="outlined"
              {...register("data")}
              required
              type="date"
            />
          </Box>

          <FormControl
            sx={{
              marginLeft: 1,
              width: 420,
            }}
          >
            <InputLabel id="demo-multiple-name-label">Categorias *</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={categories}
              label={categories}
              onChange={handleChange}
              sx={{ width: 400, marginTop: 1 }}
              inputProps={register("categoria", categories)}
              required
              error={errors.categoria}
            >
              {category.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ marginTop: 2 }}>
            <TextField
              id="outlined-basic"
              step="any"
              variant="outlined"
              label="Valor"
              {...register("valor")}
              required
            />
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ marginLeft: 1 }}
            >
              Não use virgula, por favor use ponto para valores decimais.
            </Typography>
          </FormControl>

          <Box sx={{ marginTop: 2 }}>
            <Stack spacing={2} direction="row" marginLeft={1}>
              <Button variant="outlined" type="submit">
                Enviar
              </Button>
            </Stack>
          </Box>
        </form>
      </Box>
    </Container>
  );
};
