import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';

import Images from "@/constants/Images";

interface ProfileImageProps {
  uri?: ImageSourcePropType;
}

/** 
 * ProfileImage
 * @description 프로필 이미지를 보여주는 컴포넌트, uri가 없을 경우 기본 이미지를 보여줌
 * */ 
const ProfileImage = (props: ProfileImageProps) => {
  const { uri } = props;

  return (
    <View style={styles.container}>
      {
        uri ? 
        <Image
        source={uri || Images.poopIcon}
        style={styles.imageBox}
        resizeMode="contain"
      />
      : 
      <View style={styles.imageBox} className='flex items-center justify-center'>
        <Image
          source={Images.poopIcon}
          style={styles.defaultImage}
        />
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#353434',
  },
  defaultImage: {
    width: 50,
    height: 50,
  }
});

export default ProfileImage;
