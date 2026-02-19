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


## 📬 Contact

**Author:** Aman Rahangdale  
**GitHub:** https://github.com/amanrahangdale24  
**Project:** https://github.com/amanrahangdale24/Fallytics
