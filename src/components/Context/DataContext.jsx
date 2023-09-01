import { createContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../../dbConfig";

const initialValue = {};

export const DataContext = createContext(initialValue);

export function DadosProvider({ children }) {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);

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
      setItems(data);
    });
    getCategorias().then((data) => {
      setCategory(data);
    });
  }, []);

  const value = useMemo(
    () => ({ items, category, modalIsOpen, setmodalIsOpen }),
    [items, category, modalIsOpen, setmodalIsOpen]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
