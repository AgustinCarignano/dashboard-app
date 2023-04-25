export type UserType = {
  photo: string;
  fullName: string;
  id: string;
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
  user: UserType | null;
  isLoading: boolean;
  hasError: boolean;
}

export type UserUpdateObj = {
  body: UserType;
  id: string;
};
