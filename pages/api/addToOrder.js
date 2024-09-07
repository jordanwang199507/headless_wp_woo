import woocommerce from "../../utils/woocommerce";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { items } = req.body;

    try {
      if (!items || items.length === 0) {
        return res
          .status(400)
          .json({ success: false, error: "No items in cart" });
      }

      // Create an order with multiple line items in WooCommerce
      const { data: order } = await woocommerce.post("/orders", {
        line_items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      });

      res.status(200).json({ success: true, order });
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
