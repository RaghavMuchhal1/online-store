import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../redux/slices/productSlice';
import AddProduct from './AddProduct';
import ProductCard from './ProductCard';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">Admin Dashboard</h2>
      <AddProduct />
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
