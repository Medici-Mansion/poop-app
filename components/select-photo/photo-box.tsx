import { Pressable, Image } from 'react-native';

interface ImageBoxProps {
  item: any;
  column: number;
  onPress: (item: any) => void;
}

/** 
 * PhotoBox
 * 이미지 박스
 * */ 
const PhotoBox = (props: ImageBoxProps) => {
  const { item, onPress } = props;
  return (
    <Pressable
      className="h-[120px] w-[33%] p-1"
      onPress={() =>  onPress(item)}
    >
      <Image source={{ uri: item.uri }} style={{ height: 120 }} />
    </Pressable>
  );
};


export default PhotoBox;