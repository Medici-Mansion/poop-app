import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { LoginParam } from "../../types";
import { AxiosError } from "axios";
import { login } from "@/apis";
import { Response } from "@/types/server";
import { LoginSuccess } from "@/types/server/auth/login";

const useLogin = (
  options?: UseMutationOptions<
    LoginSuccess,
    AxiosError<Response<null>>,
    LoginParam
  >
) => {
  const mutation = useMutation<
    LoginSuccess,
    AxiosError<Response<null>>,
    LoginParam
  >({
    mutationKey: ["login"],
    mutationFn: login,
    ...options,
  });

  return mutation;
};

export default useLogin;
