# TypeScript E-Commerce Website Backend

## Deployment

- BACK_END website is deployed and can be accessed here: https://ecom-backend-9pyi.onrender.com
- React-Typescript-FRONT_END of this website is deployed at https://ecommerce-react-tau-ten.vercel.app
- Vanilla-JS-FRONT_END of this website is deployed at https://ecommerce-front-end-vanilla-js.vercel.app

**Backend is same for both Vanilla-JS-FRONT_END and REACT_FRONTEND Vanilla-Js front end just focuses on product display,product filtering,cart operations(CRUD) at local storage level. After that when user clicks CheckOut button,he will redirected to REACT_FRONTEND 's login page with his cart items as it is. There he can login/createAccount and do further procedings. His cart items will be as it is.**

This is a simple e-commerce website developed using TypeScript, Express, Mongoose, and MongoDB Cloud as database .

## Features

- Fetches product data from MongoDB Cloud database
- Displays all available products
- Filter Product based on price and name
- Add product to cart.
- Local Storage as well as mongo db cloud both is used to save cart data parallaly
- Order Operation (CRUD) in mongo db cloud.
- Payment Operation using Stipe and store everything in mongo db cloud.

## Tech Stack

- **Frontend:**

  - TypeScript
  - Vanilla JS
  - Tailwindcss
  - Redux Toolkit
  - Async Thunk for API calling

- **Backend:**
  - Express
  - TypeScript
  - Mongoose
  - MongoDB Cloud (for storing product data)

## Getting Started

1. Clone this repository.
2. cd/Ecommerce-Backend.
3. Install dependencies using `npm install`.
4. Create .env file and add env variables
   - PORT = 5000
   - MONGO_URI = **Your Mongo Could URL**
   - JWT_SECRET = **Any String**
   - CORS_URL = http://localhost:5173,https://ecommerce-front-end-vanilla-js.vercel.app
   - STRIPE_KEY = **Your Secret Key for stripe payment gateway**
5. package.json scripts
   - "build": "tsc",
   - "start": "node dist/indes.js",
   - "watch": "tsc -w",
   - "dev": "nodemon dist/index.js ",
6. Run the project locally with `npm run watch`.
7. Run the project locally with `npm run dev`.
