export type ContactType = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: number;
  read: boolean;
  archived: boolean;
};

interface IContactState {
  contacts: ContactType[];
  unreadContacts: number | null;
  isLoading: boolean;
  hasError: boolean;
}

export type ContactUpdateObj = {
  body: ContactType;
  id: string;
};
