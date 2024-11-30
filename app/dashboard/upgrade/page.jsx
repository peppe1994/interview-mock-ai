"use client";
import { CheckIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSubscriptionByUserId } from "@/utils/db/action";
import { isFreeTrialExpired } from "@/utils/dateUtil";
//import { getSubscriptionByUserId } from "@/utils/db/action";

const pricingPlans = [
  {
    name: "Free",
    price: "0",
    features: [
      "100 AI-generated posts per month",
      "Twitter thread generation",
      "Basic analytics",
    ],
  },
  {
    name: "Basic",
    price: "9,99",
    priceId: "price_1QAboiLuCtmTgb35WcMKkyou",
    features: [
      "100 AI-generated posts per month",
      "Twitter thread generation",
      "Basic analytics",
    ],
  },
];

export default function PricingPage() {
  const { isSignedIn, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isFreeTrial, setIsFreeTrial] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (user?.createdAt && user.id) {
      getSubscriptionByUserId(user.id).then((res) => {
        const userRegistrationDate = new Date(user.createdAt);
        if(res && res.length > 0)
          setIsSubscribed(true);
        else if(!isFreeTrialExpired(userRegistrationDate))
          setIsFreeTrial(true);
      });
    }
  },[user])

  const handleSubscribe = async (priceId) => {
    if (!isSignedIn) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          userId: user?.id,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const { sessionId } = await response.json();
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10">
      <main className="container mx-auto px-8 py-20">
        <h1 className="text-5xl font-bold mb-12 text-center">Pricing Plans</h1>
        <div className="flex flex-row gap-4 items-center justify-center">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="p-8 rounded-lg border border-gray-800 flex flex-col"
            >
              <h2 className="text-2xl font-bold mb-4 ">{plan.name}</h2>
              <p className="text-4xl font-bold mb-6 ">
                ${plan.price}
                <span className="text-lg font-normal ">/month</span>
              </p>
              <ul className="mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center mb-3 text-gray-700"
                  >
                    <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.priceId && (
                <Button
                  onClick={() => handleSubscribe(plan.priceId)}
                  disabled={isLoading || (isSubscribed)}
                  className="w-full hover:bg-gray-800"
                >
                  {isSubscribed ? "Current": (isLoading ? "Processing..." : "Choose Plan")}
                </Button>
              )}
              {!plan.priceId && (
              <Link href={'/dashboard'}>
                <Button className="w-full hover:bg-gray-800" disabled={isFreeTrial}>
                  {isFreeTrial ? "Current": "Start 2 days free trial"}
                </Button>
              </Link>
              )} 
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
