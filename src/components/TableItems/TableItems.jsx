import { useEffect, useState } from "react";
import { supabase } from "../../dbConfig";
import { Link } from "react-router-dom";
import { verificaValor } from "../../helpers";


export const TableItems = () => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    getTitles();
  }, []);

  async function getTitles() {
    const { data } = await supabase.from("registres").select();  
    if( data.length ){
      setResponse(data);
    }      
  }  

  const captureId = async (id) => {
    if(id){
      confirm("Tem certeza que deseja excluir?");
      await supabase.from("registres").delete().eq('id', id).then(response => {
        if(response = 204){
          window.location.reload(true);
        }
      });
    }    
  }

  return (
    <>
      <div className="h-20 w-1/2 -mt-7 p-7 bg-slate-300 flex justify-between items-center text-justify rounded shadow-md">
        <div></div>
        <button
          className="bg-transparent hover:bg-slate-500 text-zinc font-semibold py-2 px-4 text-sm ml-4 border
                    border-zinc-500  rounded">          
          <Link to={`/createItem`}> Novo lançamento</Link>
        </button>
        
      </div>

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
            <th scope="col" className="px-6 py-3 text-center">Ações</th>
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
              <td className="px-6 py-4 text-center">{verificaValor(item.valor)}</td>
              <td className="">
                <button
                  className="bg-transparent hover:bg-zinc-300 text-zinc font-semibold py-2 px-4 ml-4 border
                  border-zinc-500 hover:border-transparent rounded">
                    <Link to={`/createItem/${item.id}`}>Editar</Link>
                </button>
                <button
                  onClick={() => captureId(item.id)}
                  className="bg-transparent hover:bg-zinc-300 text-zinc font-semibold py-2 px-4 ml-4 border
                  border-zinc-500 hover:border-transparent rounded ">
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
