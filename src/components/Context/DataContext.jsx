import { createContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../../dbConfig";

const initialValue = {};

export const DataContext = createContext(initialValue);

export function DadosProvider({ children }) {
  const [tableItems, setTableItems] = useState([]);
  const [category, setCategory] = useState([]);

  async function getDados() {
    const { data } = await supabase.from("registers").select();
    if (data.length) {
      return data;
    }
  }

  async function getCategorias() {
    const { data } = await supabase.from("categorias").select();
    if (data.length) {
      return data;
    }
  }

  useEffect(() => {
    getDados().then((data) => {
      setTableItems(data);
    });
    getCategorias().then((data) => {
      setCategory(data);
    });
  }, []);

  const value = useMemo(
    () => ({ tableItems, category }),
    [tableItems, category]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
