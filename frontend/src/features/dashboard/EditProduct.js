import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct, fetchProducts } from '../../redux/slices/productSlice';

const EditProduct = ({ product, onClose }) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    await dispatch(updateProduct({ id: product.id, productData: { name, description, price } }));
    dispatch(fetchProducts());
    onClose();
  };

  return (
    <div className="edit-product-form">
      <h3>Edit Product</h3>
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
      <button onClick={handleUpdate}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditProduct;
