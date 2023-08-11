import {
    Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { supabase } from "../../dbConfig";
import { useState } from "react";

export const NewCategory = () => {

  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsSending(true);
    supabase
      .from("categorias")
      .insert(data)
      .then((response) => {
        if (response.status === 201) {
          setTimeout(() => {window.location = "/"; }, 1000);                  
        }
        else{
          setIsSending(false);
        } 
      });      
  };

  console.log(errors.name);

  return (
    <Box onSubmit={handleSubmit(onSubmit)} component="form" sx={{ display: 'flex', alignSelf: 'center' }}>
      {isSending ? (
        <CircularProgress />
      ) : (
        <Box>
          <Box paddingBottom={2}>
            <Typography variant="h6">ADICIONE UMA NOVA CATEGORIA</Typography>
            <Typography variant="caption">
              *Esta categoria ira lhe ajudar ao preencher um novo lançamento
            </Typography>
          </Box>

          <Box paddingBottom={2}>
            <TextField
              {...register("name",{ 
                pattern: {
                value: /^[A-Za-z]*$/,
                message:
                  "Digite apenas letras",
              },})}
              id="outlined-basic"
              label="Nova categoria"
              variant="outlined"
              type="text"
              required
              minLength={4}
              maxLength={25}
              fullWidth
            />
            {errors.name && <Alert severity="error" >{errors.name.message}</Alert>}
          </Box>

          <Box>
            <Stack
              spacing={2}
              direction="row"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button variant="outlined" type="submit">
                Enviar
              </Button>
            </Stack>
          </Box>
        </Box>
      )}
    </Box>
  );
};
