import React, { useEffect, useState, useContext } from "react";

import { useForm } from "react-hook-form";
import { supabase } from "../../dbConfig";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { DataContext } from "../Context/DataContext";
import CloseIcon from "@mui/icons-material/Close";
import { TableItems } from "../TableItems/TableItems";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export const FormItem = ({ id }) => {
  const [initialDate, setInitialDate] = useState();
  const [isEdited, setIsEdited] = useState(false);

  const { setmodalIsOpen, category } = useContext(DataContext);

  console.log(category);

  useEffect(() => {
    if (id) {
      setIsEdited(true);
      async function fetchRecord() {
        const { data, error } = await supabase
          .from("registres")
          .select()
          .eq("id", id)
          .single();

        if (error) {
        } else if (data) {
          setInitialDate(data);
        }
      }
      fetchRecord();
    }
  }, [id]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  if (initialDate) {
    setValue("name", initialDate.name);
    setValue("data", initialDate.data);
    setValue("categoria", initialDate.categoria);
    setValue("valor", initialDate.valor);
  }

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const onSubmit = async (data) => {
    if (id) {
      await supabase
        .from("registres")
        .update(data)
        .eq("id", id)

        .then((response) => {
          if (response.error !== null) {
            alert("OPA, OPA, OPA... Calma ia meu patrão.");
          } else {
           setmodalIsOpen(false);
           <TableItems />
          }
        });
    } else {
      await supabase
        .from("registers")
        .insert(data)
        .then((response) => {
          if (response.status != 201) {
            alert("OPA, OPA, OPA... Calma ia meu patrão.");
          } else {
            setmodalIsOpen(false);
            <TableItems />
          }
        });
    }
  };

  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      useFlexGap
      alignSelf={"center"}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button color="error" onClick={() => setmodalIsOpen(false)}>
          <CloseIcon />
        </Button>
      </Box>
      <Typography variant="h6" marginLeft={1.5}>
        {isEdited ? "Editar lançamento" : "Novo lançamento"}
      </Typography>
      <div>
        <TextField
          {...register("name")}
          id="outlined-basic"
          label={initialDate ? "" : "Nome do gasto"}
          variant="outlined"
          required
          type="text"
          minLength={4}
          maxLength={25}
        />

        <TextField
          id="outlined-basic"
          variant="outlined"
          {...register("data")}
          required
          type="date"
        />
      </div>
      <div>
        
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={category}         
          label="category"
          sx={{width: 100 }}
        >
          {category.map((item) => {
            <MenuItem value={item.id}>item.name</MenuItem>
          })}
        
        </Select>

        <TextField
          id="outlined-basic"
          variant="outlined"
          {...register("valor", {
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message:
                "Informe um número decimal válido (exemplo: 35.33) com ponto.",
            },
          })}
          type="number"
          required
          placeholder="Valor"
        />
        {errors.valor && <span>{errors.valor.message}</span>}
      </div>
      <div>
        <Stack spacing={2} direction="row" marginLeft={1}>
          <Button variant="outlined" type="submit">
            Enviar
          </Button>
        </Stack>
      </div>
    </Box>
  );
};
