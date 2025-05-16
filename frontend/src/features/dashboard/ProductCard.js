import React, { useState } from 'react';
import EditProduct from './EditProduct';

const ProductCard = ({ product, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="product-card">
      {isEditing ? (
        <EditProduct product={product} onClose={() => setIsEditing(false)} />
      ) : (
        <>
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <div className="button-group">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button className="delete" onClick={() => onDelete(product.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
