// // pages/api/webhooks/stripe.js
// import { NextApiRequest, NextApiResponse } from "next";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const sig = req.headers["stripe-signature"];
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   } catch (err) {
//     console.error("Webhook Error:", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   switch (event.type) {
//     case "payment_intent.succeeded":
//       // Handle successful payment here
//       break;
//     case "payment_intent.payment_failed":
//       // Handle payment failure here
//       break;
//     // Handle other events
//     default:
//       console.warn(`Unhandled event type ${event.type}`);
//   }

//   res.status(200).json({ received: true });
// }
