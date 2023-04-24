export type RoomType = {
  photos: string[];
  roomType: string;
  description: string;
  roomNumber: number;
  id: string;
  offer: boolean;
  price: number;
  discount: string;
  cancellation: string;
  status: string;
  amenities: string[];
};

export interface IRoomState {
  rooms: RoomType[];
  room: RoomType;
  isLoading: boolean;
  hasError: boolean;
}
