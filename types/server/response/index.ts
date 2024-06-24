import { ApiError } from "@/types";

export type Response<T> = {
  result: T;
  body?: any;
};
