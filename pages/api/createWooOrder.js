import woocommerce from "../../utils/woocommerce";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Destructure request body inside the handler function
    const { cartItems, customerInfo, paymentMethodId } = req.body;

    // Create an order in WooCommerce
    const orderResponse = await woocommerce.post("/orders", {
      payment_method: "stripe",
      payment_method_title: "Stripe Payment",
      set_paid: false,
      billing: {
        first_name: customerInfo.name,
        email: customerInfo.email,
        address_1: customerInfo.address,
        city: customerInfo.city,
        state: customerInfo.state,
        postcode: customerInfo.postalCode,
        country: customerInfo.country,
      },
      line_items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    });

    const orderId = orderResponse.data.id;

    // Calculate the amount in cents
    const amount = Math.round(calculateOrderAmount(cartItems) * 100);

    // Create a Payment Intent with manual confirmation
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method: paymentMethodId,
      confirmation_method: "manual",
      confirm: true,
      return_url: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}`,
    });

    // Handle the payment confirmation
    if (paymentIntent.status === "succeeded") {
      // Update WooCommerce order status to completed
      await woocommerce.put(`/orders/${orderId}`, {
        status: "completed",
      });
    }

    // Respond with success and payment intent details
    res.status(200).json({
      success: true,
      order: orderResponse.data,
      paymentIntent: paymentIntent,
    });
  } catch (error) {
    console.error(
      "Error creating order or processing payment:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: error.response?.data || error.message });
  }
}

// Calculate the amount to be charged based on cart items
function calculateOrderAmount(cartItems) {
  return cartItems.reduce((total, item) => {
    const price = parseFloat(item.price); // Ensure price is a number
    if (isNaN(price)) {
      console.error(`Invalid price for item with ID ${item.id}: ${item.price}`);
      return total;
    }
    return total + price * item.quantity;
  }, 0);
}
