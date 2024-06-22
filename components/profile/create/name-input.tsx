import React, { useImperativeHandle, useState, forwardRef } from 'react';
import { router } from 'expo-router';
import { useProfileStore } from '@/store/profile';
import { Input } from '@/components/profile/create/input';

const MIN_LENGTH = 2;

/** 
 * NameInput
 * 반려견 이름 입력 컴포넌트
 * 이름이 2자 이상인지 유효성 검사
 * */ 
const NameInput = forwardRef((props, ref: React.Ref<any>) => {
  const [error, setError] = useState<null | string>(null);
  const profileStore = useProfileStore();

  const checkError = () => {
    if (profileStore.profile.name.length < MIN_LENGTH) {
      setError(`이름은 ${MIN_LENGTH}자 이상 입력해주세요.`);
    } else {
      setError(null);
    }
    router.setParams({ event: null });
    
    return !error;
  };

  useImperativeHandle(ref, () => ({
    checkError,
  }))

  const handleChangeName = (name: string) => {
    profileStore.setName(name);
    setError(null);
  };

  return (
    <Input 
      label='반려견 이름'
      placeholder='이름' 
      error={error || ''}
      onChangeText={handleChangeName} 
      value={profileStore.profile.name}
    /> 
  );
});

export default NameInput;
