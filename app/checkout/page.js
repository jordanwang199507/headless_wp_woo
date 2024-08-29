// app/checkout/page.js
"use client"; // This directive marks the component as a Client Component

import { useState } from "react";
import woocommerce from "../../utils/woocommerce";

export default function CheckoutPage() {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    try {
      const orderData = {
        payment_method: "bacs", // Example payment method
        billing: {
          first_name: "John",
          last_name: "Doe",
          address_1: "123 Main St",
          city: "Anytown",
          country: "US",
          email: "john.doe@example.com",
        },
        line_items: [
          {
            product_id: 123, // Example product ID
            quantity: 1,
          },
        ],
      };

      const { data } = await woocommerce.post("/orders", orderData);
      setOrder(data);
    } catch (err) {
      setError("Failed to create order");
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handleCheckout}>Place Order</button>
      {order && <p>Order created successfully! Order ID: {order.id}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
