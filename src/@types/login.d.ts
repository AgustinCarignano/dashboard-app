export type LoginTypesActions = {
  LOGIN: string;
  LOGOUT: string;
  UPDATE: string;
};

export type LoginActions = {
  type: string;
  payload: {
    fullName: string;
    email: string;
    photo: string;
  };
};

export type LoginState = {
  auth: boolean;
  fullName: string;
  email: string;
  photo: string;
};

export type LoginContextType = {
  loginState: LoginState;
  dispatchLogin: React.Dispatch<LoginActions>;
  loginActionTypes: LoginTypesActions;
};
