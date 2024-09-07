"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Retrieve cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleProceedToCheckout = () => {
    // Navigate to the checkout page
    router.push("/checkout");
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                Product ID: {item.id}, Quantity: {item.quantity}, Price:
                {item.price}
              </li>
            ))}
          </ul>
          <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}
