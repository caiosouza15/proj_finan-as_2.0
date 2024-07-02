import { supabase } from "./dbConfig";

export const verificaValor = (numero) => {
  const totalValueFormat = numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  return totalValueFormat
};

export const verifyItems = (items) => {  
  if (items === undefined) {
    return "00.00 R$";
  }
  const value = items.reduce((acumulador, valor) => acumulador + parseFloat(valor), 0);
  const totalValueFormat = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });    
  return totalValueFormat;
}

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
