import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { supabase } from "../../dbConfig";
import { Link, useParams } from "react-router-dom";

export const CreateItem = () => {
  const [initialDate, setInitialDate] = useState();

  const { id } = useParams();

  useEffect(
    () => {      
      if(id){
        async function fetchRecord() {
          const { data, error } = await supabase
            .from("registres")
            .select()
            .eq("id", id)
            .single();
      
          if (error) {
            console.log("Erro ao buscar registro:", error);
          } else if (data) {
            setInitialDate(data);
          }
        }
        fetchRecord();
      }               
    }, [id]);

    console.log(initialDate.name);

  const { register, handleSubmit } = useForm({
    defaultValues:{
      name: "",
      categoria: "",
      data: "",
      valor: ""
    }
  });

  console.log(initialDate);

  const onSubmit = async (data) => {
    await supabase
      .from("registres")
      .insert(data)
      .then((response) => {
        if (response.status != 201) {
          console.log(response);
          alert("OPA, OPA, OPA... Calma ia meu patrão.");
        } else {
          window.location = "/";
        }
      });
  };

  return (
    <div className="w-96 mt-5 flex flex-col border justify-center justify-items-center justify-self-center">
      <h1 className="text-center">Adicione uma item a suas finanças</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col m-3 justify-center justify-items-center justify-self-center">
          <label htmlFor="PrimeiroNome" className="">
            Nome
          </label>
          <input
            {...register("name")}
            required
            type="text"
            minLength={4}
            maxLength={25}
            defaultValue=""
            className="h-8 w-52 rounded bg-slate-200 "
          />
        </div>
        <div className="flex flex-col m-3 justify-center justify-items-center justify-self-center">
          <label htmlFor="PrimeiroNome" className="">
            Data
          </label>
          <input
            {...register("data")}
            required
            className="h-8 w-52 rounded bg-slate-200"
            type="date"
          />
        </div>
        <div className="flex flex-col m-3 justify-center justify-items-center justify-self-center">
          <label htmlFor="PrimeiroNome" className="">
            Categoria
          </label>
          <input
            {...register("categoria")}
            required
            minLength={4}
            type="text"
            className="h-8 w-52 rounded bg-slate-200 "
          />
        </div>
        <div className="flex flex-col m-3 justify-center justify-items-center justify-self-center">
          <label htmlFor="PrimeiroNome" className="">
            Valor
          </label>
          <input
            {...register("valor")}
            required
            className="h-8 w-52 rounded bg-slate-200 "
            type="number"
          />
        </div>

        <button
          onSubmit={handleSubmit(onSubmit)}
          className="bg-transparent h10 w-28 hover:bg-zinc-300 text-zinc font-semibold
         py-2 px-4 m-4 border border-zinc-500 hover:border-transparent rounded"
        >
          ENVIAR
        </button>
        <Link to={"/"}> VOLTAR </Link>
      </form>
    </div>
  );
};
