MERN E-Commerce Project
This is a full-stack e-commerce application built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to browse products, add them to a cart, process payments via Stripe, and includes features like user authentication and image uploads via Cloudinary.
Prerequisites
To run this project, you need basic knowledge of:

Node.js: Server-side JavaScript runtime
React: Frontend library for building user interfaces
Express.js: Web framework for Node.js
MongoDB: NoSQL database


Installation
1. Clone the Repository
git clone https://github.com/yash936936/MERN_ECOMMERCEE.git
cd MERN_ECOMMERCEE

2. Install Dependencies

Backend:npm install


Frontend:cd frontend
npm install
cd ..



3. Set Up Environment Variables
This project requires environment variables for configuration. Set them manually in your terminal or during deployment (e.g., on Heroku). Do not hardcode sensitive data in the codebase.
Required Variables:

PORT: Server port (e.g., 4000)
DB_URI: MongoDB connection string (e.g., mongodb://localhost:27017/ecommerce or MongoDB Atlas URI)
STRIPE_API_KEY: Stripe publishable key
STRIPE_SECRET_KEY: Stripe secret key
JWT_SECRET: Random string for JSON Web Tokens
JWT_EXPIRE: Token expiration (e.g., 7d)
COOKIE_EXPIRE: Cookie expiration in days (e.g., 7)
SMPT_SERVICE: Email service (e.g., gmail)
SMPT_MAIL: Email address for sending emails
SMPT_PASSWORD: Email password or app-specific password
SMPT_HOST: Email host (e.g., smtp.gmail.com)
SMPT_PORT: Email port (e.g., 465)
CLOUDINARY_NAME: Cloudinary cloud name
CLOUDINARY_API_KEY: Cloudinary API key
CLOUDINARY_API_SECRET: Cloudinary API secret

Set Variables Locally (Windows):
set PORT=4000
set DB_URI=mongodb://localhost:27017/ecommerce
set STRIPE_API_KEY=your_stripe_publishable_key
set STRIPE_SECRET_KEY=your_stripe_secret_key
set JWT_SECRET=your_random_secret_string
set JWT_EXPIRE=7d
set COOKIE_EXPIRE=7
set SMPT_SERVICE=gmail
set SMPT_MAIL=your_email@gmail.com
set SMPT_PASSWORD=your_email_app_password
set SMPT_HOST=smtp.gmail.com
set SMPT_PORT=465
set CLOUDINARY_NAME=your_cloudinary_name
set CLOUDINARY_API_KEY=your_cloudinary_api_key
set CLOUDINARY_API_SECRET=your_cloudinary_api_secret

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

Deployment to Heroku

Install the Heroku CLI: Heroku CLI
Log in:heroku login


Create a Heroku app:heroku create your-app-name


Set environment variables:heroku config:set PORT=4000
heroku config:set DB_URI=your_mongodb_atlas_uri
heroku config:set STRIPE_API_KEY=your_stripe_publishable_key
heroku config:set STRIPE_SECRET_KEY=your_stripe_secret_key
heroku config:set JWT_SECRET=your_random_secret_string
heroku config:set JWT_EXPIRE=7d
heroku config:set COOKIE_EXPIRE=7
heroku config:set SMPT_SERVICE=gmail
heroku config:set SMPT_MAIL=your_email@gmail.com
heroku config:set SMPT_PASSWORD=your_email_app_password
heroku config:set SMPT_HOST=smtp.gmail.com
heroku config:set SMPT_PORT=465
heroku config:set CLOUDINARY_NAME=your_cloudinary_name
heroku config:set CLOUDINARY_API_KEY=your_cloudinary_api_key
heroku config:set CLOUDINARY_API_SECRET=your_cloudinary_api_secret


Deploy:git push heroku main


Open the app:heroku open



Troubleshooting

MongoDB Connection: Ensure MongoDB is running locally or use a MongoDB Atlas URI.
Environment Variables: Verify all variables are set correctly.
Heroku Logs: Check logs with heroku logs --tail for deployment issues.
