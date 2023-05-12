export const verificaValor = (numero) => {
    if (Number.isInteger(numero)) {
      return numero.toFixed(2);
    } else {
      return numero.toString();
    }
  }