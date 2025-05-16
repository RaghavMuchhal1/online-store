import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, setPage } from '../../redux/slices/productSlice';
import AddProduct from './AddProduct';
import ProductCard from './ProductCard';
import SearchFilter from './SearchFilter';
import Header from '../../components/Header';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { list: products, currentPage, totalPages } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  return (
    <div className="dashboard-container">
      <Header />
      <h2 className="dashboard-header">Admin Dashboard</h2>
      <SearchFilter />
      <AddProduct />
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} onDelete={handleDelete} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
