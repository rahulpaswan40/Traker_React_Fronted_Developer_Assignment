export type RideStatus = 'Completed' | 'Ongoing' | 'Cancelled' | 'Pending';

export type VehicleType = 'Sedan' | 'SUV' | 'Auto' | 'Bike' | 'Premium';

export interface LocationPoint {
  address: string;
  city: string;
  landmark?: string;
  lat: number;
  lng: number;
  time?: string;
}

export interface FareBreakdown {
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  surgeMultiplier: number;
  taxAndFees: number;
  discount: number;
  totalFare: number;
  paymentMethod: 'Credit Card' | 'Cash' | 'Digital Wallet' | 'UPI' | 'Corporate';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
}

export interface CustomerInfo {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  rating: number;
  totalRides: number;
}

export interface DriverInfo {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar: string;
  rating: number;
  vehicle: string;
  vehicleNumber: string;
  vehicleType: VehicleType;
  totalRides: number;
  status: 'Online' | 'Offline';
  completionRate?: number;
  earningsToday?: number;
  joinedDate?: string;
}

export interface Ride {
  id: string; // e.g. "TRK-8921"
  customer: CustomerInfo;
  driver?: DriverInfo | null;
  vehicleType: VehicleType;
  pickup: LocationPoint;
  drop: LocationPoint;
  fare: FareBreakdown;
  status: RideStatus;
  distanceKm: number;
  durationMins: number;
  createdAt: string; // ISO date string
  updatedAt: string;
  cancellationReason?: string;
  notes?: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  vehicle: string;
  vehicleNumber: string;
  vehicleType: VehicleType;
  rating: number;
  totalRides: number;
  status: 'Online' | 'Offline';
  completionRate: number;
  earningsToday: number;
  earningsTotal: number;
  joinedDate: string;
  currentLocation: string;
  isAvailable: boolean;
}

export type StatPeriod = 'Today' | 'Last 7 Days' | 'Last 30 Days';

export interface StatMetric {
  totalRides: number;
  completedRides: number;
  cancelledRides: number;
  activeDrivers: number;
  totalCustomers: number;
  totalRevenue: number;
  growth: {
    rides: number;
    revenue: number;
    drivers: number;
    customers: number;
  };
}

export interface ChartDataPoint {
  date: string;
  label: string;
  totalRides: number;
  completedRides: number;
  cancelledRides: number;
  revenue: number;
}

export interface DashboardData {
  metrics: {
    Today: StatMetric;
    'Last 7 Days': StatMetric;
    'Last 30 Days': StatMetric;
  };
  charts: {
    Today: ChartDataPoint[];
    'Last 7 Days': ChartDataPoint[];
    'Last 30 Days': ChartDataPoint[];
  };
  vehicleStats: {
    type: VehicleType;
    count: number;
    percentage: number;
    revenue: number;
  }[];
  recentActivity: {
    id: string;
    type: 'ride_booked' | 'ride_completed' | 'ride_cancelled' | 'driver_online' | 'driver_offline';
    title: string;
    description: string;
    timestamp: string;
    rideId?: string;
    driverId?: string;
  }[];
}

export interface RideFiltersState {
  searchQuery: string;
  status: 'All' | RideStatus;
  vehicleType: 'All' | VehicleType;
  dateFilter: string; // 'all', 'today', 'last7', 'last30', or custom YYYY-MM-DD
  sortBy: 'createdAt' | 'fare' | 'distanceKm' | 'id';
  sortOrder: 'asc' | 'desc';
}

export interface DriverFiltersState {
  searchQuery: string;
  status: 'All' | 'Online' | 'Offline';
  vehicleType: 'All' | VehicleType;
  sortBy: 'rating' | 'totalRides' | 'name' | 'earningsToday';
  sortOrder: 'asc' | 'desc';
}
