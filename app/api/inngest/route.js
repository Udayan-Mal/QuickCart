// import { serve } from "inngest/next";
// import { inngest, syncUserCreation, syncUserDeletion, syncUserUpdation } from "@/config/inngest";

// // Create an API that serves zero functions
// export const { GET, POST, PUT } = serve({
//   client: inngest,
//   functions: [
//     syncUserCreation,
//     syncUserDeletion,
//     syncUserUpdation,
//     createUserOrder
//   ],
// });


import { serve } from 'inngest/next';
import {
  inngest,
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
  createUserOrder, // Add this import
} from '@/config/inngest';

// Create an API that serves multiple functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation,
    createUserOrder, // Add this function
  ],
});