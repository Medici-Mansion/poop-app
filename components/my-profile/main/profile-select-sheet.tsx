import BottomSheet, { BottomSheetView, BottomSheetModalProvider, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useBottomSheet } from "@/hooks/use-bottom-sheet";
import { forwardRef, useImperativeHandle } from "react";

import { Text } from "react-native";

const ProfileSelectSheet = forwardRef((props, ref) => {
  const { hideBottomSheet, ref: bottomSheetRef, showBottomSheet, snapPoints } = useBottomSheet("50%");

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
          backdropComponent={(props) => renderBackdrop({ ...props, onPress: hideBottomSheet })}
        >
          <BottomSheetView>
            <Text>1</Text>
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
        opacity={0.8}
        onPress={onPress}
        style={{ backgroundColor: 'red' }}
        {...rest}
      />
    )
});


export default ProfileSelectSheet;
