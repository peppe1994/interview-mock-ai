import { createOrUpdateSubscription } from "@/utils/db/action";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-09-30.acacia",
});

export async function POST(req) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature");

  if (!signature) {
    console.error("No Stripe signature found");
    return NextResponse.json({ error: "No Stripe signature" }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err}`);
    return NextResponse.json(
      { error: `Webhook Error` },
      { status: 400 }
    );
  }

  console.log(`Received event type: ${event.type}`);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.client_reference_id;
    const subscriptionId = session.subscription;

    if (!userId || !subscriptionId) {
      console.error("Missing userId or subscriptionId in session", { session });
      return NextResponse.json(
        { error: "Invalid session data" },
        { status: 400 }
      );
    }

    try {
      console.log(`Retrieving subscription: ${subscriptionId}`);
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      console.log("Retrieved subscription:", subscription);

      if (!subscription.items.data.length) {
        console.error("No items found in subscription", { subscription });
        return NextResponse.json(
          { error: "Invalid subscription data" },
          { status: 400 }
        );
      }

      const priceId = subscription.items.data[0].price.id;
      console.log(`Price ID: ${priceId}`);

      let plan;

      // Map price IDs to plan names and points
      switch (priceId) {
        case "price_1QAboiLuCtmTgb35WcMKkyou":
          plan = "Basic";
          break;
        default:
          console.error("Unknown price ID", { priceId });
          return NextResponse.json(
            { error: "Unknown price ID" },
            { status: 400 }
          );
      }

      console.log(`Creating/updating subscription for user ${userId}`);  
      const updatedSubscription = await createOrUpdateSubscription(
        userId,
        subscriptionId,
        plan,
        "active",
        new Date(subscription.current_period_start * 1000),
        new Date(subscription.current_period_end * 1000)
      );

      if (!updatedSubscription) {
        console.error("Failed to create or update subscription");
        return NextResponse.json(
          { error: "Failed to create or update subscription" },
          { status: 500 }
        );
      }
      console.log(`Successfully processed subscription for user ${userId}`);
    } catch (error) {
      console.error("Error processing subscription:", error);
      return NextResponse.json(
        { error: "Error processing subscription", details: 'Error during subscription' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}