---
# 🧭 Travejor Frontend (Next.js)

A minimal traveler profile web app built with **Next.js 15**, **React 19**, and **TailwindCSS**.
This frontend consumes the **NestJS REST API (Dockerized backend)** to display and manage traveler profiles.
---

## 🚀 Tech Stack

**Frontend**

- **Next.js 15** – App Router, API routes, fast dev server
- **React 19** – Component-based UI
- **TailwindCSS** – Utility-first responsive styling
- **Radix UI** + **Lucide Icons** – Accessible UI primitives and icons
- **Supabase (optional)** – For auth & SSR helpers
- **TypeScript** – Strong typing and developer experience

**Backend (Dev Environment)**

- **NestJS (Express)** – REST API for traveler profiles
- **Docker + docker compose** – Run backend as a container from a published image
- **.env.backend** – Local backend environment variables (Firebase, ports, etc.)

**Reasoning:**

- Next.js + Tailwind enables fast development, SSR/ISR, responsive design, and seamless backend integration.
- Docker decouples backend setup from frontend dev, so you don’t need to clone or build the backend locally.

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/v1    # Local NestJS API
# or for production
# NEXT_PUBLIC_API_URL=https://nestexpress.onrender.com/api/v1
```

---

## 🐳 Backend with Docker Compose

This project depends on a **NestJS backend** that runs in Docker.
You need **Docker** and the **docker compose plugin** installed.

1. Create a `.env.backend` file in the project root for backend config:

```bash
PORT=3001
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_API_KEY=your-api-key
```

2. Start the backend service:

```bash
yarn dev:be
```

This runs:

```bash
docker compose up -d backend
```

and exposes the backend API at [http://localhost:3000](http://localhost:3000).

3. To stop the backend service:

```bash
yarn stop:be
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

3. **Run frontend dev server (with backend)**

```bash
yarn dev
```

This will:

- Start the backend container
- Start Next.js frontend on [http://localhost:3001](http://localhost:3001)

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

---

⚡ Do you want me to also add a **“Quick Start with Docker Only”** section (so both frontend + backend can be launched via a single `docker compose up` without needing `yarn dev`)? That would make onboarding new devs even easier.
