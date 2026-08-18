Traker - Ride-Booking & Mobility Admin Dashboard

Traker is a responsive admin dashboard for managing and monitoring ride-booking operations. The dashboard provides a simple way for administrators to view ride activity, driver information, business metrics, and analytics from a single interface.

The project was developed as a frontend-focused application, so the main focus is on the user interface, navigation, reusable components, filtering, state handling, and overall dashboard experience.

Live Demo

Live Application: https://traker-react-admin-dashboard.vercel.app

GitHub Repository: https://github.com/rahulpaswan40/Traker_React_Fronted_Developer_Assignment

⸻

Project Overview

The Traker dashboard provides different views that can be used by an administrator to monitor ride-booking activity.

The main sections include:

* Dashboard overview
* Ride management
* Driver management
* Analytics
* Filtering and search
* Responsive navigation
* Ride and driver data tables
* Dashboard statistics
* Loading, empty and error states

The application currently uses mock/local data because this project is designed as a frontend assignment and does not require a production backend.

⸻

Technology Stack

Frontend

* React 18
* JavaScript / TypeScript
* React Router
* Vite

Styling

* CSS
* Flexbox
* CSS Grid
* Responsive design

State Management

* React Context API
* React component state
* Custom React hooks

Development Tools

* Node.js
* npm
* Git
* GitHub
* Vercel

⸻

Features

Dashboard

The dashboard gives an overview of the ride-booking system using key metrics and summary information.

It is designed to help an administrator quickly understand the current state of the platform without going through individual records.

Ride Management

The rides section provides information about ride bookings.

It supports viewing ride-related information and filtering the displayed data based on the available fields.

Driver Management

The drivers section contains driver information and provides a structured way to view driver records.

Analytics

The analytics section provides a more detailed view of the available ride and business data.

Responsive Layout

The dashboard is designed to work across different screen sizes. The layout uses CSS Flexbox and Grid where required to keep the interface usable on smaller screens as well as desktop screens.

UI States

The application handles different UI states instead of assuming that data will always be available.

The main states are:

* Loading
* Success
* Empty
* Error

⸻

Project Structure

The project follows a component-based structure so that different parts of the application can be maintained independently.

src/
│
├── components/
│   ├── Sidebar
│   ├── Navbar
│   ├── Tables
│   ├── Badges
│   └── other reusable UI components
│
├── context/
│   └── Global application state
│
├── data/
│   ├── rides.json
│   ├── drivers.json
│   └── dashboard.json
│
├── hooks/
│   └── Custom React hooks
│
├── pages/
│   ├── Dashboard
│   ├── Rides
│   ├── Drivers
│   └── Analytics
│
├── services/
│   └── Data/API abstraction
│
├── styles/
│   └── Global and component styles
│
└── types/
    └── Data/type definitions

The exact files may vary slightly depending on the implementation, but the application follows the same separation of responsibilities.

⸻

Architecture

Traker uses a component-driven frontend architecture.

The application is divided into three main layers:

1. Pages

Pages represent the main screens of the application, such as Dashboard, Rides, Drivers and Analytics.

They are responsible for combining the required components and displaying the correct information for each route.

2. Reusable Components

Common UI elements such as navigation, tables, badges, buttons and other interface elements are kept as reusable components.

This avoids repeating the same UI code across different pages.

3. Data and Services

Mock data is kept separately from the UI components. The service layer provides an abstraction between the pages/components and the data source.

This makes it easier to replace the current mock data with real API calls in the future.

⸻

Routing

React Router is used for client-side navigation.

The dashboard is divided into separate routes/views so that users can move between the main sections without requiring a full page reload.

This keeps the application experience similar to a real admin dashboard.

⸻

State Management Approach

The application uses React Context API along with local component state and custom hooks.

Context API is used for state that needs to be shared between multiple parts of the application.

Local component state is used for UI-specific values such as:

* Search input
* Selected filters
* Table state
* UI interactions
* Temporary selections

Custom hooks are used where business or reusable logic needs to be separated from the UI components.

This approach was chosen because the application is currently frontend-only and does not require a large external state-management library such as Redux.

It keeps the project relatively simple while still allowing shared state to be managed in a predictable way.

⸻

Data / API Approach

The current version of Traker uses local mock data instead of a live backend API.

The main datasets are stored in JSON files, including:

rides.json
drivers.json
dashboard.json

These files represent the type of information that would normally be returned by backend APIs.

The application is structured so that the data access logic is separated from the UI as much as possible.

Why Mock Data?

Since this was a frontend-focused assignment, a complete backend and database were not required.

Using local data allowed the application to demonstrate:

* Data rendering
* Searching
* Filtering
* Dashboard calculations
* Loading states
* Empty states
* Error handling
* Component interaction

without adding unnecessary backend infrastructure.

Future API Integration

The current data layer can be replaced with real API requests in the future.

For example, the application could connect to endpoints such as:

GET /api/dashboard
GET /api/rides
GET /api/drivers

The UI components would not need to be completely redesigned because the data access responsibility is kept separate.

⸻

Installation and Setup

Prerequisites

Before running the project, make sure the following are installed:

* Node.js
* npm
* Git

You can verify Node.js and npm using:

node -v
npm -v

Clone the Repository

git clone https://github.com/rahulpaswan40/Traker_React_Fronted_Developer_Assignment.git

Move into the project directory:

cd Traker_React_Fronted_Developer_Assignment

Install Dependencies

Run:

npm install

This installs all the packages required by the project.

⸻

Running the Project Locally

After installing the dependencies, start the development server:

npm run dev

Vite will start the development server and provide a local URL, usually:

http://localhost:5173

Open the URL shown in the terminal in your browser.

The development server supports hot reload, so changes made to the source files can be reflected in the browser without manually restarting the application.

⸻

Production Build

To create an optimized production build, run:

npm run build

The production-ready files will be generated inside the:

dist/

directory.

⸻

Preview Production Build

After creating the production build, the generated application can be previewed locally using:

npm run preview

Vite will provide a local URL for viewing the production build.

⸻

Deployment

The application is deployed using Vercel.

Production URL

https://traker-react-admin-dashboard.vercel.app

The deployment is based on the production build generated by Vite.

A future version could also be connected to a CI/CD workflow so that new changes pushed to the GitHub repository are automatically deployed.

⸻

Assumptions and Trade-offs

Frontend-Only Application

The project is intentionally implemented as a frontend application.

There is no production database or backend server connected to the current version.

This keeps the scope focused on the frontend requirements of the assignment.

Mock Data

Local JSON data is used instead of a live API.

This is useful for demonstrating the dashboard functionality but does not provide server-side persistence.

Authentication

Authentication is simulated/assumed for the current dashboard.

A production application would require proper authentication and authorization before allowing access to administrative functionality.

Data Persistence

Changes made during the current session are not intended to replace a real backend database.

In a production system, ride and driver information would be stored and managed by a backend service.

State Management

React Context API was selected instead of adding a larger state-management library.

For the current size of the application this keeps the implementation easier to understand and maintain.

If the application grows significantly, a dedicated state-management solution could be considered.

⸻

Possible Future Improvements

If this project were extended into a production application, some possible improvements would be:

* Connect the dashboard to a real backend API
* Add authentication and role-based access
* Add a database for persistent ride and driver records
* Add real-time ride tracking
* Add pagination for large datasets
* Add server-side filtering and sorting
* Add notifications
* Add more detailed analytics
* Add automated testing
* Add CI/CD pipeline
* Add proper API error handling
* Add user and admin management

⸻

Conclusion

Traker demonstrates a frontend admin dashboard for a ride-booking and mobility platform.

The project focuses on reusable React components, responsive layouts, client-side navigation, state management, mock data handling, filtering, and different UI states.

The current architecture also leaves room for future backend/API integration without requiring major changes to the overall frontend structure.

⸻

Author

Rahul Paswan

Frontend project developed as part of a React Frontend Developer assignment.
