/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TravelPackage {
  id: string;
  title: string;
  category: 'domestic' | 'international';
  duration: string;
  pricePerPax: number;
  description: string;
  image: string;
  highlights: string[];
  includes: string[];
}

export interface BusFleet {
  id: string;
  name: string;
  type: 'bigbus' | 'mediumbus' | 'minivan';
  capacity: number;
  pricePerDay: number;
  features: string[];
  image: string;
  description: string;
}

export interface DocumentService {
  id: string;
  name: string;
  type: 'visa' | 'itas';
  priceEstimation: number;
  duration: string;
  requirements: string[];
  description: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceType: 'package' | 'rentcar' | 'visa_itas';
  serviceId: string;
  serviceName: string;
  bookingDate: string; // date of travel or rent
  passengersOrDuration: number; // count of pax or duration in days
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  createdAt: string;
  notes?: string;
  identityNumber?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
