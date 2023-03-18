import React from "react";

import NavBar from './components/NavBar/index'

const  App = () => {
  return (
    <div className="w-screen h-screen bg-slate- flex flex-col items-center">
       
      <div className="w-screen h-32 flex justify-center items-center text-justify bg-slate-700">
        <p className="text-white text-3xl">FINANÇAS</p>        
      </div>
      <NavBar />   

    </div>
  )
}

export default App
