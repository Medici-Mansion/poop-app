import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { ApiResponse, VerifyParam } from "@/types";
import { AxiosError } from "axios";
import { getVerifyCode } from "@/apis";

const useGetVerifyCode = (
  options?: UseMutationOptions<ApiResponse, AxiosError, VerifyParam>
) => {
  const { mutateAsync, data, isSuccess, isPending, error } = useMutation<
    ApiResponse,
    AxiosError,
    VerifyParam
  >({
    mutationKey: ["get-verify"],
    mutationFn: getVerifyCode,
    ...(options ?? {}),
  });

  return {
    mutateAsync,
    data,
    isSuccess,
    isPending,
    error,
  };
};

export default useGetVerifyCode;
