import { AxiosError } from "axios";


export interface Peeds {
  id: number;
  title: string;
  role: string;
  nickname: string;
}

// Parameters for Login
export interface LoginParam {
  id: string;
  password: string;
}

// Enumeration for Verification Types
export interface SuccessCreateProfileRes {
  data: boolean;
  error: ApiError;
}
export interface SignupStepInfo {
  id: number;
  name: string;
  password: string;
  birth: string;
  gender: Gender;
  phone: string;
  verify: Verify;
}

export interface SignupForm {
  id: number;
  placeholder: string;
  name: string;
  title: string;
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NONE = "NONE",
}

export enum Verify {
  EMAIL = "email",
  PHONE = "phone",
}

// Parameters for Signup
export interface SignupParam {
  nickname: string;
  id: string;
  password: string;
  birthday: string;
  gender: string;
  email?: string;
  phone?: string;
}

// Parameters for Verification
export interface VerifyParam {
  type: Verify;
  vid: string;
}

// Parameters for Verification Check
export interface VerifyCheckParam {
  code: string;
  type: Verify;
  vid: string;
}

// Successful Signup Response
export interface SuccessGetVerifyCodeRes {
  id: string;
  accountId: string;
  birthday: string;
}

export interface SuccessSignupRes {
  data: boolean;
  error: ApiError;
}

// Successful Verification Response
export interface SuccessVerifyRes {
  data: boolean;
  error: ApiError;
}

export const Token = {
  ACT: "accessToken",
  RFT: "refreshToken",
};

export const XCI = "x-poop-ci";

// Generic API Response
export interface ApiResponse {
  result: {
    resultCode: number;
    resultMessage: string;
  };
  body?: any;
}

// API Error Structure

export interface ApiError {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string[];
  error: string;
}

// Consonants Interface
export interface Consonants {
  id: number;
  value: string;
}

// Sign-In Error Types
export interface Breed {
  id: string;
  name: string;
  nameEN: string;
  avatar: string;
}

export interface BreedsGroupedByConsonant {
  [consonant: string]: Breed[];
}

export interface BreedData {
  data: BreedsGroupedByConsonant;
  error: AxiosError;
}

export interface SignInErrorType {
  fieldErrors?: {
    id?: string[];
    password?: string[];
  };
}

// Sign-Up Error Types
export interface SignUpErrorType {
  fieldErrors?: {
    [key: string]: string[] | undefined;
  };
}

// Sign-In Fields
export interface SignInFields {
  id: number;
  name: "id" | "password";
}

export interface SignupFormField {
  id: number;
  placeholder: string;
  name: string;
  title: string;
}
