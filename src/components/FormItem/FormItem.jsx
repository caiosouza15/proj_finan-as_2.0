import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { supabase } from "../../dbConfig";
import { Link, useParams } from "react-router-dom";

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
          console.log("Erro ao buscar registro:", error);
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

  console.log(initialDate);

  const onSubmit = async (data) => {
    if (id) {
      console.log(data);

      await supabase
        .from("registres")
        .update(data)
        .eq("id", id)

        .then((response) => {
          if (response.error !== null) {
            console.log(response);
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
            console.log(response);
            alert("OPA, OPA, OPA... Calma ia meu patrão.");
          } else {
            window.location = "/";
          }
        });
    }
  };

  return (
    <div className="w-96 mt-5 flex flex-col  justify-center justify-items-center justify-self-center">
      <h1 className="text-center">Adicione um item a suas finanças</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div class="mb-5 pt-5">
          <label
            for="fName"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Nome do gasto
          </label>
          <input
            {...register("name")}
            required
            type="text"
            minLength={4}
            maxLength={25}
            placeholder="Nome do gasto"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-slate-300 focus:shadow-md"
          />
        </div>
        <div class="w-full sm:w-1/2">
          <div class="mb-5">
            <label class="mb-3 block text-base font-medium text-[#07074D]">
              Data
            </label>
            <input
              {...register("data")}
              required
              type="date"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>

        <div class="mb-5 pt-5">
          <label className="mb-3 block text-base font-medium text-[#07074D]">
            Categoria
          </label>
          <input
            {...register("categoria")}
            required
            minLength={4}
            type="text"
            placeholder="Categoria do gasto"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-slate-300 focus:shadow-md"
          />
        </div>

        <div class="mb-5 pt-5">
          <label
            for="fName"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Valor
          </label>
          <input
            {...register("valor", {
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message:
                  "Informe um número decimal válido (exemplo: 35.33) com ponto.",
              },
            })}
            required
            placeholder="Valor"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-slate-300 focus:shadow-md"
          />
          {errors.valor && <span>{errors.valor.message}</span>}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-transparent h10 w-28 hover:bg-zinc-100 text-zinc font-semibold
          py-2 px-4 m-4 border border-slate-300 hover:border-transparent rounded"
          >
            Enviar
          </button>
          <Link to={"/"} className="p-5 text-blue-500 underline decoration-1">
            {" "}
            VOLTAR{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};
