import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { RidesProvider } from './context/RidesContext';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { RidesPage } from './pages/RidesPage';
import { RideDetailsPage } from './pages/RideDetailsPage';
import { DriversPage } from './pages/DriversPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <RidesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="rides" element={<RidesPage />} />
                <Route path="rides/:id" element={<RideDetailsPage />} />
                <Route path="drivers" element={<DriversPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </RidesProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
