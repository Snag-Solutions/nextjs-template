# Snag Solutions Template App

This repository contains a Next.js boilerplate with Tailwind CSS, designed to showcase a demo Web3 application. The demo illustrates how clients can utilize Snag SDK to quickly build a website featuring:

- Web3 authentication
- A loyalty program with a leaderboard
- A profile page displaying user account details and loyalty points history

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (latest LTS version recommended)
- PNPM (latest version)

### Installation

Clone the repository and install dependencies:

```sh
pnpm install
```

### Environment Variables

To use the application, you must configure the required environment variables in a `.env` file:

```env
SNAG_API_KEY=your_api_key
NEXT_PUBLIC_WEBSITE_ID=your_website_uuid
NEXT_PUBLIC_ORGANIZATION_ID=your_organization_uuid
LOYALTY_CURRENCY_ID=your_loyalty_currency_id
ENABLE_TWITTER_RULES=boolean # Optional
ENABLE_TELEGRAM_RULES=boolean # Optional
RULES_COLLECTIONS='[{"address":"0x123","network":"mainnet"}]' # Optional
```

You can generate your key and copy UUIDs in the API KEYS tab on the admin dashboard.

### Running the Development Server

Start the development server:

```sh
pnpm template:dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Setup Scripts

The repository includes two scripts to help manage loyalty rules:

#### 1. Add Basic Rule Sets for Your Website

This script sets up an initial loyalty program with predefined rules. You'll need to create your loyalty currency.

```sh
pnpm rules:create
```

#### 2. Clear All Existing Rules

This script removes all loyalty rules associated with your website. Use this if you want to start clean with the rules set.

```sh
pnpm rules:remove
```

## Documentation

For more details on how to get started with the Snag loyalty system, visit the [official Snag documentation](https://docs.snagsolutions.io/welcome)

---

This demo app is built using Next.js and Tailwind CSS, providing a foundation for Web3-based applications utilizing Snag's technology.


### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
