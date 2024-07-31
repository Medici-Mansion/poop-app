import { View, Pressable, Text } from "react-native";
import { forwardRef, useImperativeHandle, useMemo } from "react";

import BottomSheet, { BottomSheetView, BottomSheetModalProvider, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useBottomSheet } from "@/hooks/use-bottom-sheet";


interface ProfileDashboardSheetProps {
  isFollowing?: boolean;
  onPressFollow?: (b: boolean) => void;
  onPressBlock?: () => void;
}

/**
 * ProfileDashboardSheet
 * @description 상대 프로필을 팔로우 취소, 차단하는 버튼을 가진 bottom sheet
 */
const ProfileDashboardSheet = forwardRef((props: ProfileDashboardSheetProps, ref) => {
  const { isFollowing = false, onPressFollow = (b) => {}, onPressBlock = () => {} } = props;

  const snapPoint = useMemo(() => 
    `${25 + (isFollowing ? 10 : 0 )}%`, 
  [isFollowing]
);
  const { hideBottomSheet, ref: bottomSheetRef, showBottomSheet, snapPoints } = useBottomSheet(snapPoint);

  useImperativeHandle(ref, () => (
    { 
      show: showBottomSheet,
      hide: hideBottomSheet 
    }
  ));

  const handlePressFollow = () => {
    onPressFollow(!isFollowing);
    hideBottomSheet();
  }

  const handlePressBlock = () => {
    onPressBlock();
    hideBottomSheet();
  }

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
            {/* TODO: 아이콘 추가하기 */}
            <View className="pt-8 pl-3 pr-3">
              {
                isFollowing && (
                  <Pressable 
                    className="flex-row items-center py-4" 
                    onPress={handlePressFollow}
                  >
                    <Text className="body-b16 font-bold text-white">팔로우 취소</Text>
                  </Pressable>
                )
              }
              <Pressable 
                className="flex-row items-center py-4" 
                onPress={handlePressBlock}
              >
                <Text className="body-b16 font-bold text-white">차단</Text>
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
        appearsOnIndex={2}
        opacity={0.8}
        onPress={onPress}
        {...rest}
      />
    )
});


export default ProfileDashboardSheet;
