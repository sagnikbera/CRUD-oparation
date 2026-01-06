import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductTable from '../components/ProductTable';

const ProductList = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 px-3 py-1 rounded font-semibold"
          onClick={() => navigate('/add')}
        >
          + Add Product
        </button>
      </div>

      <ProductTable />
    </div>
  );
};

export default ProductList;
