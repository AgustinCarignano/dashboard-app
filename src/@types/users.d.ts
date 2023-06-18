export type UserType = {
  _id: string;
  photo: string;
  fullName: string;
  email: string;
  startDate: number;
  description: string;
  contact: string;
  status: string;
  role: string;
  password: string;
};

export interface IUserState {
  users: UserType[];
  user: UserType;
  isLoading: boolean;
  hasError: boolean;
}

export type UserUpdateObj = {
  body: UserType;
  id: string;
};

export type UserInitialState = {
  photo: string;
  fullName: string;
  _id: string;
  email: string;
  startDate: number | string;
  description: string;
  contact: string;
  status: string;
  role: string;
  password: string;
};
