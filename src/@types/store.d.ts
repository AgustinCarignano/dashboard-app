import { IBookingState } from "./bookings";
import { IContactState } from "./contacts";
import { IRoomState } from "./rooms";
import { IUserState } from "./users";

export interface IGlobalStore {
  bookings: IBookingState;
  rooms: IRoomState;
  users: IUserState;
  contacts: IContactState;
}
