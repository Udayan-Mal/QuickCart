import connectDB from '@/config/db';
import User from '@/models/User';
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Authenticate user
    const { userId } = getAuth(request);

    // Connect to the database
    await connectDB();

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Extract cart items from the user document
    const { cartItems } = user;

    // Return the cart items
    return NextResponse.json(
      { success: true, cartItems },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}