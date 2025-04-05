import connectDB from "@/config/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key from .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    // Authenticate user
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse the request body to get address and items
    const { address, items } = await request.json();
    const origin = request.headers.get("origin");

    // Validate required fields
    if (!address || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid data" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();

    // Calculate amount and collect product data for Stripe
    let productData = [];
    const amount = await items.reduce(async (accPromise, item) => {
      const acc = await accPromise;
      const product = await Product.findById(item.product);
      if (!product) {
        throw new Error(`Product not found: ${item.product}`);
      }
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });
      return acc + product.offerPrice * item.quantity;
    }, Promise.resolve(0));

    // Add a 2% fee to the total amount
    const totalAmount = amount + Math.floor(amount * 0.02);

    // Create the order in MongoDB
    const order = await Order.create({
      userId,
      address,
      items: items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      })),
      amount: totalAmount,
      date: Date.now(),
      paymentType: "Stripe", // Default to COD; will update if Stripe payment succeeds
    });

    // Create line items for Stripe
    const line_items = productData.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe expects amount in cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/order-placed`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    const url = session.url;

    // Return the Stripe checkout URL
    return NextResponse.json({ success: true, url }, { status: 200 });
  } catch (error) {
    console.error("Error in Stripe payment:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}