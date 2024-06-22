import { Pressable, Image } from 'react-native';


interface ImageBoxProps {
  item: any;
  column: number;
  onPress: (item: any) => void;
}

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