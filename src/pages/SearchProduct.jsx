import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useProducts } from '../context/ProductContext';
import ProductTable from '../components/ProductTable';
import { useNavigate } from 'react-router-dom';

const SearchProduct = () => {
  const { products } = useProducts();
  const navigate = useNavigate();

  const [mode, setMode] = useState('all');
  const [query, setQuery] = useState({
    title: '',
    min: '',
    max: '',
    category: '',
  });

  const handleSearch = () => {
    if (mode == 'title') {
      return products.filter((p) =>
        p.title.toLowerCase().includes(query.title.toLowerCase())
      );
    }
    if (mode == 'category') {
      return products.filter((p) =>
        p.category.toLowerCase().includes(query.category.toLowerCase())
      );
    }

    if (mode == 'price') {
      return products.filter(
        (p) =>
          (!query.min || p.price >= Number(query.min)) &&
          (!query.max || p.price <= Number(query.max))
      );
    }

    return [];
  };

  const filteredProducts = mode == 'all' ? products : handleSearch();

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Search Product</h2>
        <button
          className="bg-black text-white px-3 py-1 rounded"
          onClick={() => navigate('/')}
        >
          Products
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        {['all', 'title', 'price', 'category'].map((item) => (
          <button
            key={item}
            onClick={() => setMode(item)}
            className={`px-3 py-1 border text-sm font-semibold rounded-xl ${mode === item ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            <span>{item.toUpperCase()}</span>
          </button>
        ))}
      </div>

      <div className="mb-6">
        {mode === 'title' && (
          <input
            placeholder="Enter Title"
            value={query.title}
            onChange={(e) => setQuery({ ...query, title: e.target.value })}
            className="border p-3 w-full"
          />
        )}
        {mode === 'category' && (
          <input
            placeholder="Enter Category"
            value={query.category}
            onChange={(e) => setQuery({ ...query, category: e.target.value })}
            className="border p-3 w-full"
          />
        )}
        {mode === 'price' && (
          <div className="flex gap-6">
            <input
              placeholder="Min Price"
              value={query.min}
              onChange={(e) => setQuery({ ...query, min: e.target.value })}
              className="border p-3 w-full"
            />
            <input
              placeholder="Max price"
              value={query.max}
              onChange={(e) => setQuery({ ...query, max: e.target.value })}
              className="border p-2 w-full"
            />
          </div>
        )}
      </div>

      {<ProductTable data={filteredProducts} />}
    </div>
  );
};

export default SearchProduct;
