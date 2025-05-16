import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppRouter from './routes/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </>
  );
}

export default App;
