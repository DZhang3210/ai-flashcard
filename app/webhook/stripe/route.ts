import { NextRequest, NextResponse } from "next/server";
// import { Resend } from "resend";
import { stripe } from "@/lib/stripe";
import { fetchQuery } from "convex/nextjs";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
// const resend = new Resend(process.env.RESEND_API_KEY as string);
export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );
  console.log("Stripe webhook received");

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    const receiptUrl = event.data.object.receipt_url;

    const productId = charge.metadata.productId;
    const userId = charge.metadata.userId;
    const email = charge.billing_details.email;
    const pricePaidInCents = charge.amount;

    const product = await fetchQuery(api.products.getById, {
      id: productId as Id<"products">,
    });
    if (product == null || email == null) {
      return new NextResponse("Bad Request", { status: 400 });
    }
    const currentPeriodEnd = product.additionalTime;
    // const userFields = {
    //   email,
    //   orders: { create: { productId, pricePaidInCents } },
    // };

    await fetchMutation(api.orders.create, {
      productId: productId as Id<"products">,
      pricePaidInCents,
      userId: userId as Id<"users">,
    });

    await fetchMutation(api.subscription.update, {
      userId: userId as Id<"users">,
      receiptUrl: receiptUrl as string,
      extraTime: currentPeriodEnd,
    });
    return new NextResponse("Success", { status: 200 });
  }
  return new NextResponse();
}
