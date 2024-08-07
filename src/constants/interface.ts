import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export interface LoginUserInterface {
  data: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    referralCode?: string;
    social: string;
    updatedAt: string;
    userName: string;
    _id: string;
  };
  token?: string;
}
export interface SignUpUserInterface {
  data: {
    otp_hash: string;
  };
}

export type LoginDataInterface =
  | {data: LoginUserInterface}
  | {error: FetchBaseQueryError | SerializedError};

export type SignUpDataInterface =
  | {data: SignUpUserInterface}
  | {error: FetchBaseQueryError | SerializedError};

export type ReceiptInfo = {
  duration: string;
  name: string;
  description: string;
  date: string;
  reference: string;
  from: string;
};
export interface MenuData {
  name: string;
  route: string;
  icon: any;
}

export interface CategoriesInterface {
  _id: string;
  name: string;
}

export default interface SearchInterface {
  word: string;
  count: number;
  _id: string;
}
