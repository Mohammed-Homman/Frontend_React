import React, { useState } from "react";
import "./orderCard.scss";


const OrderCard = ({ product, onRemoveProduct }) => {
  return (
    <div className="order-card">
      <img src={product.productCover} alt={`Product ${product.productId}`} />
      <div className="info">
        <p>{product.productName}</p>
        <p>Quantity: {product.quantity}</p>
        <p>${product.totalPrice}</p>
        <button onClick={() => onRemoveProduct(product.productId)}>Remove Product</button>
      </div>
    </div>
  );
};

export default OrderCard;