import { supabase } from "./dbConfig";

export const verificaValor = (numero) => {
  if (Number.isInteger(numero)) {
    return numero.toFixed(2);
  } else {
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
};

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
