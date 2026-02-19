# 🚀 Faillytics - Turn Failure into Success

**Faillytics** is not just another task manager. It is a productivity tool designed to help you understand *why* you miss tasks. By tracking your planned vs. actual performance and analyzing the reasons behind missed tasks, Faillytics uses AI to provide personalized insights to improve your consistency.

![Dashboard Preview](https://via.placeholder.com/1200x600?text=Faillytics+Dashboard+Preview) 
*(Replace with a real screenshot of your dashboard)*

## ✨ Key Features

-   **🎯 Task Planning:** Schedule your daily tasks with estimated durations.
-   **✅ Track Execution:** Mark tasks as "Done" or "Missed".
-   **📝 Failure Analysis:** Log specific reasons for missed tasks (e.g., "Procrastination", "Poor Estimation").
-   **📊 Interactive Dashboard:**
    -   **Consistency Trend:** Visual graph of your completion rate over the last 7 days.
    -   **Missed Reason Distribution:** Pie chart breaking down why tasks are incomplete.
-   **🤖 AI Insights (Gemini):** Get personalized motivation, warnings, and suggestions based on your unique behavior patterns.
-   **🎨 Modern UI:** Built with React, Tailwind CSS, and Framer Motion for a smooth, responsive experience (Dark/Light mode support).
-   **bw Secure Authentication:** JWT-based authentication with HTTP-Only cookies.

## 🛠️ Tech Stack

**Frontend:**
*   React.js (Vite)
*   Tailwind CSS
*   Framer Motion (Animations)
*   Recharts (Data Visualization)
*   Zustand (State Management)
*   Lucide React (Icons)

**Backend:**
*   Node.js & Express.js
*   MongoDB & Mongoose
*   JWT (JSON Web Tokens)
*   Google Gemini AI API

**Deployment:**
*   Render (Web Service)

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+ recommended)
*   MongoDB Account (Atlas)
*   Google Gemini API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/amanrahangdale24/Fallytics.git
    cd Fallytics
    ```

2.  **Install Dependencies**
    Root folder (installs both frontend and backend dependencies via script, or do manually):
    ```bash
    npm install
    # OR manually:
    cd backend && npm install
    cd ../frontend && npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the **`backend`** folder with the following keys:
    ```env
    PORT=4044
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    NODE_ENV=development
    CLIENT_URL=http://localhost:5173
    
    # Google Gemini AI Keys (You can use one or rotate multiple)
    FALLYTICS_AI_KEY1=your_gemini_api_key
    ```

4.  **Run Locally**
    You need to run both backend and frontend.

    *Terminal 1 (Backend):*
    ```bash
    cd backend
    npm run dev
    ```

    *Terminal 2 (Frontend):*
    ```bash
    cd frontend
    npm run dev
    ```

    Open [http://localhost:5173](http://localhost:5173) to view the app.

## 📂 Project Structure
