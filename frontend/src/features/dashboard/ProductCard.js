import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditProduct from './EditProduct';

const ProductCard = ({ product, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { role } = useSelector((state) => state.auth);

  return (
    <div className="product-card">
      {isEditing ? (
        <EditProduct product={product} onClose={() => setIsEditing(false)} />
      ) : (
        <>
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          {role === 'admin' && (
            <div className="button-group">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button className="delete" onClick={() => onDelete(product.id)}>Delete</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductCard;
