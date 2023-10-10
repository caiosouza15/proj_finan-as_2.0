import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/DataContext";
import { Loading } from "../Load/Load";
import { supabase } from "../../dbConfig";

export const Edit = ({ id }) => {
  const [initialDate, setInitialDate] = useState();
  const [categories, setCategories] = useState("");

  const { setmodalIsOpen, items, category, getDados, setItems } = useContext(DataContext);

  const handleChange = (event) => {
    setCategories(event.target.value);
    setValue("categoria", categories);
  };

  useEffect(() => {
    const results = items.filter((item) => {
      return item.id === id;
    });
    setInitialDate(results[0]);
  }, [id]);

  const {
    register,
    handleSubmit,
    setValue,   
    formState: { errors },
  } = useForm({
    defaultValues: {
      name:  initialDate?.name,
      data:  initialDate?.data,
      valor:  initialDate?.valor,
      categoria:  initialDate?.categoria,
    },
  });

  const onSubmit = async (data) => {
    if(data.categoria.length === 0) {
      data.categoria = initialDate.categoria;
    }    
    await supabase
    .from("registers")
    .update(data)
    .eq("id", id)
    .then((response) => {
      if (response.error !== null) {        
        alert("OPA, OPA, OPA... Calma ia meu patrão.");
      } else {
        setmodalIsOpen(false);
        getDados().then((data) => setItems(data));
      }
    });
  }
 
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      alignSelf={"center"}
    >
      {initialDate  && (
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Typography
            variant="h5"
            marginLeft={1.5}
            align="center"
            marginBottom={2}
          >
            Editar lançamento
          </Typography>

          <div>
            <TextField
              {...register("name")}
              id="outlined-basic"
              defaultValue={initialDate.name}
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
              defaultValue={initialDate.data}
              required
              type="date"
            />
          </div>

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
            label={categories}         
            onChange={handleChange}
            sx={{ width: 400, marginTop: 1 }}
            defaultValue={initialDate.categoria}
            {...register("categoria", categories)}           
          >
            {category.map((item) => {
              return (
                <MenuItem key={item.id} value={item.name} >
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
          <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ marginLeft: 1 }}
            >
              Categoria selecionada: { initialDate.categoria}
            </Typography>
        </FormControl>

          <FormControl sx={{ marginTop: 2 }}>
            <TextField
              id="outlined-basic"
              step="any"
              variant="outlined"
              label="Valor"
              defaultValue={initialDate.valor}
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
      )}
    </Box>
  );
};
