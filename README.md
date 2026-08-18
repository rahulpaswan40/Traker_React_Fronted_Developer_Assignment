# Traker – React Frontend Developer Assignment (Indian Mobility Edition)

> **Minimalist, High-Performance Urban Mobility & Ride-Booking Operations Admin Platform**  
> Tailored for Indian Metro Operations (Bengaluru, Mumbai, Delhi NCR, Hyderabad). Built with React 18, Vite, TypeScript, React Router, Context API, and a custom minimalist design system.

---

## 🚀 Live Demo & Repository
- **GitHub Repository**: `https://github.com/<your-username>/traker-mobility-india`
- **Live Vercel Deployment**: `https://traker-mobility.vercel.app`

---
 --
## 🇮🇳 Key Highlights (Indian Mobility & Minimalist UI Edition)

1. **Indian Currency & Localization**:
   - Native Indian Rupee (`₹` / INR) formatting (`en-IN` numbering: thousands, lakhs, crores).
   - Real-world Indian tech and mobility corridors:
     - **Bengaluru**: Indiranagar, Koramangala, Whitefield ITPL, Kempegowda Airport (BLR), HSR Layout, Electronic City.
     - **Mumbai**: Bandra Kurla Complex (BKC), Chhatrapati Shivaji Airport (BOM), Lower Parel, Andheri.
     - **Delhi NCR & Hyderabad**: Cyber City Gurugram, Connaught Place, HITEC City, Madhapur.
2. **Indian Vehicle Categories & Registrations**:
   - Categories: **Auto (Bajaj RE)**, **Bike (Hero Splendor / Activa)**, **Sedan (Dzire Tour)**, **SUV (Innova / XUV700)**, **Premium (BMW 3 Series)**.
   - State registration plates (`KA 01 MJ 8421`, `MH 02 CK 9920`, `DL 1C AC 7700`, `TS 09 EQ 5511`).
3. **Payment Methods & Itemized Breakdown**:
   - UPI (Google Pay, PhonePe, Paytm), Net Banking, Corporate FASTag, and Cash.
   - Itemized fare breakdown including Base Fare, Distance Rate, Waiting Time, Peak Surge Multiplier, and GST (5%) & FASTag Tolls.
4. **Minimalistic UI / UX Aesthetics**:
   - Inspired by modern, distraction-free interfaces (Linear, Raycast, Stripe).
   - Crisp, subtle 1px borders, refined typography hierarchy (Plus Jakarta Sans), uncluttered layout, and soft contrast.
   - Smooth light & dark themes with instant persistence in `localStorage`.

---

## ✨ Features & Architecture

### 1. Executive Dashboard (`/`)
- **6 Core KPI Metric Cards**:
  - `Total Rides`: Real-time trip volume with growth metrics.
  - `Completed Rides`: Fulfilled trips with success rate percentages.
  - `Cancelled Rides`: Cancellation count and percentage ratios.
  - `Active Drivers`: On-duty chauffeurs available for dispatch.
  - `Total Customers`: Active registered riders.
  - `Total Revenue`: Gross Merchandise Value (GMV in ₹).
- **Interactive Ride Statistics Chart**:
  - Telemetry showing daily rides, completed rides, and cancelled rides.
  - Dynamic period selector: **Today**, **Last 7 Days**, **Last 30 Days**.
  - Interactive SVG curve graph with animated area gradients, hover inspection crosshairs, dynamic tooltips, and series toggles.
- **Vehicle Fleet Mix**:
  - Breakdown across Auto, Sedan, Bike, SUV, and Premium with proportional revenue and progress indicators.
- **Live Dispatch Stream**:
  - Real-time recent bookings with direct links to ride details.

### 2. Ride Management (`/rides`)
- **Table & Grid Card View Modes**.
- **All Required Columns**: Ride ID, Customer Name, Driver Name, Vehicle Type, Pickup Location, Drop Location, Fare (₹), Status, Date & Time, and Actions.
- Status Badges:
  - 🟢 `Completed`
  - 🔵 `Ongoing` (with animated pulse indicator)
  - 🔴 `Cancelled`
  - 🟡 `Pending`
- **Real-Time Search & Multi-Filtering** (No full-page reload):
  - Search by Ride ID (e.g. `TRK-8921`), Customer, or Driver.
  - Filter by Status (`All`, `Completed`, `Ongoing`, `Cancelled`, `Pending`).
  - Filter by Vehicle Type (`Auto`, `Bike`, `Sedan`, `SUV`, `Premium`).
  - Filter by Booking Date (`All Dates`, `Today`, `Last 7 Days`, `Last 30 Days`).
  - Sorting and Pagination.
  - Export filtered rides to CSV.

### 3. Ride Details (`/rides/:id`)
- Deep-dive inspection view for any selected ride:
  - Customer Profile (avatar, rating, lifetime rides, phone, email).
  - Driver & Vehicle Specs (rating, vehicle model, license plate).
  - Trip Route Timeline (pickup/drop locations, landmarks, departure and arrival timestamps).
  - Visualized Route Map preview simulation.
  - Itemized **Fare Breakdown**: Base Fare, Distance Rate, Time Duration, Peak Surge Multiplier, GST & Tolls, UPI Promo Discounts, and Total Fare (₹).
  - Interactive Status Modifier (`Ongoing`, `Completed`, `Cancelled`, `Pending`).
  - Printable receipt / invoice action.
  - One-click return navigation to the Rides page.

### 4. Driver Management (`/drivers`)
- Fleet directory featuring:
  - Driver Name, Phone Number, Vehicle Model, License Plate Number, Rating, Total Rides, Online/Offline status, and Today's Earnings (₹).
  - Search by driver name, phone, or vehicle registration.
  - Filter by status (`Online` vs `Offline`) and vehicle category.
  - Interactive Online/Offline status switcher with instant persistence.
  - Dedicated **Driver Details Modal** with career lifetime earnings, completion rate SLA, and current hub location.

---

## 🛠 Technology Stack

| Layer | Technologies Used |
|---|---|
| **Framework** | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 5](https://vitejs.dev/) |
| **Routing** | [React Router v6](https://reactrouter.com/) |
| **State Management** | React Context API (`ThemeContext`, `RidesContext`, `ToastContext`) + Custom Hooks |
| **Design System** | Minimalist Vanilla CSS with CSS custom properties, responsive grid, and clean keyframe animations |
| **Data & Mocking** | Asynchronous Mock API (`services/api.ts`) backed by JSON and `localStorage` persistence |

---

## 💻 Installation & Local Setup

```bash
# 1. Clone repository
git clone https://github.com/<your-username>/traker-mobility-india.git
cd traker-mobility-india

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Production build
npm run build
```

---

## 🎁 Bonus Features Included
1. **Light / Dark Theme Switching**: Minimalist high-contrast palette with persistent `localStorage` memory.
2. **Interactive SVG Charting**: Lightweight, zero-dependency SVG chart with period switches, gradient area fills, tooltips, and hover guides.
3. **Pagination & Multi-Column Sorting**: Configurable page size and multi-attribute sorting for both rides and drivers.
4. **Toast Notification System**: Instant feedback for status changes, simulated errors, and filter actions.
5. **CSV Data Export**: One-click download of filtered ride bookings and driver fleet records in standard `.csv` format.
6. **Printable Receipts**: Clean printable layout for ride detail invoices.
7. **Simulated State Switchers**: Sidebar toggles to test loading skeletons, error states, and empty states.
