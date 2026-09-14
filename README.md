# Edo Forum Abuja

A premium community website for Edo Forum Abuja, built with Next.js, TypeScript, and a dark luxury design system.

## Local setup

1. Copy the example environment file:

```bash
cp .env.example .env.local
```

2. Add your real SMTP and Paystack values in `.env.local`.

3. Start the development server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the site.

## Required environment variables

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
CONTACT_EMAIL=hello@edoforumabuja.org
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxx
```

### SMTP notes

Use a Gmail or SMTP provider that supports app passwords. For Gmail, generate an App Password and place it in `SMTP_PASS`.

### Paystack notes

- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` is used in the browser when opening the inline donation form.
- `PAYSTACK_SECRET_KEY` is used only on the server for transaction verification in `/api/donate/verify`.

## Production deployment on Vercel

1. Push the project to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. When prompted for environment variables, add the same values from `.env.local`.
4. Set the production domain in `NEXT_PUBLIC_SITE_URL` to your live URL, for example:

```env
NEXT_PUBLIC_SITE_URL=https://edoforumabuja.org
```

5. Deploy.

## Server-side verification flow

The donation flow is wired to use Paystack in a secure pattern:

- Browser opens the Paystack inline popup using `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`.
- After payment succeeds, the browser sends the `reference` to `/api/donate/verify`.
- The server verifies the transaction using `PAYSTACK_SECRET_KEY` against the Paystack API.
- A thank-you page is shown only after server-side verification succeeds.

## Additional deployment notes

- For production, never expose `PAYSTACK_SECRET_KEY` in the browser.
- Add your real SMTP credentials only in the deployment environment, not in public code.
- If you use a custom domain, make sure the mail from address matches the domain or is approved by your SMTP provider.
