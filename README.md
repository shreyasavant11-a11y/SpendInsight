# 💡 SpendInsight

A full-stack expense tracking web application with AI-powered spending analysis.

🔗 **Live:** https://spend-insight-inky.vercel.app


---

## Overview

SpendInsight lets you track your income and expenses, visualize spending patterns through charts, and get AI-generated analysis of your current month's expenses using Google's Gemini API.

---

## Features

### 🏠 Dashboard
- Add expense and income directly from the dashboard
- Three summary cards — Income, Expense, Balance (filtered by week, month, or year)
- Pie chart showing spending breakdown with weekly/monthly/yearly filter

### 📋 Expense History
- View all expenses in a table
- Edit and delete individual entries
- Monthly expense summary at the bottom

### 💰 Income History
- View all income entries
- Edit and delete individual entries
- Monthly income summary at the bottom

### 🤖 AI Analysis
- Analyzes your current month's expenses using Gemini API
- Returns personalized observations — dominant spending areas, unusual transactions, saving opportunities, and one actionable recommendation
- Save and revisit past analyses

### 🔐 Authentication
- Register and login with JWT
- Auto logout after 15 minutes of inactivity
- Each user's data is completely isolated

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS, Chart.js, lucide-react |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT, bcrypt |
| AI | Google Gemini API |
| Deployment | Vercel (frontend), Render (backend) |

---

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account
- Google Gemini API key

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` (refer `.env.example`):
```
MONGO_URI=your_mongodb_uri
PORT=5000
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_key
```

```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

---

## Project Structure

```
SpendInsight/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── expenseController.js
│   │   ├── incomeController.js
│   │   └── analysisController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Expense.js
│   │   ├── Income.js
│   │   └── Analysis.js
│   ├── routes/
│   ├── middleware/
│   └── server.js
└── frontend/
    └── src/
        ├── pages/
        │   ├── Dashboard.jsx
        │   ├── History.jsx
        │   ├── IncomeHistory.jsx
        │   └── AnalysisHistory.jsx
        ├── components/
        │   ├── Sidebar.jsx
        │   ├── Layout.jsx
        │   └── PieChart.jsx
        ├── context/
        │   └── AuthContext.jsx
        └── api/
            └── axios.js
```

---

## AI Analysis — How It Works

Current month's expenses are sent to Gemini API with a structured prompt. The response covers:

- Dominant spending areas
- Unusual or high-risk transactions
- A specific saving opportunity with actual numbers
- One tailored recommendation

Each analysis is saved and can be revisited from the Analysis History section.

---

*Build • Learn • Deploy 🚀*
