import Stripe from "stripe";

const stripeKey = process.env.SECRET_STRIPE_KEY || "";

export const stripe = new Stripe(stripeKey, {
  apiVersion: "2025-02-24.acacia",
  appInfo: {
    name: "Ignite Shop",
  },
});
