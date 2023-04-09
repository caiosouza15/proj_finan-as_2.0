import React from "react";

import { useForm } from "react-hook-form";

export const CreateItem = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);    

  return (
    <div className="w-96 mt-5 flex flex-col border justify-center justify-items-center justify-self-center">
      <h1 className="text-center">Adicione uma item a suas finanças</h1>

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        
        <div className="flex flex-col m-3 justify-center justify-items-center justify-self-center">
            <label htmlFor="PrimeiroNome" className="">Titulo</label>
            <input {...register("titulo")} className="h-8 w-52 rounded bg-slate-200 " />
        </div>
        <div className="flex flex-col m-3 justify-center justify-items-center justify-self-center">
            <label htmlFor="PrimeiroNome" className="">Titulo</label>
            <input {...register("data")} className="h-8 w-52 rounded bg-slate-200" type="date" />
        </div>
        <div className="flex flex-col m-3 justify-center justify-items-center justify-self-center">
            <label htmlFor="PrimeiroNome" className="">Titulo</label>
            <input {...register("categoria")} className="h-8 w-52 rounded bg-slate-200 " />
        </div>
        <div className="flex flex-col m-3 justify-center justify-items-center justify-self-center">
            <label htmlFor="PrimeiroNome" className="">Titulo</label>
            <input {...register("valor")} className="h-8 w-52 rounded bg-slate-200 " type="number"/>
        </div>

        
        <button onSubmit={handleSubmit(onSubmit)} className="bg-transparent h10 w-28 hover:bg-zinc-300 text-zinc font-semibold
         py-2 px-4 m-4 border border-zinc-500 hover:border-transparent rounded">ENVIAR</button>
    </form>

    </div>
  );
};
