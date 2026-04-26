export interface IBookingPayment {
  _id?: string;
  invoiceUrl?: string;
  transactionId?: string;
  amount?: number;
  status?: string;
}

export interface IBookingTour {
  title?: string;
  slug?: string;
  startDate?: string;
  endDate?: string;
  arrivalLocation?: string;
  travelers?: number;
  travelerCount?: number;
  adult?: number;
  adults?: number;
  child?: number;
  children?: number;
  passengerCount?: number;
  pax?: number;
  guestCount?: number;
}

export interface IBookingBatch {
  _id?: string;
  batchNo?: number | string;
  batchNumber?: number | string;
  title?: string;
  startDate?: string;
  endDate?: string;
  date?: string;
  bookingStatus?: string;
  status?: string;
  travelers?: number;
  travelerCount?: number;
  adult?: number;
  adults?: number;
  child?: number;
  children?: number;
  passengerCount?: number;
  pax?: number;
  guestCount?: number;
  payment?: IBookingPayment;
}

export interface IBookingRecord {
  _id?: string;
  createdAt?: string;
  bookingStatus?: string;
  status?: string;
  title?: string;
  slug?: string;
  startDate?: string;
  endDate?: string;
  date?: string;
  startTime?: string;
  arrivalLocation?: string;
  travelers?: number;
  travelerCount?: number;
  adult?: number;
  adults?: number;
  child?: number;
  children?: number;
  passengerCount?: number;
  pax?: number;
  guestCount?: number;
  tour?: IBookingTour;
  payment?: IBookingPayment;
  batches?: IBookingBatch[];
}

export interface IMyBookingsDataTableProps {
  bookings?: unknown[];
  isLoading?: boolean;
}
