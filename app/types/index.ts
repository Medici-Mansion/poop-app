import { AxiosError } from "axios";

export interface Peeds {
  id: number;
  title: string;
  role: string;
  nickname: string;
}

export interface LoginParam {
  id: string;
  password: string;
}
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

export interface SignupParam {
  nickname: string;
  id: string;
  password: string;
  birthday: string;
  gender: string;
  email?: string;
  phone?: string;
}

export interface VerifyParam {
  type: Verify;
  vid: string;
}

export interface VerifyCheckParam {
  code: string;
  type: Verify;
  vid: string;
}

export interface SuccessGetVerifyCodeRes {
  id: string;
  accountId: string;
  birthday: string;
}

export interface SuccessSignupRes {
  data: boolean;
  error: ApiError;
}

export interface SuccessVerifyRes {
  data: boolean;
  error: ApiError;
}

export interface ApiResponse<T> {
  data: T;
  error?: ApiError;
}

export interface ApiError {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string[];
  error: string;
}

export interface Consonants {
  id: number;
  value: string;
}

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
