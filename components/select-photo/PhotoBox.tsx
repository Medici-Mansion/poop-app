import { Pressable, Image } from 'react-native';


interface ImageBoxProps {
  item: any;
  height: number;
  column: number;
  onPress: (item: any) => void;
}

const PhotoBox = (props: ImageBoxProps) => {
  const { item, onPress, height, column } = props;
  return (
    <Pressable
    style={{ height, width: `${100 / column}%`, padding: 1 }}
    onPress={() => onPress(item)}>
    <Image source={{ uri: item.uri }} style={{ height }} />
  </Pressable>
  );
};


export default PhotoBox;