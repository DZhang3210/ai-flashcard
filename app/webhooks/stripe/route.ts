import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { NextRequest, NextResponse } from "next/server";
// import { Resend } from "resend";
import { stripe } from "@/lib/stripe";
// const resend = new Resend(process.env.RESEND_API_KEY as string);
export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    const productId = charge.metadata.productId;
    const email = charge.billing_details.email;
    // const pricePaidInCents = charge.amount;

    const product = await fetchQuery(api.products.getById, {
      id: productId as Id<"products">,
    });
    console.log("EMAIL,PRODUCT", email, product);
    if (product == null || email == null) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    // const userFields = {
    //   email,
    //   orders: { create: { productId, pricePaidInCents } },
    // };

    // const orderId = await fetchMutation(api.orders.create, {
    //   productId: productId as Id<"products">,
    //   pricePaidInCents,
    // });

    // const {
    //   orders: [order],
    // } = await prisma.user.upsert({
    //   where: { email },
    //   create: userFields,
    //   update: userFields,
    //   select: { orders: { orderBy: { createdAt: "desc" }, take: 1 } },
    // });

    // const downloadVerification = await prisma.downloadVerification.create({
    //   data: {
    //     productId,
    //     expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    //   },
    // });

    // await resend.emails.send({
    //   from: `Support <${process.env.SENDER_EMAIL}>`,
    //   to: email,
    //   subject: "Order Confirmation",
    //   react: (
    //     <PurchaseReceiptEmail
    //       order={order}
    //       product={product}
    //       downloadVerificationId={downloadVerification.id}
    //     ></PurchaseReceiptEmail>
    //   ),
    // });
  }
  return new NextResponse();
}
