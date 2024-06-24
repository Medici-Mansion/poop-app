import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { ApiResponse, LoginParam } from "../../types";
import { AxiosError } from "axios";
import { login } from "@/apis";

const useLogin = (
  options?: UseMutationOptions<
    ApiResponse,
    AxiosError<{ data: null; error: { message: string } }>,
    LoginParam
  >
) => {
  const mutation = useMutation<
    ApiResponse,
    AxiosError<{ data: null; error: { message: string } }>,
    LoginParam
  >({
    mutationKey: ["login"],
    mutationFn: login,
    ...options,
  });

  return mutation;
};

export default useLogin;
