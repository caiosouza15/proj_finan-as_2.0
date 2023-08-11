import { supabase } from "./dbConfig";

export const verificaValor = (numero) => {
  console.log("entrada", numero);
  if (Number.isInteger(numero)) {
    return numero.toFixed(2);
  } else {
    console.log(numero);
    return numero.toString();
  }
};

export const totalValores = (sumNumeros) => {
  let soma = 0;
  for (let i = 0; i < sumNumeros.length; i++) {
    soma += sumNumeros[i];
  }
  if (Number.isInteger(soma)) {
    return soma.toFixed(2);
  } else {
    return soma.toString();
  }
  return soma;
};

export async function getDados() {
  const { data } = await supabase.from("registers").select();
  if (data.length) {
    return data;
  }
}

export const captureId = async (id) => {
  if (id) {
    confirm("Tem certeza que deseja excluir?");
    await supabase
      .from("registers")
      .delete()
      .eq("id", id)
      .then((response) => {
        if ((response = 204)) {
          window.location.reload(true);
        }
      });
  }
};
