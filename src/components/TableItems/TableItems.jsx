import { useEffect, useState } from "react";
import { supabase } from "../../dbConfig";
import { Link } from "react-router-dom";


export const TableItems = () => {
  const [response, setResonse] = useState([]);

  useEffect(() => {
    getTitles();
  }, []);

  async function getTitles() {
    const { data } = await supabase.from("titles").select();
    setResonse(data);
  }

  return (
    <>
      <div className="h-20 w-1/2 -mt-7 p-7 bg-slate-300 flex justify-between items-center text-justify rounded shadow-md">
        <div>TEST</div>
        {/* <button
          className="bg-transparent hover:bg-sky-100 text-zinc font-semibold py-2 px-4 text-sm ml-4 border
                    border-zinc-500  rounded"
        >
          
          Novo lançamento
        </button> */}
        <Link to={"/createItem"}> TEST</Link>
      </div>

      <table className="table-fixed w-auto mt-5 text-sm text-left ">
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
            <th></th>
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
              <td className="px-6 py-4 text-center">{item.valor}</td>
              <td className="flex justify-center items-center ">
                <button
                  className="bg-transparent hover:bg-zinc-300 text-zinc font-semibold py-2 px-4 ml-4 border
                  border-zinc-500 hover:border-transparent rounded">
                    Editar
                </button>
                <button
                  className="bg-transparent hover:bg-zinc-300 text-zinc font-semibold py-2 px-4 ml-4 border
                  border-zinc-500 hover:border-transparent rounded">
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
