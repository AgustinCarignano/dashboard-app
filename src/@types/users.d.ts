export type UserType = {
  photo: string;
  fullName: string;
  id: string;
  email: string;
  startDate: number;
  description: string;
  contact: string;
  status: "ACTIVE" | "INACTIVE";
  role: string;
  password: string;
};

export interface IUserState {
  users: UserType[];
  user: UserType;
  isLoading: boolean;
  hasError: boolean;
}
