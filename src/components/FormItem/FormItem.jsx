import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { supabase } from "../../dbConfig";
import { useParams } from "react-router-dom";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export const FormItem = () => {
  const [initialDate, setInitialDate] = useState();



  const { id } = useParams();

  
  useEffect(() => {
    if (id) {
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
            window.location = "/";
          }
        });
    } else {
      await supabase
        .from("registres")
        .insert(data)
        .then((response) => {
          if (response.status != 201) {
            alert("OPA, OPA, OPA... Calma ia meu patrão.");
          } else {
            window.location = "/";
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
      <Typography variant="h6" marginLeft={1.5}>Novo lançamento</Typography>
      <div>
        <TextField
          id="outlined-basic"
          label="Nome do gasto"
          variant="outlined"
          {...register("name")}
          required
          type="text"
          minLength={4}
          maxLength={25}
          placeholder="Nome do gasto"
        />

        <TextField
          id="outlined-basic"
          variant="outlined"
          {...register("data")}
          required
          type="date"
          placeholder="Nome do gasto"
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Categoria"
          variant="outlined"
          {...register("categoria")}
          required
          minLength={4}
          type="text"
          placeholder="Categoria do gasto"
        />

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
