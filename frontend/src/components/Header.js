import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="app-header">
      <h1>Online Store</h1>
      <nav>
        <a href="/">Home</a>
        {role === 'admin' && <a href="/dashboard">Dashboard</a>}
        {role === 'customer' && <a href="/customer-home">Products</a>}
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </nav>
    </header>
  );
};

export default Header;
