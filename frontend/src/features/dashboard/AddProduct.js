import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, fetchProducts } from '../../redux/slices/productSlice';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();

  const handleAdd = async () => {
    if (name && description && price) {
      await dispatch(addProduct({ name, description, price }));
      setName('');
      setDescription('');
      setPrice('');
      dispatch(fetchProducts()); 
    }
  };

  return (
    <div className="add-product-form">
      <h3>Add Product</h3>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Product Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleAdd}>Add Product</button>
    </div>
  );
};

export default AddProduct;
