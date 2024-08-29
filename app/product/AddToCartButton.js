// app/product/AddToCartButton.js
"use client"; // This directive marks the component as a Client Component

import { useState } from "react";

export default function AddToCartButton({ productId }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    // Implement your add-to-cart functionality here
    alert(`Product ${productId} added to cart!`);
    setIsAdded(true);
  };

  return (
    <button onClick={handleAddToCart} disabled={isAdded}>
      {isAdded ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
