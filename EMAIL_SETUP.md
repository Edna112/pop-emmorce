# How to Make Contact Forms & Email Work

Your contact and "Contact Breeder" forms use **SMTP** (via `/api/contact` and `/api/contact-breeder`). Those API routes only run when the app runs with a **Node.js server**. They do **not** run when you only upload the static `out` folder (e.g. to PlanetHoster).

---

## Option 1: Run the full app on a Node host (recommended)

Deploy the **entire** Next.js app (not just the `out` folder) to a host that runs Node.js. Then your API routes and SMTP work.

### Steps (e.g. Vercel – free tier)

1. **Remove static export** (so the app runs as a server):
   - In `next.config.ts`, remove the line: `output: "export",` (and remove `images: { unoptimized: true }` if you want).
   - Remove `generateStaticParams` usage if you no longer need static export, or leave it; it still works with a server.

2. **Push your code** to GitHub (if not already).

3. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) → Sign in → **Add New** → **Project** → Import your repo.
   - **Environment Variables** (required for email):
     - `CONTACT_EMAIL` = your receiving email (e.g. `yorkiecharmm@gmail.com`)
     - `SMTP_HOST` = e.g. `smtp.gmail.com`
     - `SMTP_PORT` = `587`
     - `SMTP_USER` = your Gmail (or SMTP) address
     - `SMTP_PASS` = app password (for Gmail: use an [App Password](https://support.google.com/accounts/answer/185833), not your normal password)
   - Deploy. Your site will be at `https://your-project.vercel.app` and **forms will work**.

4. **Optional:** Point your own domain to the Vercel URL in Vercel’s project settings.

---

## Option 2: Keep static site on PlanetHoster, API on Vercel

Keep building the **static** `out` folder and hosting it on PlanetHoster, but send form submissions to a **separate** backend that runs your API (and SMTP).

### Steps

1. **Deploy the same project to Vercel** (as in Option 1) so that `/api/contact` and `/api/contact-breeder` run there. Add the same env vars (`CONTACT_EMAIL`, `SMTP_*`).

2. **When building the static site** (for PlanetHoster), set the API base URL so forms POST to Vercel:
   - Create or edit `.env.production` in the project root (or set in your build environment):
   ```env
   NEXT_PUBLIC_API_URL=https://your-app.vercel.app
   ```
   Replace `your-app.vercel.app` with your real Vercel URL.

3. **Build:**
   ```bash
   npm run build
   ```
   Upload the contents of the `out` folder to PlanetHoster as before.

4. **Result:** The site on PlanetHoster is static; when users submit the contact or contact-breeder form, the browser sends the request to `https://your-app.vercel.app/api/contact` or `.../api/contact-breeder`, and Vercel runs the API and sends the email via SMTP.

---

## Summary

| Where you host the *site* | Where the *API* runs | What to do |
|---------------------------|----------------------|------------|
| Vercel (or any Node host) | Same place           | Deploy full app, set env vars (Option 1). |
| PlanetHoster (static)     | Vercel               | Deploy app to Vercel for API; set `NEXT_PUBLIC_API_URL` when building `out` (Option 2). |

Your `.env.local` is only used when running or building **locally**. For Vercel (or any host), set the same variables in that host’s **Environment Variables** (or in `.env.production` for build-time values like `NEXT_PUBLIC_API_URL`).
