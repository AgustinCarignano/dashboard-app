export type BookingType = {
  id: string;
  guest: string;
  specialRequest: string;
  orderDate: number;
  roomType: string;
  status: string;
  checkIn: number;
  checkOut: number;
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

export type BookingInitialState = {
  id: string;
  guest: string;
  specialRequest: string;
  orderDate: string;
  roomType: string;
  status: string;
  checkIn: string;
  checkOut: string;
  roomId: string;
  roomNumber: string;
  roomImg: string;
};

export type ExtraRoom = {
  roomId: string;
  roomType: string;
  roomNumber: string;
};
