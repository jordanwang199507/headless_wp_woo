# 🌓 HeadlessWoo

### This is a headless e-commerce application built with Next.js, leveraging WordPress and WooCommerce as the backend.

[![made-with-Next](https://img.shields.io/badge/Made%20with-Next.js%20-success)](https://nextjs.org/)
[![made-with-WordPress](https://img.shields.io/badge/Made%20with-WordPress%20-blue)](https://wordpress.com/)
[![made-with-WooCommerce](https://img.shields.io/badge/Made%20with-WooCommerce%20-yellow)](https://woocommerce.com/)
[![made-with-Stripe](https://img.shields.io/badge/Made%20with-Stripe%20-orange)](https://stripe.com/)

## 📑 Table of Content
- [🌓 HeadlessWoo](#-headlesswoo)
  - [📑 Table of Content](#-table-of-content)
  - [🌟 Features](#-features)
  - [🧱 Dependencies](#-dependencies)
  - [🚀 Getting Started](#-getting-started)
  - [📘 Acknowledgements](#-ackowledgements)
  - [🔨 Created By](#-created-by)
    
## 📷 Thumbnails
<img src="https://github.com/user-attachments/assets/ee97353c-2bb1-4396-a135-8bc732929039" alt="Thumbnail 1" width="500" height="300">
<img src="https://github.com/user-attachments/assets/72f619ed-1c0d-4118-a4b6-97dd0eb5136e" alt="Thumbnail 2" width="500" height="300">

## 🌟 Features

- **Headless CMS**: Utilizes WordPress and WooCommerce as a backend to manage content and products.
- **Next.js Framework**: Provides server-side rendering and static site generation.
- **Stripe Integration**: Secure payment processing through Stripe.
- **GraphQL API**: Efficient data fetching with Apollo Client.

## 🧱 Dependencies

### Core

- `next`: ^14.2.5
- `react`: ^18
- `react-dom`: ^18

### State Management and Data Fetching

- `@apollo/client`: ^3.11.4
- `@apollo/experimental-nextjs-app-support`: ^0.11.2
- `graphql`: ^15.9.0
- `react-query`: ^3.39.3

### Payment Integration

- `@stripe/react-stripe-js`: ^2.8.0
- `@stripe/stripe-js`: ^4.4.0
- `stripe`: ^16.10.0

### Styling

- `tailwindcss`: ^3.4.1

### Utilities

- `axios`: ^1.7.4
- `@svgr/webpack`: ^8.1.0

## 🚀 Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
2. Install all the depndencies <br>
   `npm install`
3. Create local.env
   ```
    CONSUMER_KEY=
    CONSUMER_SECRET=
    NEXT_PUBLIC_WORDPRESS_API_URL=
    STRIPE_SECRET_KEY=
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
    STRIPE_WEBHOOK_SECRET=
   ```
4. NEXT_PUBLIC_WORDPRESS_API_URL is the wordpress url, for example. 'https://navajowhite-yak-294103.hostingersite.com'
5. Navigate to WordPress WooCommerce -> Settings -> Advanced -> REST API -> Add Key
6. Once key generated update the CONSUMER_KEY and CONSUMER_SECRET
7. Setup Stripe testing account
8. Stripe Dashboard -> Overview; will have the STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
9. On Stripe Dashboard -> Webhooks; will have Signing Secret, use that to update STRIPE_WEBHOOK_SECRET
10. Run the server
   ```sh
   npm run dev
   ```

## Acknowledgements
- Next.js
- WordPress
- WooCommerce
- Stripe
- Tailwind CSS
- Apollo Client
- React Query

## 🔨 Created By

- Jordan Wang @jordanwang199507
