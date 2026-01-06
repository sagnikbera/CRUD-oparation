import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // all pdt
  const fetchProducts = async () => {
    setLoading(true);
    const res = await api.get("/products");
    setProducts(res.data);
    setLoading(false);
  };

  // add
  const addProduct = async (product) => {
    await api.post("/products", product);
    fetchProducts();
  };

  // update
  const updateProduct = async (id, product) => {
    await api.put(`/products/${id}`, product);
    fetchProducts();
  };

  // dlt
  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
