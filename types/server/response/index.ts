import { ApiError } from "@/types";

export type Response<T> = {
  body: T;
  result: {
    resultCode: number;
    resultMessage: string;
  };
};
