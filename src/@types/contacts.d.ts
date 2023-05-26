export type ContactType = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: number;
  _read: boolean;
  archived: boolean;
};

interface IContactState {
  contacts: ContactType[];
  unreadContacts: number;
  isLoading: boolean;
  hasError: boolean;
}

export type ContactUpdateObj = {
  body: ContactType;
  id: string;
};
