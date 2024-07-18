import { ApiResponse } from "@/types/index";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { SignupParam } from "@/types";
import { AxiosError } from "axios";
import { signUp } from "@/apis";

const useSignup = (
  options?: UseMutationOptions<
    ApiResponse,
    AxiosError<{ error: { message: string[] } }>,
    SignupParam
  >
) => {
  const { mutate, mutateAsync, data, isSuccess, isPending, error } =
    useMutation<
      ApiResponse,
      AxiosError<{ error: { message: string[] } }>,
      SignupParam
    >({
      mutationKey: ["signup"],
      mutationFn: signUp,
      ...options,
    });

  return {
    mutate,
    mutateAsync,
    data,
    isSuccess,
    isPending,
    error,
  };
};

export default useSignup;
