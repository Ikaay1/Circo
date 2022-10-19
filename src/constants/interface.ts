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
