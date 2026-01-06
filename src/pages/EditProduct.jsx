import React from 'react';
import ProductForm from '../components/ProductForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useProducts();

  const Product = products.find((p) => p.id === Number(id));

  const handleUpdate = async (data) => {
    await updateProduct(id, data);
    navigate('/');
  };

  if (!products) return <p>Loading.....</p>;
  return (
    <>
      <ProductForm initialData={Product} onSubmit={handleUpdate} />
    </>
  );
};

export default EditProduct;
