import React from 'react';

const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="product-card">
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => onDelete(product.id)}>Delete</button>
    </div>
  );
};

export default ProductCard;
