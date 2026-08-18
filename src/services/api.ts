import { Ride, Driver, DashboardData, StatPeriod, RideFiltersState, DriverFiltersState } from '../types';
import ridesData from '../data/rides.json';
import driversData from '../data/drivers.json';
import dashboardData from '../data/dashboard.json';

const STORAGE_KEYS = {
  RIDES: 'traker_rides_db_v2',
  DRIVERS: 'traker_drivers_db_v2',
  SIMULATE_ERROR: 'traker_sim_error',
  SIMULATE_EMPTY: 'traker_sim_empty'
};

// Initialize localStorage if not already set or outdated
const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.RIDES)) {
    localStorage.setItem(STORAGE_KEYS.RIDES, JSON.stringify(ridesData));
  }
  if (!localStorage.getItem(STORAGE_KEYS.DRIVERS)) {
    localStorage.setItem(STORAGE_KEYS.DRIVERS, JSON.stringify(driversData));
  }
};

initStorage();

const delay = (ms: number = 80) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // Error simulation toggle
  getSimulateError: (): boolean => {
    return localStorage.getItem(STORAGE_KEYS.SIMULATE_ERROR) === 'true';
  },

  setSimulateError: (value: boolean) => {
    localStorage.setItem(STORAGE_KEYS.SIMULATE_ERROR, String(value));
  },

  // Empty simulation toggle
  getSimulateEmpty: (): boolean => {
    return localStorage.getItem(STORAGE_KEYS.SIMULATE_EMPTY) === 'true';
  },

  setSimulateEmpty: (value: boolean) => {
    localStorage.setItem(STORAGE_KEYS.SIMULATE_EMPTY, String(value));
  },

  resetStorage: () => {
    localStorage.setItem(STORAGE_KEYS.RIDES, JSON.stringify(ridesData));
    localStorage.setItem(STORAGE_KEYS.DRIVERS, JSON.stringify(driversData));
    localStorage.removeItem(STORAGE_KEYS.SIMULATE_ERROR);
    localStorage.removeItem(STORAGE_KEYS.SIMULATE_EMPTY);
  },

  // Dashboard Data
  getDashboardData: async (_period: StatPeriod = 'Today'): Promise<DashboardData> => {
    await delay(60);
    if (apiService.getSimulateError()) {
      throw new Error('Simulated network error: Failed to fetch dashboard telemetry.');
    }
    return JSON.parse(JSON.stringify(dashboardData)) as DashboardData;
  },

  // Rides
  getRides: async (filters?: Partial<RideFiltersState>): Promise<{ rides: Ride[]; total: number }> => {
    await delay(80);
    if (apiService.getSimulateError()) {
      throw new Error('Simulated API Error: Unable to fetch ride records.');
    }

    if (apiService.getSimulateEmpty()) {
      return { rides: [], total: 0 };
    }

    const raw = localStorage.getItem(STORAGE_KEYS.RIDES);
    let allRides: Ride[] = raw ? JSON.parse(raw) : (ridesData as Ride[]);

    if (!filters) {
      return { rides: allRides, total: allRides.length };
    }

    let filtered = [...allRides];

    // Search query: Ride ID, Customer Name, Driver Name
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(ride => {
        const idMatch = ride.id.toLowerCase().includes(q);
        const custMatch = ride.customer.name.toLowerCase().includes(q) || ride.customer.phone.includes(q);
        const driverMatch = ride.driver ? ride.driver.name.toLowerCase().includes(q) : false;
        const locationMatch = ride.pickup.address.toLowerCase().includes(q) || ride.drop.address.toLowerCase().includes(q);
        return idMatch || custMatch || driverMatch || locationMatch;
      });
    }

    // Status Filter
    if (filters.status && filters.status !== 'All') {
      filtered = filtered.filter(ride => ride.status === filters.status);
    }

    // Vehicle Type Filter
    if (filters.vehicleType && filters.vehicleType !== 'All') {
      filtered = filtered.filter(ride => ride.vehicleType === filters.vehicleType);
    }

    // Date Filter
    if (filters.dateFilter && filters.dateFilter !== 'all') {
      const now = new Date('2026-08-18T23:59:59Z').getTime();
      if (filters.dateFilter === 'today') {
        filtered = filtered.filter(ride => {
          const rDate = new Date(ride.createdAt).toISOString().split('T')[0];
          return rDate === '2026-08-18';
        });
      } else if (filters.dateFilter === 'last7') {
        const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
        filtered = filtered.filter(ride => new Date(ride.createdAt).getTime() >= sevenDaysAgo);
      } else if (filters.dateFilter === 'last30') {
        const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
        filtered = filtered.filter(ride => new Date(ride.createdAt).getTime() >= thirtyDaysAgo);
      } else {
        // Specific date formatted as YYYY-MM-DD
        filtered = filtered.filter(ride => {
          const rDate = new Date(ride.createdAt).toISOString().split('T')[0];
          return rDate === filters.dateFilter;
        });
      }
    }

    // Sorting
    if (filters.sortBy) {
      const order = filters.sortOrder === 'asc' ? 1 : -1;
      filtered.sort((a, b) => {
        if (filters.sortBy === 'fare') {
          return (a.fare.totalFare - b.fare.totalFare) * order;
        }
        if (filters.sortBy === 'distanceKm') {
          return (a.distanceKm - b.distanceKm) * order;
        }
        if (filters.sortBy === 'id') {
          return a.id.localeCompare(b.id) * order;
        }
        // default createdAt
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * order;
      });
    }

    return { rides: filtered, total: filtered.length };
  },

  getRideById: async (id: string): Promise<Ride | null> => {
    await delay(60);
    if (apiService.getSimulateError()) {
      throw new Error(`Simulated Error: Could not fetch ride details for ${id}.`);
    }
    const raw = localStorage.getItem(STORAGE_KEYS.RIDES);
    const allRides: Ride[] = raw ? JSON.parse(raw) : (ridesData as Ride[]);
    const found = allRides.find(r => r.id.toLowerCase() === id.toLowerCase());
    return found || null;
  },

  updateRideStatus: async (id: string, newStatus: Ride['status']): Promise<Ride> => {
    await delay(60);
    const raw = localStorage.getItem(STORAGE_KEYS.RIDES);
    let allRides: Ride[] = raw ? JSON.parse(raw) : (ridesData as Ride[]);
    const index = allRides.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Ride not found');

    allRides[index] = {
      ...allRides[index],
      status: newStatus,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.RIDES, JSON.stringify(allRides));
    return allRides[index];
  },

  // Drivers
  getDrivers: async (filters?: Partial<DriverFiltersState>): Promise<{ drivers: Driver[]; total: number }> => {
    await delay(80);
    if (apiService.getSimulateError()) {
      throw new Error('Simulated API Error: Unable to fetch driver fleet list.');
    }

    if (apiService.getSimulateEmpty()) {
      return { drivers: [], total: 0 };
    }

    const raw = localStorage.getItem(STORAGE_KEYS.DRIVERS);
    let allDrivers: Driver[] = raw ? JSON.parse(raw) : (driversData as Driver[]);

    if (!filters) {
      return { drivers: allDrivers, total: allDrivers.length };
    }

    let filtered = [...allDrivers];

    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(driver => {
        return (
          driver.name.toLowerCase().includes(q) ||
          driver.phone.includes(q) ||
          driver.vehicle.toLowerCase().includes(q) ||
          driver.vehicleNumber.toLowerCase().includes(q) ||
          driver.id.toLowerCase().includes(q)
        );
      });
    }

    if (filters.status && filters.status !== 'All') {
      filtered = filtered.filter(d => d.status === filters.status);
    }

    if (filters.vehicleType && filters.vehicleType !== 'All') {
      filtered = filtered.filter(d => d.vehicleType === filters.vehicleType);
    }

    if (filters.sortBy) {
      const order = filters.sortOrder === 'asc' ? 1 : -1;
      filtered.sort((a, b) => {
        if (filters.sortBy === 'rating') {
          return (a.rating - b.rating) * order;
        }
        if (filters.sortBy === 'totalRides') {
          return (a.totalRides - b.totalRides) * order;
        }
        if (filters.sortBy === 'earningsToday') {
          return (a.earningsToday - b.earningsToday) * order;
        }
        if (filters.sortBy === 'name') {
          return a.name.localeCompare(b.name) * order;
        }
        return 0;
      });
    }

    return { drivers: filtered, total: filtered.length };
  },

  getDriverById: async (id: string): Promise<Driver | null> => {
    await delay(60);
    if (apiService.getSimulateError()) {
      throw new Error(`Simulated Error: Could not fetch details for driver ${id}.`);
    }
    const raw = localStorage.getItem(STORAGE_KEYS.DRIVERS);
    const allDrivers: Driver[] = raw ? JSON.parse(raw) : (driversData as Driver[]);
    return allDrivers.find(d => d.id === id) || null;
  },

  toggleDriverStatus: async (id: string): Promise<Driver> => {
    await delay(60);
    const raw = localStorage.getItem(STORAGE_KEYS.DRIVERS);
    let allDrivers: Driver[] = raw ? JSON.parse(raw) : (driversData as Driver[]);
    const index = allDrivers.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Driver not found');

    const newStatus = allDrivers[index].status === 'Online' ? 'Offline' : 'Online';
    allDrivers[index] = {
      ...allDrivers[index],
      status: newStatus,
      isAvailable: newStatus === 'Online'
    };
    localStorage.setItem(STORAGE_KEYS.DRIVERS, JSON.stringify(allDrivers));
    return allDrivers[index];
  }
};
