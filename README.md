# Next.js Project with SST, Sentry, and pnpm

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), enhanced with [SST (Serverless Stack)](https://sst.dev/), [Sentry](https://sentry.io/), and using [pnpm](https://pnpm.io/) as the package manager.

## Technologies Used

- [Next.js 13](https://nextjs.org/)
- [SST (Serverless Stack)](https://sst.dev/)
- [Sentry](https://sentry.io/)
- [pnpm](https://pnpm.io/)

## Getting Started

First, ensure you have pnpm installed. If not, you can install it using:

```bash
npm install -g pnpm
```

Then, install the project dependencies:

```
pnpm install
```

To run the development server:

```
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization)

## SST (Serverless Stack)

This project uses SST for infrastructure as code and serverless deployment. To learn more about SST and how it's integrated into this project, check out the [SST documentation](https://docs.sst.dev/)

## Sentry Integration

Sentry is integrated into this project for error tracking and performance monitoring. To configure Sentry, update the Sentry configuration in your project files. For more information, refer to the [Sentry documentation for Next.js](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
