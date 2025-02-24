// import connectDB from '@/config/db';
// import Address from '@/models/Address';
// import { getAuth } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   try {
//     // Authenticate user
//     const { userId } = getAuth(request);

//     // Parse the request body to get address data
//     const address = await request.json();

//     // Connect to the database
//     await connectDB();

//     // Create a new address with the user ID
//     const newAddress = await Address.create({ ...address, userId });

//     // Return success response
//     return NextResponse.json(
//       { success: true, message: 'Address added successfully', newAddress },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Error adding address:', error);
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }


import connectDB from '@/config/db';
import Address from '@/models/Address';
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Authenticate user
    const { userId } = getAuth(request);

    // Parse the request body to get address data
    const { fullName, phoneNumber, pincode, area, city, state } = await request.json();

    // Validate required fields
    if (!fullName || !phoneNumber || !pincode || !area || !city || !state) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();

    // Create a new address with the user ID
    const newAddress = await Address.create({
      userId,
      fullName,
      phoneNumber,
      pincode,
      area,
      city,
      state,
    });

    // Return success response
    return NextResponse.json(
      { success: true, message: 'Address added successfully', newAddress },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding address:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}