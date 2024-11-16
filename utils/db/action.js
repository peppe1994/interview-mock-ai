import { eq } from "drizzle-orm";
import { db } from "../db";
import { Subscriptions } from "../schema";

export async function getSubscriptionByUserId(userId) {
  const existingSubscription = await db
    .select()
    .from(Subscriptions)
    .where(eq(Subscriptions.userId, userId))
    .limit(1);

  if (!existingSubscription) return null;
  else return existingSubscription;
}
export async function createOrUpdateSubscription(
  userId,
  stripeSubscriptionId,
  plan,
  status,
  currentPeriodStart,
  currentPeriodEnd
) {
  try {
    const existingSubscription = await db
      .select()
      .from(Subscriptions)
      .where(eq(Subscriptions.stripeSubscriptionId, stripeSubscriptionId))
      .limit(1);

    let subscription;
    if (existingSubscription.length > 0) {
      // Update existing subscription
      [subscription] = await db
        .update(Subscriptions)
        .set({
          plan,
          status,
          currentPeriodStart,
          currentPeriodEnd,
        })
        .where(eq(Subscriptions.stripeSubscriptionId, stripeSubscriptionId))
        .returning()
        .execute();
    } else {
      [subscription] = await db
        .insert(Subscriptions)
        .values({
          userId: userId,
          stripeSubscriptionId,
          plan,
          status,
          currentPeriodStart,
          currentPeriodEnd,
        })
        .returning()
        .execute();
    }

    console.log("Subscription created or updated:", subscription);
    return subscription;
  } catch (error) {
    console.error("Error creating or updating subscription:", error);
  }
}
