import { Link } from "react-router-dom";
import { totalValores } from "../../helpers";

const HeaderBar = (props) => {
    return(
        <div className="h-20 w-1/2 -mt-7 p-7 bg-slate-300 flex justify-between items-center text-justify rounded shadow-md">
        <div> {`Total gasto ${totalValores(props.valores)}`} R$</div>
        <button
          className="bg-transparent hover:bg-slate-500 text-zinc font-semibold py-2 px-4 text-sm ml-4 border
                    border-zinc-500  rounded"
        >
          <Link to={`/createItem`}> Novo lançamento</Link>
        </button>
      </div>
    )
}

export default HeaderBar;
