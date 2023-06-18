export type RoomType = {
  _id: string;
  photos: string[];
  roomType: string;
  description: string;
  roomNumber: number;
  offer: boolean;
  price: number;
  discount: number;
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

export type RoomUpdateObj = {
  body: RoomType;
  id: string;
};
