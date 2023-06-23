import { useEffect, useState } from "react";
import { supabase } from "../../dbConfig";
import { Link } from "react-router-dom";
import { captureId, getDados, totalValores, verificaValor } from "../../helpers";
import HeaderBar from "../HeaderBar/HeaderBar";

export const TableItems = () => {
  const [response, setResponse] = useState([]);
  const valores = [];

  useEffect(() => {
    getDados().then((dados) => {
      setResponse(dados)
    });
  }, []); 
  
  response.map((item) => valores.push(item.valor))

  return (
    <>
    <HeaderBar valores={valores} />
      

      <table className="table-fixed w-auto mt-5 text-sm text-left">
        <thead className="text-xs bg-zinc-100 text-black">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              Titulo
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Data
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Categoria
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Valor
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Ações
            </th>
          </tr>
        </thead>

        {response.map((item, index) => (
          <tbody key={item.id}>
            <tr className="hover:bg-zinc-100">
              <td className="px-6 py-4 text-center border-r">{item.name}</td>
              <td className="px-6 py-4 text-center border-r">{item.data}</td>
              <td className="px-6 py-4 text-center border-r">
                {item.categoria}
              </td>
              <td className="px-6 py-4 text-center">
              {verificaValor(item.valor)} R$
              </td>
              <td className="">
                <button
                  className="bg-transparent hover:bg-zinc-300 text-zinc font-semibold py-2 px-4 ml-4 border
                  border-zinc-500 hover:border-transparent rounded"
                >
                  <Link to={`/createItem/${item.id}`}>Editar</Link>
                </button>
                <button
                  onClick={() => captureId(item.id)}
                  className="bg-transparent hover:bg-zinc-300 text-zinc font-semibold py-2 px-4 ml-4 border
                  border-zinc-500 hover:border-transparent rounded "
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
};
