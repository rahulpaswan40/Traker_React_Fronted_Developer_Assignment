import { Ride, Driver } from '../types';

export const exportRidesToCsv = (rides: Ride[], filename = 'traker-india-rides.csv') => {
  if (!rides || rides.length === 0) return;

  const headers = [
    'Ride ID',
    'Customer Name',
    'Customer Phone',
    'Driver Name',
    'Vehicle Type',
    'Pickup Address',
    'Drop Address',
    'Distance (km)',
    'Duration (mins)',
    'Base Fare (INR)',
    'Total Fare (INR)',
    'Payment Method',
    'Payment Status',
    'Status',
    'Date & Time'
  ];

  const rows = rides.map(ride => [
    `"${ride.id}"`,
    `"${ride.customer.name}"`,
    `"${ride.customer.phone}"`,
    `"${ride.driver ? ride.driver.name : 'Unassigned'}"`,
    `"${ride.vehicleType}"`,
    `"${ride.pickup.address.replace(/"/g, '""')}"`,
    `"${ride.drop.address.replace(/"/g, '""')}"`,
    ride.distanceKm,
    ride.durationMins,
    ride.fare.baseFare,
    ride.fare.totalFare,
    `"${ride.fare.paymentMethod}"`,
    `"${ride.fare.paymentStatus}"`,
    `"${ride.status}"`,
    `"${ride.createdAt}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportDriversToCsv = (drivers: Driver[], filename = 'traker-india-drivers.csv') => {
  if (!drivers || drivers.length === 0) return;

  const headers = [
    'Driver ID',
    'Name',
    'Phone',
    'Email',
    'Vehicle Model',
    'Registration Plate',
    'Vehicle Type',
    'Rating',
    'Total Rides',
    'Status',
    'Completion Rate (%)',
    'Today Earnings (INR)',
    'Total Earnings (INR)',
    'Current Hub Location'
  ];

  const rows = drivers.map(d => [
    `"${d.id}"`,
    `"${d.name}"`,
    `"${d.phone}"`,
    `"${d.email}"`,
    `"${d.vehicle}"`,
    `"${d.vehicleNumber}"`,
    `"${d.vehicleType}"`,
    d.rating,
    d.totalRides,
    `"${d.status}"`,
    d.completionRate,
    d.earningsToday,
    d.earningsTotal,
    `"${d.currentLocation}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
