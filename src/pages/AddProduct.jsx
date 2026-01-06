import React from 'react';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

const AddProduct = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const handleAdd = async (data) => {
    await addProduct(data);
    navigate('/');
  };

  return (
    <>
      <ProductForm onSubmit={handleAdd} />
    </>
  );
};

export default AddProduct;
