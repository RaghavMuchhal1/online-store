import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../redux/slices/productSlice';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import AddProduct from './AddProduct';
import ProductCard from './ProductCard';
import SearchFilter from './SearchFilter';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.list);
  const { role, username } = useSelector((state) => state.auth);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let filtered = products;

    if (role === 'admin') {
      filtered = products.filter((product) => product.createdBy === username);
    }

    setFilteredProducts(filtered);
  }, [products, role, username]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleSearch = (searchTerm, minPrice, maxPrice) => {
    let filtered = products;

    if (role === 'admin') {
      filtered = products.filter((product) => product.createdBy === username);
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (minPrice) {
      filtered = filtered.filter((product) => product.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((product) => product.price <= parseFloat(maxPrice));
    }

    setFilteredProducts(filtered);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>
      <SearchFilter onSearch={handleSearch} />
      <AddProduct />
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
