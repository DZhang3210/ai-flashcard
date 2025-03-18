import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { stripe } from "@/lib/stripe";
import { fetchQuery } from "convex/nextjs";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Stripe from "stripe";
import { SuccessEmail } from "@/emails/SuccessEmail";
import { render } from "@react-email/render";
// const resend = new Resend(process.env.RESEND_API_KEY as string);

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendSuccessEmail(
  email: string,
  productName: string,
  amount: number,
  receiptUrl?: string
) {
  try {
    const emailHtml = render(
      SuccessEmail({
        productName,
        amount,
        receiptUrl,
      })
    );

    await resend.emails.send({
      from: "AI Flashcard <no-reply@techdavidzhang1.com>",
      to: email,
      subject: "Welcome to AI Flashcard Premium! 🎉",
      html: await emailHtml,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature") as string;
  let event: Stripe.Event;
  // console.log("Stripe WEBHOOK SECRET", process.env.STRIPE_WEBHOOK_SECRET);
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: (err as Error).message || "Unknown error" }),
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    console.log("Stripe webhook received");
    console.log(event);
    const session = event.data.object;
    const receiptUrl = session.url;

    const productId = session.metadata?.productId;
    const userId = session.metadata?.userId;
    const email = session.customer_email;
    const pricePaidInCents = session.amount_total as number;

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

    await Promise.all([
      fetchMutation(api.orders.create, {
        productId: productId as Id<"products">,
        pricePaidInCents: pricePaidInCents,
        userId: userId as Id<"users">,
        receiptUrl: receiptUrl || "",
      }),
      fetchMutation(api.subscription.update, {
        userId: userId as Id<"users">,
        receiptUrl: receiptUrl || "",
        extraTime: currentPeriodEnd,
      }),
      // Send success email with receipt URL
      sendSuccessEmail(
        email,
        product.name,
        pricePaidInCents,
        receiptUrl || undefined
      ),
    ]);
  }
  return new NextResponse(null, { status: 200 });
  // } catch (error) {
  //   console.error("Stripe webhook error:", error);
  //   return new NextResponse(
  //     JSON.stringify({ error: (error as Error).message || "Unknown error" }),
  //     {
  //       status: 500,
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );
  // }
}
