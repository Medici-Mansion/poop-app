import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

interface GradientTextProps {
  text?: string;
  colors?: string[];
  locations?: number[];
  fontClass?: string;
  maskViewStyle?: Record<string, any>;
}

/** 
 * GradientText
 * @description 텍스트에 그라디언트 색상을 적용합니다.
 */

const defaultMaskViewStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  height: 19,
};

// TODO: text 너비에 따라 자동으로 크기 조절되도록 수정
const GradientText = (props: GradientTextProps) => {
  const { 
    text = '',
    colors = ['#121212', '#434343', '#757575'],
    locations = [0, 0.5, 1],
    fontClass = 'head-sb14',
    maskViewStyle = {},
    ...rest 
  } = props;

  return (
    <MaskedView
      style={{ ...defaultMaskViewStyle, ...maskViewStyle } }
      maskElement={
        <View className='flex-1 justify-center items-center' {...rest}>
          <Text className={fontClass}>{text}</Text>
        </View>
      }
    >
      <LinearGradient
        className='flex-1'
        colors={colors}
        locations={locations}
      />
    </MaskedView>
  );
};

export default GradientText;
