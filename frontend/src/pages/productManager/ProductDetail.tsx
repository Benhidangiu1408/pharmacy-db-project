import React from 'react'
import { useLocation } from 'react-router-dom';

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state?.product;
  if (!product) {
    return <div>Product not found.</div>; // Or redirect, or show an error message
  } else
  return <div>{product.name}</div>
}

export default ProductDetail