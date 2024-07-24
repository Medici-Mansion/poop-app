import { View, Pressable, Text } from "react-native";
import { forwardRef, useImperativeHandle, useState } from "react";

import BottomSheet, { BottomSheetView, BottomSheetModalProvider, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import ProfileItem from '@/components/my-profile/main/profile-item';
import { useBottomSheet } from "@/hooks/use-bottom-sheet";
import { Entypo } from '@expo/vector-icons';
import { router } from "expo-router";


// TODO: 가상 데이터
const userProfile = [
  { name: '까망이', id: 'aaaaa', uri: '' },
  { name: '재롱이', id: 'bbbbb', uri: '' },
];

const ProfileSelectSheet = forwardRef((props, ref) => {
  const snapPoint = `${50 + userProfile.length * 5}%`;
  const { hideBottomSheet, ref: bottomSheetRef, showBottomSheet, snapPoints } = useBottomSheet(snapPoint);
  const [selectedProfile, setSelectedProfile] = useState('');

  const handleCheck = (id: string) => {
    setSelectedProfile(id);
    hideBottomSheet();
  };

  const handleNewProfile = () => {
    router.push('my-profile/create');
    hideBottomSheet();
  }


  useImperativeHandle(ref, () => (
    { 
      show: showBottomSheet,
      hide: hideBottomSheet 
    }
  ));

  return (
    <BottomSheetModalProvider>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: 'rgba(12, 12, 12, 0.8)' }}
          handleIndicatorStyle={{ backgroundColor: '#595959', width: 32 }}
          backdropComponent={(props) => renderBackdrop({ ...props, onPress: hideBottomSheet })}
        >
          <BottomSheetView>
            <View className="pt-8 pl-3 pr-3">
              { 
                userProfile.map((profile, index) => (
                  <ProfileItem
                    key={index}
                    className="mb-8"
                    name={profile.name}
                    id={profile.id}
                    uri={profile.uri}
                    isSelected={selectedProfile === profile.id}
                    handleCheck={handleCheck}
                  />
                ))
              }
  
              {/* 새 프로필 생성 버튼 */}
              <Pressable 
                className='flex flex-row items-center w-full h-10' 
                onPress={handleNewProfile}
              >
                <View className='flex flex-row items-center w-full'>
                  <View className='w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center'>
                    <Entypo name="plus" size={18} color="white" />
                  </View>
                  <View className='ml-4'>
                    <Text className='text-white body-b16 font-bold leading-4'>새 프로필 생성</Text>
                  </View>
                </View>
              </Pressable>
            </View>
          </BottomSheetView>
        </BottomSheet>
    </BottomSheetModalProvider>
  );
});

/**
 * renderBackdrop
 * bottom의 배경이자 bottom의 clickOutside를 위한 컴포넌트
 * */
const renderBackdrop = ((props: any) => {
  const { onPress, ...rest } = props;
    return (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        onPress={onPress}
        {...rest}
      />
    )
});


export default ProfileSelectSheet;
