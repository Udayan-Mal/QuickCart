import connectDB from '@/config/db';
import Address from '@/models/Address';
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Authenticate user
    const { userId } = getAuth(request);

    // Connect to the database
    await connectDB();

    // Find all addresses for the authenticated user
    const addresses = await Address.find({ userId });

    // Return the addresses
    return NextResponse.json(
      { success: true, addresses },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}