This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

- First, youd need to create a firebase project for use realtime dabase and add credentials to new `.env` looks like `env.exemple`

```env
  NEXT_PUBLIC_API_KEY=
  NEXT_PUBLIC_AUTH_DOMAIN=
  NEXT_PUBLIC_DATABASE_URL=
  NEXT_PUBLIC_PROJECT_ID=
  NEXT_PUBLIC_STORAGE_BUCKET=
  NEXT_PUBLIC_MESSAGING_SENDER_ID=
  NEXT_PUBLIC_APP_ID=
```

- Second, run development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About

this project is a recap nlw 6 application (letmeask) now using Next.js framework and recoil for state manager and stitches form component styles.

## Techs

- Next.js
- Typescript
- Recoil.js
- stitches
- react-toastfy
- firebase authentication
- firebase realtime database
