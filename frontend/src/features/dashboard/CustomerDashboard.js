import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.list);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="customer-home-container">
      <header className="customer-home-header">
        <h2>Customer Home</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>

      {!selectedProduct ? (
        <div className="product-list">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="product-card" 
              onClick={() => handleCardClick(product)}
            >
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="product-details">
          <h3>Product Details</h3>
          <p><strong>Name:</strong> {selectedProduct.name}</p>
          <p><strong>Description:</strong> {selectedProduct.description}</p>
          <p><strong>Price:</strong> ${selectedProduct.price}</p>
          <button className="back-button" onClick={handleCloseDetails}>Back to Products</button>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
