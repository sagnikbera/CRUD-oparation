import React from 'react';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const ProductTable = () => {
  const { products, deleteProduct, loading } = useProducts();
  const navigate = useNavigate();

  const columns = [
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => `$${row.price}`,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.category,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-blue-500 text-wh rounded"
            onClick={() => navigate(`/edit/${row.id}`)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 bg-red-500/70 text-white rounded"
            onClick={() => deleteProduct(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <DataTable
        title="Products"
        columns={columns}
        data={products}
        progressPending={loading}
        pagination
        highlightOnHover
      />
    </>
  );
};

export default ProductTable;
