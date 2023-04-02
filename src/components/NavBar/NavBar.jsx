import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="h-20 w-1/2 -mt-7 p-7 bg-slate-300 flex justify-between items-center text-justify rounded shadow-md">
      <div>TEST</div>
      {/* <button
        className="bg-transparent hover:bg-sky-100 text-zinc font-semibold py-2 px-4 text-sm ml-4 border
                  border-zinc-500  rounded"
      >
        
        Novo lançamento
      </button> */}
      <Link to={"/CreateItem"}> TEST</Link>
    </div>
  );
};
