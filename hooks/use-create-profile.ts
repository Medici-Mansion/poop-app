import { useMutation } from '@tanstack/react-query';
import { createProfile } from '@/apis';

const useCreateProfile = ({ onSuccess = () => {} }) => {
  const { mutate, data, isSuccess, isPending, error } = useMutation({
    mutationKey: ['create-profile'],
    mutationFn: createProfile,
    onSuccess,
  });

  return {
    mutate,
    data,
    isSuccess,
    isPending,
    error,
  };
};

export default useCreateProfile;