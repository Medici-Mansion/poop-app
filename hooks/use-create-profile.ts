import { useState } from "react";
import { useForm } from "react-hook-form";
import { createProfileSchema } from "@/schema";

import type { CreateProfileType } from "@/types";
import { gender } from "@/constants";

interface CreateProfileFields {
  avatar: string; // width :400, height : 400
  name: string;
  birthday: string; // YYYY-MM-DD
  gender: (typeof gender[number]['value']);
  breedId: string;
}


// <FormField
//           placeholder={placeholder || ""}
//           value={value}
//           onChangeText={onChange}
//           onBlur={onBlur}
//           errors={errors}
//         />

/** 
 * useCreateProfile
 *  프로필 생성을 위한 hook
 * */ 
const useCreateProfile = () => {
  const [error, setError] = useState<CreateProfileType>({});
  const { control, handleSubmit } = useForm({
    defaultValues: {
      avatar: "",
      name: "",
      birthday: "",
      gender: "",
      breedId: "",
    }
  })

  const onSubmit = async (data: CreateProfileFields) => {
    const result = await createProfileSchema.spa(data);
    if (!result.success) {
      setError(result.error.flatten());
      return;
    }
    setError({});
  };

  return {
    control,
    error,
    handleSubmit,
    onSubmit,
  };
};


export default useCreateProfile;