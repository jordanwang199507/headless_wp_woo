"use client";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function CheckoutForm({ cartItems, onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not loaded yet
    }

    setIsProcessingPayment(true);

    // Simple form validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.postalCode ||
      !formData.country
    ) {
      onError("Please fill in all the fields.");
      setIsProcessingPayment(false);
      return;
    }

    try {
      // Create a payment method with Stripe Elements
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          name: formData.name,
          email: formData.email,
          address: {
            line1: formData.address,
            city: formData.city,
            state: formData.state,
            postal_code: formData.postalCode,
            country: formData.country,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // Send the payment details and order to your server
      const response = await fetch("/api/createWooOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          paymentMethodId: paymentMethod.id,
          customerInfo: formData, // Send customer info with the order
        }),
      });

      const result = await response.json();

      if (result.success) {
        onSuccess();
      } else {
        throw new Error(result.error || "Payment failed");
      }
    } catch (error) {
      onError(error.message);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Payment Details</h2>

      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Postal Code:
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <h3>Card Information</h3>
      <CardElement />

      <button type="submit" disabled={!stripe || isProcessingPayment}>
        {isProcessingPayment ? "Processing Payment..." : "Place Order"}
      </button>
    </form>
  );
}

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Retrieve cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleSuccess = () => {
    // Clear the cart after successful order
    localStorage.removeItem("cart");
    // Redirect to home page
    router.push("/");
  };

  const handleError = (error) => {
    alert(`Error creating order: ${error}`);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <h2>Order Overview</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            Product ID: {item.id}, Quantity: {item.quantity}
          </li>
        ))}
      </ul>

      <Elements stripe={stripePromise}>
        <CheckoutForm
          cartItems={cartItems}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </Elements>
    </div>
  );
}
