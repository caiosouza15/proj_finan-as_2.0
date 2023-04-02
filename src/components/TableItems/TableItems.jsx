import { useEffect, useState } from "react";
import { supabase } from "../../dbConfig";


export const TableItems = () => {
  const [response, setResonse] = useState([]);

  useEffect(() => {
    getTitles();
  }, []);

  async function getTitles() {
    const { data } = await supabase.from("titles").select();
    setResonse(data);
  }
  console.log(response);

  return (
    <>
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
