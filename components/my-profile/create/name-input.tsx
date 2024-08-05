import React, { useImperativeHandle, useState, forwardRef } from 'react';
import { useProfileStore } from '@/store/profile';
import { Input } from '@/components/my-profile/create/input';

const MIN_LENGTH = 2;

interface NameInputHandle {
  checkError: () => boolean;
}

/**
 * NameInput
 * 반려견 이름 입력 컴포넌트
 * 이름이 2자 이상인지 유효성 검사
 * */
const NameInput = forwardRef<NameInputHandle>((props, ref) => {
  const [error, setError] = useState<null | string>(null);
  const profileStore = useProfileStore();

  const checkError = () => {
    if (profileStore.profile.name.length < MIN_LENGTH) {
      setError(`이름은 ${MIN_LENGTH}자 이상 입력해주세요.`);
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  useImperativeHandle(ref, () => ({
    checkError,
  }));

  const handleChangeName = (name: string) => {
    profileStore.setName(name);
    setError(null);
  };

  return (
    <Input
      label="반려견 이름"
      placeholder="이름"
      error={error || ""}
      onChangeText={handleChangeName}
      value={profileStore.profile.name}
    />
  );
});

NameInput.displayName = "NameInput";

export default NameInput;
