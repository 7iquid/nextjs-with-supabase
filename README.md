# 🧭 Travejor Frontend (Next.js)

A minimal traveler profile web app built with **Next.js 15**, **React 19**, and **TailwindCSS**.
This frontend consumes the NestJS REST API to display and manage traveler profiles.

---

## 🚀 Tech Stack

- **Next.js 15** – App Router, API routes, fast dev server
- **React 19** – Component-based UI
- **TailwindCSS** – Utility-first responsive styling
- **Radix UI** + **Lucide Icons** – Accessible UI primitives and icons
- **Supabase (optional)** – For auth & SSR helpers
- **TypeScript** – Strong typing and developer experience

**Reasoning:** Next.js + Tailwind enables fast development, SSR/ISR, responsive design, and seamless backend integration.

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/v1    # Local NestJS API
# or for production
# NEXT_PUBLIC_API_URL=https://nestexpress.onrender.com/api/v1
```

---

## 🛠 Setup & Installation

1. **Clone the repo**

```bash
git clone https://github.com/7iquid/NestExpress.git travejor-frontend
cd travejor-frontend
```

2. **Install dependencies**

```bash
yarn install
```

3. **Run frontend dev server**

```bash
yarn dev
```

Open [http://localhost:3001](http://localhost:3001)

---

## 📱 Features

- Traveler profiles grid (avatar, username, bio, location, interests)
- Responsive card layout (mobile → desktop)
- Edit profile form (bio + interests)
- Dark theme with primary color `#FF6A00`
- Loading & error states

---

## 🧪 Development Notes

- Minimal UI for fast development
- TailwindCSS can be customized via `tailwind.config.js`
- API rewrites in `next.config.ts` proxy `/api/*` → NestJS API
