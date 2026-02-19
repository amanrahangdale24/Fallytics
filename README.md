# 🚀 Faillytics – Turn Failure Into Success

Faillytics is a **task analytics and failure-intelligence app**.  
Instead of just tracking what you *planned*, it helps you understand **why things didn’t happen** – and uses AI to turn those patterns into actionable insights.

---

## 📸 Demo & Links

- **Live App:** _https://fallytics.onrender.com_ <!-- Replace with your Render URL -->
- **GitHub Repo:** https://github.com/amanrahangdale24/Fallytics

---

## 🧠 What Makes Faillytics Different?

- **Not just a todo list** – it’s a **reflection tool**.
- Tracks **planned vs completed vs missed** tasks.
- Asks **why** a task was missed and aggregates that over time.
- Uses **AI (Gemini)** to give:
  - Personalized insights
  - Warnings about your patterns
  - Concrete, tailored suggestions
  - Motivation based on your recent performance

---

## ✨ Features

- 📝 **Task Planning**
  - Add tasks with category, planned date, time, and duration.
- ✅ **Status Tracking**
  - Mark tasks as **Planned**, **Done**, or **Missed**.
- ❌ **Missed Reasons**
  - Log why a task was missed (e.g. procrastination, low energy, overcommitment).
- 📊 **Analytics Dashboard**
  - 7–day **consistency trend** (by date, not just day-name).
  - **Missed reason distribution** pie chart.
  - Summary cards: total, completed, missed, top missed reason.
- 🤖 **AI Insights (Gemini)**
  - Key insights about your behavior.
  - Smart suggestions to improve your routine.
  - Warnings for risk patterns.
  - A motivational nudge tailored to your stats.
- 🎨 **Modern UI/UX**
  - React + Tailwind + Framer Motion
  - Dark/light-aware hero section and dashboards.
  - Mobile-responsive layout.
- 🔒 **Auth**
  - Email/password signup/login.
  - JWT-based authentication with HTTP-only cookies.

---

## 🧱 Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS (v4)
- Framer Motion
- React Router DOM
- Zustand (state management)
- Recharts (data visualization)
- Axios

**Backend**
- Node.js
- Express 5
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Cookie Parser
- Google Gemini API (via `@google/genai`)

**Deployment**
- Render (Web Service)
- MongoDB Atlas (recommended for production)

---

## 📂 Project Structure

```bash
Faillytics/
├── backend/
│   ├── controllers/        # auth + task controllers
│   ├── db/
│   │   ├── config/         # Mongo connection
│   │   └── models/         # Task, User schemas
│   ├── middleware/         # auth middleware
│   ├── routes/             # /api/auth, /api/task
│   ├── utils/              # env, AI, analytics helpers
│   └── server.js           # Express app entry
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/     # Layout, modals, hero, etc.
│       ├── pages/          # Home, Login, Signup, Tasks, Dashboard
│       ├── store/          # authStore, taskStore (Zustand)
│       ├── lib/            # axios instance
│       └── main.jsx, App.jsx
│
├── package.json            # root scripts (build/start)
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`/backend/.env` locally, Render env vars in production)

Required:

```env
# Local dev port (Render sets PORT automatically in prod)
PORT=4044

# MongoDB (local or Atlas)
MONGO_URI=your_mongo_connection_string

# JWT
JWT_SECRET=your_super_secret_jwt_key

# Node environment
NODE_ENV=development  # change to 'production' in Render

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173   # in prod: https://your-app.onrender.com

# Gemini / AI keys
FALLYTICS_AI_KEY1=your_gemini_api_key
# optionally FALLYTICS_AI_KEY2 / 3 / 4 if you’re rotating keys
```

> **On Render:**
> - **Do NOT** set `PORT` manually – Render injects it.
> - Use your **Atlas** URI for `MONGO_URI`.
> - Set `CLIENT_URL` to your Render URL (e.g. `https://faillytics.onrender.com`).
> - Keep `NODE_ENV=production`.

---

## 🧪 Running the Project Locally

### 1️⃣ Clone & Install

```bash
git clone https://github.com/amanrahangdale24/Fallytics.git
cd Fallytics

# Install backend & frontend deps via root script
npm install
# or manually:
# cd backend && npm install
# cd ../frontend && npm install
```

### 2️⃣ Start Backend (API + DB)

```bash
cd backend
npm run dev   # uses nodemon
```

By default: `http://localhost:4044`

### 3️⃣ Start Frontend (Vite)

```bash
cd frontend
npm run dev
```

By default: `http://localhost:5173`

The frontend talks to:
- `http://localhost:4044/api` in **development**
- `/api` (same origin) in **production**

---

## 🚀 Production Build & Deployment (Render)

**Root `package.json` scripts:**

```json
"scripts": {
  "build": "npm install --prefix backend && npm_config_production=false npm install --prefix frontend && npm run build --prefix frontend",
  "start": "npm run start --prefix backend"
}
```

**On Render (Web Service):**

- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Environment:**
  - `NODE_ENV=production`
  - `MONGO_URI=<your_atlas_uri>`
  - `JWT_SECRET=<your_secret>`
  - `CLIENT_URL=https://your-app.onrender.com`
  - `FALLYTICS_AI_KEY1=<your_gemini_key>`

The backend serves the built React app from `frontend/dist` when `NODE_ENV === "production"`.

---

## 🧭 Roadmap (Ideas)

- ⏱️ Time-of-day heatmaps for misses/completions
- 🧩 Tag-level analytics (e.g. “Study”, “Fitness”)
- 🔔 Email or in-app reminders before planned times
- 👤 User profile with streaks and achievements
- 🌐 Multi-language support

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/amazing-idea`
3. Commit your changes: `git commit -m "Add amazing idea"`
4. Push the branch: `git push origin feature/amazing-idea`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **ISC License** – see `LICENSE` for details (or your `package.json` license field).

---

## 📬 Contact

**Author:** Aman Rahangdale  
**GitHub:** https://github.com/amanrahangdale24  
**Project:** https://github.com/amanrahangdale24/Fallytics
