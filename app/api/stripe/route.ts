import { NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { stripe } from "@/lib/stripe";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
const settingUrl = absoluteUrl("/");

export async function GET() {
  try {
    const token = await convexAuthNextjsToken();
    const user = await fetchQuery(api.users.current, {}, { token });

    if (!user) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    const userSubscription = await fetchQuery(api.subscription.getByUserId, {
      userId: user._id,
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingUrl,
      });
      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingUrl,
      cancel_url: settingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "USD",

            product_data: {
              name: "Recall-AI",
              description: "Unlimited AI Generations",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user._id,
        productId: "",
      },
    });
    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
