# QuickCart - Full Stack E-Commerce Website

QuickCart is a modern, full-stack e-commerce platform built with **Next.js**. It features **user authentication**, **product management**, **cart functionality**, **order tracking**, and an **admin dashboard**. The project integrates **Clerk for authentication**, **Inngest for background jobs**, **MongoDB for data storage**, and **Cloudinary for image hosting**. Deployed on **Vercel** for public access.

## 🚀 Live Demo
👉 [QuickCart Live](https://quick-cart-rose.vercel.app)

## 🔥 Features

### 🛍 User Features
- **User Authentication**: Secure login and signup using **Clerk**.
- **Product Browsing**: View products with details like name, description, price, and images.
- **Cart System**: Add products to the cart, update quantities, and remove items.
- **Order Placement**: Checkout with a selected shipping address.
- **Order History**: View past orders and their status.
- **Checkout**: Multiple payment options (Stripe + COD)

### ⚡ Admin Features
- **Product Management**:
  - Add new products with images, descriptions, and pricing.
  - Update existing product details.
  - List and manage all products.
- **Order Management**:
  - View all user orders.
  - Update order status (e.g., shipped, delivered).
- **Dashboard**: Sales analytics

### 🛠 Technical Features
- **Background Jobs**: Efficient order processing and user data synchronization using **Inngest**.
- **Image Storage**: Secure product image storage with **Cloudinary**.
- **Database**: MongoDB for storing user data, products, and orders.
- **Responsive UI**: Optimized for mobile and desktop.
- **Deployment**: Hosted on **Vercel**.

### 💳 New Payment Features
- **Stripe Integration**: Secure credit card payments
- **COD Option**: Cash on Delivery
- **Webhook Handling**: Real-time payment status updates
- **Receipt Generation**: Automatic payment confirmation

## 📌 Tech Stack
- **Framework**: Next.js (v15.1.6)
- **Authentication**: Clerk
- **Database**: MongoDB
- **Background Jobs**: Inngest
- **Image Storage**: Cloudinary
- **Deployment**: Vercel
- **Dependencies**: axios, react-hot-toast, mongoose

---

## 🛠 Tech Stack
| Category          | Technology                          |
|-------------------|-------------------------------------|
| Framework         | Next.js 15                          |
| Authentication    | Clerk                               |
| Database          | MongoDB                             |
| Payments          | Stripe                              |
| Background Jobs   | Inngest                             |
| Image Storage     | Cloudinary                          |
| Styling           | Tailwind CSS                        |
| Deployment        | Vercel                              |

---

## 🛠 Getting Started

### 📌 Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local or Atlas account)
- **Git**

### 🔹 Installation

#### Clone the Repository:
```bash
git clone https://github.com/Udayan-Mal/QuickCart.git
cd QuickCart
```

#### Install Dependencies:
```bash
npm install  # or yarn install or pnpm install
```

#### Set Up Environment Variables:
Create a `.env.local` file in the root directory and add the following:
```plaintext
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```
Obtain the required keys from Clerk, Cloudinary, and Inngest dashboards.

#### Run the Development Server:
```bash
npm run dev  # or yarn dev or pnpm dev
```
Visit **[http://localhost:3000](http://localhost:3000)** to see the app.

---

## 📌 Usage

### 👤 User Actions
- Browse products and add them to the cart at `/`.
- View and manage orders at `/my-orders`.

### 🏪 Seller/Admin Actions
- Add products via `/seller` (requires **seller role** in Clerk).
- Manage orders at `/seller/orders`.

---

## 📂 Project Structure
```
QuickCart/
├── app/                  # Next.js app directory
│   ├── api/             # API routes (cart, order, product, user)
│   ├── my-orders/       # Customer orders page
│   ├── seller/          # Seller dashboard
│   └── page.js          # Homepage
├── components/          # React components
├── config/              # DB and Inngest configs
├── context/             # App context
├── lib/                 # Utilities (e.g., authSeller)
├── models/              # Mongoose models
├── public/              # Static assets
└── .env                 # Environment variables
```

---

## 🔗 API Endpoints
| Method | Endpoint | Description | Authentication |
|--------|---------|-------------|---------------|
| GET | `/api/product/list` | List products | None |
| POST | `/api/product/add` | Add product | Seller |
| GET | `/api/order/list` | List user orders | User |
| GET | `/api/order/seller-orders` | List all orders | Seller |
| POST | `/api/order/create` | Create order | User |
| GET | `/api/user/get-address` | Get addresses | User |
| POST | `/api/user/add-address` | Add address | User |
| POST | `/api/cart/update` | Update cart | User |
| GET | `/api/cart/get` | Get cart | User |

---

## 📚 Learn More
- **[Next.js Docs](https://nextjs.org/docs)** - Learn about Next.js features and API.
- **[Clerk Docs](https://clerk.dev/docs)** - Authentication setup.
- **[Inngest Docs](https://www.inngest.com/docs)** - Background job management.
- **[MongoDB Docs](https://www.mongodb.com/docs)** - Database setup.
- **[Cloudinary Docs](https://cloudinary.com/documentation)** - Image storage.

---

## 🚀 Deployment on Vercel

The easiest way to deploy is using **Vercel**:

#### Push to GitHub:
```bash
git add .
git commit -m "Deploy QuickCart"
git push origin main
```

#### Deploy on Vercel:
1. Link your GitHub repository to Vercel.
2. Add **.env** variables in the Vercel dashboard.
3. Click **Deploy**!

See **[Next.js Deployment Guide](https://nextjs.org/docs/deployment)** for more details.

---

## 🤝 Contributing
Contributions are welcome! Follow these steps:
1. **Fork** the repository.
2. **Create a branch** (`git checkout -b feature/your-feature`).
3. **Commit changes** (`git commit -m "Add feature"`).
4. **Push the branch** (`git push origin feature/your-feature`).
5. **Open a Pull Request**.

---

## 📜 License
This project is licensed under the **MIT License**. See the **LICENSE** file for details.

---

## 🎉 Acknowledgments
- **Clerk** - Seamless authentication.
- **Inngest** - Efficient background jobs.
- **Cloudinary** - Reliable image storage.
- **Vercel** - Hassle-free deployment.

---

## 📧 Contact
For any questions or feedback, reach out to:
- **Udayan Mal**
- **GitHub**: [Udayan-Mal](https://github.com/Udayan-Mal)


