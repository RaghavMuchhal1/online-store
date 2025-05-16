import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../redux/slices/productSlice';
import AddProduct from './AddProduct';
import ProductCard from './ProductCard';
import SearchFilter from './SearchFilter';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleSearch = (searchTerm, minPrice, maxPrice) => {
    let filtered = products;

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

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">Admin Dashboard</h2>
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
