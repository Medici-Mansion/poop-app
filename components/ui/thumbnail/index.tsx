import { Image, Text, View, StyleSheet, ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GradientText from '@/components/ui/gradient-text';

type Size = 's' | 'md' | 'lg';

interface ThumbnailProps extends ViewProps {
  size?: Size;
  title?: string;
  subTitle?: string;
  number?: number;
  uri?: string;
  style?: Record<string, any>;
}

const TitleStyleClass:Record<Size, string> = {
  s: 'head-sb12',
  md: 'head-sb14',
  lg: 'head-sb21',
};

/** 
 * Thumbnail
 * @description 썸네일 컴포넌트입니다.
 * @param {Size} size - 썸네일 크기입니다. (s: 115x153, md: 177x236, lg: 361x240)
 */

const Thumbnail = (props: ThumbnailProps) => {
  const { 
    size = 'md', 
    title = '', 
    subTitle = '', 
    number, 
    uri = '', 
    style,
    ...rest 
  } = props;

  return (
    <View 
      style={{ ...styles[size], ...style }} 
      className='rounded-2xl bg-slate-500 relative' 
      {...rest}
    >
      { uri && <Image className='w-full h-full' source={{ uri }} /> }
      <View className='absolute bottom-0 w-full'>
        <LinearGradient
          colors={['rgba(18, 18, 18, 0)', 'rgba(18, 18, 18, 0.6)', 'rgba(18, 18, 18, 0.8)']}
          locations={[0, 0.7, 1]}
          className='rounded-b-2xl p-4'
        >
          <Text className={`${TitleStyleClass[size]} font-bold text-white`}>{title}</Text>
          { (!!number || subTitle !== '') &&
            <View className='mt-2 flex-row items-center'>
              { !!number && <NumberGradient number={number} /> }
              { subTitle !== '' && <SubTitle subTitle={subTitle} /> }
            </View>
          }
        </LinearGradient>
      </View>
    </View>
  );
};

const NumberGradient = (props: { number: number }) => {
  {/* TODO: number옆에 발바닥 이모티콘 추가하기 */}
  return (
    <View className='mr-2 w-2'>
      <GradientText 
        colors={['#FF6A16', '#FFDF6F']}
        locations={[0, 1]}
        text={`${props.number}`} 
      />
    </View>
  );
}

const SubTitle = (props: { subTitle: string }) => {
  return (
    <View className='flex-1'>
      <Text className='text-gray-100'>{props.subTitle}</Text>
    </View>
  );
}

export default Thumbnail;

const styles = StyleSheet.create({
  s: {
    width: 115,
    height: 153,
  },
  md: {
    width: 177,
    height: 236,
  },
  lg: {
    width: 361,
    height: 240,
  },
});