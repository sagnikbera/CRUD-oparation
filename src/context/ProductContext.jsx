import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetechProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetechProducts();
  }, []);

  //add
  const addProduct = async (product) => {
    try {
      await api.post('/products', product);

      setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
    } catch (error) {
      console.error('ADD', error);
    }
  };

  //update
  const updateProduct = async (id, updatedProduct) => {
    try {
      await api.put(`/products/${id}`, updatedProduct);
      setProducts((prev) =>
        prev.map((p) => (p.id === Number(id) ? { ...p, ...updatedProduct } : p))
      );
    } catch (error) {
      console.log('UPDATE', error);
    }
  };

  //delete
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Delete', error);
    }
  };

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
