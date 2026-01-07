import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductTable from '../components/ProductTable';
import { FaSearch } from 'react-icons/fa';

const ProductList = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <div className="flex justify-end mb-4 gap-6">
        <button
          className="bg-black text-white px-3 py-1 rounded font-semibold"
          onClick={() => navigate('/search')}
        >
          <span className="flex justify-center items-center gap-3">
            <FaSearch /> Search
          </span>
        </button>

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
