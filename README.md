# MERN E-Commerce Project
---

This is a full-stack e-commerce application built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to browse products, add them to a cart, process payments via Stripe, and includes features like user authentication and image uploads via Cloudinary.
**Prerequisites**
To run this project, you need basic knowledge of:

- Node.js: Server-side JavaScript runtime
- React: Frontend library for building user interfaces
- Express.js: Web framework for Node.js
- MongoDB: NoSQL database


**Installation**
1. Clone the Repository
git clone https://github.com/yash936936/MERN_ECOMMERCEE.git
cd MERN_ECOMMERCEE

2. Install Dependencies

Backend:npm install


Frontend:cd frontend
npm install
cd ..



3. Set Up Environment Variables
This project requires environment variables for configuration. Set them manually in your terminal or during deployment. Do not hardcode sensitive data in the codebase.
Required Variables:

- PORT: Server port (e.g., 4000)
- DB_URI: MongoDB connection string (e.g., mongodb://localhost:27017/ecommerce or MongoDB Atlas URI)
- STRIPE_API_KEY: Stripe publishable key
- STRIPE_SECRET_KEY: Stripe secret key
- JWT_SECRET: Random string for JSON Web Tokens
- JWT_EXPIRE: Token expiration (e.g., 7d)
- COOKIE_EXPIRE: Cookie expiration in days (e.g., 7)
- SMPT_SERVICE: Email service (e.g., gmail)
- SMPT_MAIL: Email address for sending emails
- SMPT_PASSWORD: Email password or app-specific password
- SMPT_HOST: Email host (e.g., smtp.gmail.com)
- SMPT_PORT: Email port (e.g., 465)
- CLOUDINARY_NAME: Cloudinary cloud name
- CLOUDINARY_API_KEY: Cloudinary API key
- CLOUDINARY_API_SECRET: Cloudinary API secret
- SHOPIFY_API_KEY=shopify_api_key
- SHOPIFY_ACCESS_TOKEN=access_token
- SHOPIFY_STOREFRONT_TOKEN=storefront_token
- SHOPIFY_STORE_DOMAIN=shopify_domain_name
- SHOPIFY_WEBHOOK_SECRET=your_webhook_shared_secret


4. Run the Application

Backend:
npm start

Or, for development with auto-restart:
npm run dev

The backend runs on http://localhost:4000 (or your specified PORT).

Frontend:In a new terminal:
cd frontend
npm start

The frontend runs on http://localhost:3000.

Open http://localhost:3000 in your browser to view the application.


5. Build for Production

Build the frontend:cd frontend
npm run build


The backend serves the frontend/build directory for production.


**Troubleshooting**

MongoDB Connection: Ensure MongoDB is running locally or use a MongoDB Atlas URI.
Environment Variables: Verify all variables are set correctly.
