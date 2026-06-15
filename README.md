# Whazzonline Store (Frontend)

A modern e-commerce frontend built with React, TypeScript, Redux Toolkit, RTK Query, and Tailwind CSS.

## Features

- Product listing with search and category filtering
- Product detail page
- Shopping cart with quantity management
- Cart persistence (redux-persist)
- Authentication flow (login/register)
- Protected checkout flow
- Toast notifications
- Dark / Light mode support
- Responsive UI

---

## Tech Stack
- React + TypeScript
- Redux Toolkit + RTK Query
- React Router
- Tailwind CSS
- redux-persist
- React Hot Toast
- Vite

---

## Installation

```bash
git clone https://github.com/BryanRussell523/Whazzonline-Store-frontend
cd Whazzonline-Store-frontend
npm install

## Running the app
npm run dev

App runs on:

http://localhost:5173

Key limitations:
1. No payment gateway integration yet
2. Basic authentication (JWT only)
3. No order history page yet
4. Backend must be running for full functionality

Future improvements:
1. Stripe / Paystack integration
2. User profile dashboard
3. Admin product management panel
4. Order tracking system