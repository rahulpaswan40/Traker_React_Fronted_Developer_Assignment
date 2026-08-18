import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Ride, Driver, DashboardData, StatPeriod, RideFiltersState, DriverFiltersState, RideStatus } from '../types';
import { apiService } from '../services/api';
import { useToast } from './ToastContext';
import ridesData from '../data/rides.json';
import driversData from '../data/drivers.json';
import dashboardDataRaw from '../data/dashboard.json';

interface RidesContextType {
  rides: Ride[];
  totalRidesCount: number;
  drivers: Driver[];
  totalDriversCount: number;
  dashboardData: DashboardData | null;
  selectedPeriod: StatPeriod;
  setSelectedPeriod: (period: StatPeriod) => void;
  rideFilters: RideFiltersState;
  setRideFilters: React.Dispatch<React.SetStateAction<RideFiltersState>>;
  driverFilters: DriverFiltersState;
  setDriverFilters: React.Dispatch<React.SetStateAction<DriverFiltersState>>;
  isLoading: boolean;
  error: string | null;
  simulateError: boolean;
  simulateEmpty: boolean;
  setSimulateErrorToggle: (val: boolean) => void;
  setSimulateEmptyToggle: (val: boolean) => void;
  fetchRides: () => Promise<void>;
  fetchDrivers: () => Promise<void>;
  fetchDashboard: () => Promise<void>;
  updateRideStatus: (id: string, status: RideStatus) => Promise<void>;
  toggleDriverStatus: (id: string) => Promise<void>;
  resetToDefaults: () => void;
  clearRideFilters: () => void;
  clearDriverFilters: () => void;
}

const defaultRideFilters: RideFiltersState = {
  searchQuery: '',
  status: 'All',
  vehicleType: 'All',
  dateFilter: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc'
};

const defaultDriverFilters: DriverFiltersState = {
  searchQuery: '',
  status: 'All',
  vehicleType: 'All',
  sortBy: 'rating',
  sortOrder: 'desc'
};

const RidesContext = createContext<RidesContextType | undefined>(undefined);

export const RidesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState<StatPeriod>('Today');
  
  // Initialize with immediate data to prevent any blank screen or buffering
  const [rides, setRides] = useState<Ride[]>(ridesData as Ride[]);
  const [totalRidesCount, setTotalRidesCount] = useState<number>(ridesData.length);
  const [drivers, setDrivers] = useState<Driver[]>(driversData as Driver[]);
  const [totalDriversCount, setTotalDriversCount] = useState<number>(driversData.length);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(dashboardDataRaw as DashboardData);

  const [rideFilters, setRideFilters] = useState<RideFiltersState>(defaultRideFilters);
  const [driverFilters, setDriverFilters] = useState<DriverFiltersState>(defaultDriverFilters);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [simulateError, setSimulateError] = useState<boolean>(() => apiService.getSimulateError());
  const [simulateEmpty, setSimulateEmpty] = useState<boolean>(() => apiService.getSimulateEmpty());

  const fetchDashboard = useCallback(async () => {
    try {
      const data = await apiService.getDashboardData(selectedPeriod);
      setDashboardData(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to load dashboard metrics');
    }
  }, [selectedPeriod]);

  const fetchRides = useCallback(async () => {
    try {
      setError(null);
      const res = await apiService.getRides(rideFilters);
      setRides(res.rides);
      setTotalRidesCount(res.total);
    } catch (err: any) {
      setError(err.message || 'Error loading rides');
      showToast(err.message || 'Failed to load rides', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [rideFilters, showToast]);

  const fetchDrivers = useCallback(async () => {
    try {
      setError(null);
      const res = await apiService.getDrivers(driverFilters);
      setDrivers(res.drivers);
      setTotalDriversCount(res.total);
    } catch (err: any) {
      setError(err.message || 'Error loading drivers');
      showToast(err.message || 'Failed to load drivers', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [driverFilters, showToast]);

  // Sync dashboard when period changes
  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // Sync rides when rideFilters change
  useEffect(() => {
    fetchRides();
  }, [fetchRides]);

  // Sync drivers when driverFilters change
  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  const updateRideStatus = async (id: string, status: RideStatus) => {
    try {
      const updated = await apiService.updateRideStatus(id, status);
      setRides(prev => prev.map(r => (r.id === id ? updated : r)));
      showToast(`Ride ${id} status updated to ${status}`, 'success', 'Status Updated');
    } catch (err: any) {
      showToast(err.message || 'Failed to update status', 'error');
    }
  };

  const toggleDriverStatus = async (id: string) => {
    try {
      const updated = await apiService.toggleDriverStatus(id);
      setDrivers(prev => prev.map(d => (d.id === id ? updated : d)));
      showToast(
        `${updated.name} is now ${updated.status}`,
        updated.status === 'Online' ? 'success' : 'info',
        'Driver Status'
      );
    } catch (err: any) {
      showToast(err.message || 'Failed to toggle driver status', 'error');
    }
  };

  const setSimulateErrorToggle = (val: boolean) => {
    apiService.setSimulateError(val);
    setSimulateError(val);
    if (val) {
      showToast('Simulated error mode ENABLED. API requests will fail.', 'warning');
    } else {
      showToast('Simulated error mode disabled.', 'info');
      fetchRides();
      fetchDrivers();
      fetchDashboard();
    }
  };

  const setSimulateEmptyToggle = (val: boolean) => {
    apiService.setSimulateEmpty(val);
    setSimulateEmpty(val);
    if (val) {
      showToast('Simulated empty dataset mode ENABLED.', 'warning');
    } else {
      showToast('Simulated empty mode disabled.', 'info');
    }
    fetchRides();
    fetchDrivers();
  };

  const resetToDefaults = () => {
    apiService.resetStorage();
    setSimulateError(false);
    setSimulateEmpty(false);
    setRideFilters(defaultRideFilters);
    setDriverFilters(defaultDriverFilters);
    setSelectedPeriod('Today');
    showToast('Mock database and settings restored to defaults', 'success', 'Reset Complete');
    fetchDashboard();
    fetchRides();
    fetchDrivers();
  };

  const clearRideFilters = () => {
    setRideFilters(defaultRideFilters);
  };

  const clearDriverFilters = () => {
    setDriverFilters(defaultDriverFilters);
  };

  return (
    <RidesContext.Provider
      value={{
        rides,
        totalRidesCount,
        drivers,
        totalDriversCount,
        dashboardData,
        selectedPeriod,
        setSelectedPeriod,
        rideFilters,
        setRideFilters,
        driverFilters,
        setDriverFilters,
        isLoading,
        error,
        simulateError,
        simulateEmpty,
        setSimulateErrorToggle,
        setSimulateEmptyToggle,
        fetchRides,
        fetchDrivers,
        fetchDashboard,
        updateRideStatus,
        toggleDriverStatus,
        resetToDefaults,
        clearRideFilters,
        clearDriverFilters
      }}
    >
      {children}
    </RidesContext.Provider>
  );
};

export const useRides = (): RidesContextType => {
  const context = useContext(RidesContext);
  if (!context) {
    throw new Error('useRides must be used within a RidesProvider');
  }
  return context;
};
