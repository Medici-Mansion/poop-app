import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { SuccessVerifyRes, VerifyCheckParam } from "@/types";
import { AxiosError } from "axios";
import { verify } from "@/apis";

const useCheckVerify = (
  options?: UseMutationOptions<SuccessVerifyRes, AxiosError, VerifyCheckParam>
) => {
  const { mutateAsync, isSuccess, isPending, error } = useMutation<
    SuccessVerifyRes,
    AxiosError,
    VerifyCheckParam
  >({
    mutationKey: ["verify"],
    mutationFn: verify,
    ...(options ?? {}),
  });

  return {
    mutateAsync,
    isSuccess,
    isPending,
    error,
  };
};

export default useCheckVerify;
