import connectDB from '@/config/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { inngest } from '@/config/inngest'; // Ensure Inngest is initialized

export async function POST(request) {
  try {
    // Authenticate user
    const { userId } = getAuth(request);

    // Parse the request body to get address and items
    const { address, items } = await request.json();

    // Validate required fields
    if (!address || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid data' },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();

    // Calculate the total amount
    const amount = await items.reduce(async (accPromise, item) => {
      const acc = await accPromise;
      const product = await Product.findById(item.product);
      return acc + product.offerPrice * item.quantity;
    }, Promise.resolve(0));

    // Add a 2% fee to the total amount
    const totalAmount = amount + Math.floor(amount * 0.02);

    // Create a new order
    const newOrder = await Order.create({
      userId,
      items: items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        amount: item.quantity * item.offerPrice, // Calculate amount for each item
      })),
      address,
      amount: totalAmount,
      date: Date.now(),
    });

    // Send an event to Inngest
    await inngest.send({
      name: 'order/created',
      data: {
        userId,
        address,
        items,
        amount: totalAmount,
        date: Date.now(),
      },
    });

    // Clear the user's cart
    const user = await User.findById(userId);
    user.cartItems = [];
    await user.save();

    // Return success response
    return NextResponse.json(
      { success: true, message: 'Order Placed' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}