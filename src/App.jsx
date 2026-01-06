import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';

const App = () => {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={<ProductList />} 
          />
          <Route 
            path="/add" 
            element={<AddProduct />} 
          />
          <Route 
            path="/edit/:id" 
            element={<EditProduct />} 
          />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
};

export default App;
