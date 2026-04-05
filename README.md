# Zorvyn Fintech | Finance Dashboard UI

A production-grade, highly interactive finance dashboard built for the Zorvyn frontend developer assessment. This project demonstrates modern frontend architecture, high-performance data visualization, and advanced state management.

🔗 **Live Demo:** [Insert Your Vercel Link Here]

---

## 🧠 Architecture & Tech Stack

This project leverages the absolute latest tools in the React ecosystem (Next.js 15 & Tailwind v4) and follows a strictly typed, **Feature-Sliced Design** architecture.

### Core Technologies
* **Framework:** Next.js 15 (App Router, React 19 ready)
* **Styling:** Tailwind CSS v4 + Shadcn UI + Framer Motion
* **Global State:** Zustand (for synchronous UI state & Role-Based Access Control)
* **Server State Simulation:** TanStack React Query (for async data handling & caching)
* **Storage Engine:** IndexedDB via `idb` (Non-blocking, persistent browser database)
* **Data Visualization:** Apache ECharts (`echarts-for-react`)

---

## ✨ Key Features & Implementations

### 1. Simulated Backend Environment (IndexedDB + React Query)
Instead of relying on basic `localStorage`, this app uses `IndexedDB` to handle large datasets asynchronously. `React Query` wraps these DB calls to simulate real network latency, manage caching, and provide seamless skeleton loading states.

### 2. Role-Based Access Control (RBAC)
Dynamic UI rendering based on the active User Role:
- **Admin:** Full access to view, add, and delete transactions.
- **Viewer:** Read-only mode. Mutation buttons (Add/Delete) are instantly removed from the DOM when toggled.

### 3. High-Performance Data Visualizations
ECharts was chosen over Chart.js for its superior Canvas rendering engine. 
- Features advanced Linear Gradients, 3D-like shadows, and responsive sizing.
- Charts dynamically react to Dark/Light mode toggles without requiring a page reload.

### 4. Smart Insights Engine
An intelligent analytics module that calculates:
- Real-time Savings Rate.
- Highest Expense Categories (visualized via a horizontal ranking bar chart).
- Single Largest Expense tracking.
- Cashflow Income vs. Expense ratio (visualized via a glowing doughnut chart).

### 5. Advanced Data Table
- **Client-Side Filtering:** Search by description/category, and filter by Income/Expense.
- **Sorting:** Automatically sorted chronologically.
- **Export:** Custom utility to parse active table data and download a strictly formatted CSV report.
- **Localization:** Entire app uses native `Intl.NumberFormat` for Indian Rupee (₹) formatting.

---

## 📂 Feature-Sliced File Structure

The architecture isolates domains into specific features to ensure scalability and prevent a bloated global component folder.

```text
/
├── app/                  # Next.js App Router (URLs, Pages, Layouts)
├── components/           # Global Shared UI (App Shell, Shadcn primitives)
├── features/             # Core Business Logic 
│   ├── dashboard/        # Summary metrics & Cashflow charts
│   ├── insights/         # Analytics engine & advanced graphs
│   └── transactions/     # Interactive data tables & mutation modals
├── hooks/                # Async React Query data hooks
├── lib/                  # Configurations (IndexedDB setup, Mock Data)
├── store/                # Zustand global state slices
├── types/                # TypeScript interfaces & types
└── utils/                # Pure utility functions (CSV Export, Currency format)