import { createContext, useEffect, useMemo, useState } from 'react';
import { getDados } from '../../helpers';

const initialValue = {};

export const DataContext = createContext(initialValue);

export function DadosProvider({ children }) {
  const [response, setResponse] = useState([]);

  
  useEffect(() => {
      getDados().then((dados) => {
          setResponse(dados);
        });
    }, []);    
    
const value = useMemo(() => ({ response }), [response]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
