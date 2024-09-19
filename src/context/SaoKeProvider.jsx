import React, { createContext, useState } from "react";
import fs from "fs"
const SaoKeContext = createContext();

const SaoKeProvider = ({children}) => {
  const [data, setData] = useState([]);
  


  return (
    <SaoKeContext.Provider value={{ data, setData }}>
        {children}
    </SaoKeContext.Provider>
  );
};

export default SaoKeProvider;
