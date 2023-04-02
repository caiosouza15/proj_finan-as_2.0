import React from "react";

import TableItems from "./components/TableItems/index";
import NavBar from "./components/NavBar/index";
import { CreateItem } from "./components/CreateItem/CreateItem";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="w-screen h-screen bg-slate- flex flex-col items-center">
      <div className="w-screen h-32 flex justify-center items-center text-justify bg-slate-700">
        <p className="text-white text-3xl">FINANÇAS</p>
      </div>

      <NavBar />
      <TableItems />
      <Routes>
        <Route component={CreateItem} path={"/CreateItem"} />
      </Routes>      
    </div>
  );
};

export default App;
