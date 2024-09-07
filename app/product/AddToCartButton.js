// // app/product/AddToCartButton.js
// "use client"; // This directive marks the component as a Client Component

// import { useState } from "react";

// export default function AddToCartButton({ productId }) {
//   const [isAdded, setIsAdded] = useState(false);

//   const handleAddToCart = () => {
//     // Implement your add-to-cart functionality here
//     alert(`Product ${productId} added to cart!`);
//     setIsAdded(true);
//   };

//   return (
//     <button onClick={handleAddToCart} disabled={isAdded}>
//       {isAdded ? "Added to Cart" : "Add to Cart"}
//     </button>
//   );
// }

"use client";

import { useState } from "react";

export default function AddToCartButton({ productId, price }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async () => {
    try {
      // Add to cart logic (updating localStorage or using an API)
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if the product is already in the cart
      const existingProduct = cart.find((item) => item.id === productId);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ id: productId, quantity: 1, price: price });
      }

      // Save cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`Product ${productId} added to cart!`);
      setIsAdded(true);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <button onClick={handleAddToCart} disabled={isAdded}>
      {isAdded ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}

// "use client";

// import { useState } from "react";

// export default function AddToCartButton({ productId }) {
//   const [isAdded, setIsAdded] = useState(false);

//   const handleAddToCart = async () => {
//     try {
//       const response = await fetch("/api/addToCart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ productId }),
//       });

//       // Check if the response is not ok (e.g., 404 or 500)
//       if (!response.ok) {
//         const errorText = await response.text(); // Get the raw response text
//         throw new Error(`Request failed: ${errorText}`);
//       }

//       const result = await response.json(); // Parse the JSON response

//       if (result.success) {
//         alert(`Product ${productId} added to cart!`);
//         setIsAdded(true);
//       } else {
//         alert(`Failed to add product to cart: ${result.error}`);
//       }
//     } catch (error) {
//       console.error("Error adding product to cart:", error.message);
//       alert(`Error adding product to cart: ${error.message}`);
//     }
//   };

//   return (
//     <button onClick={handleAddToCart} disabled={isAdded}>
//       {isAdded ? "Added to Cart" : "Add to Cart"}
//     </button>
//   );
// }
