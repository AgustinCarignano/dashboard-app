export type BookingType = {
  id: string;
  guest: string;
  specialRequest: string;
  orderDate: number | null;
  roomType: string;
  status: string;
  checkIn: number | null;
  checkOut: number | null;
  roomId: string;
  roomNumber: string;
  roomImg: string;
};

export interface IBookingState {
  bookings: BookingType[];
  booking: BookingType;
  isLoading: boolean;
  hasError: boolean;
}

export type BookingUpdateObj = {
  body: BookingType;
  id: string;
};
