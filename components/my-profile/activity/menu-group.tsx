import { View, Text, Pressable } from "react-native";
import Feather from '@expo/vector-icons/Feather';

interface MenuGroupProps {
  title: string;
  items: Array<{
    label: string;
    onPress?: () => void;
  }>;
}

/** 
 * MenuGroup
 * @description 분류별 메뉴 리스트
 */
export default function MenuGroup(props: MenuGroupProps) {
  const { title, items } = props;

  return (
    <View className="mt-12">
      <Text className='text-gray-300'>{title}</Text>
      <View className="flex flex-1 flex-col">
        {
          items.map((item, index) => (
            <Pressable 
              className="flex flex-row justify-between items-center w-full mt-8" 
              key={index} 
              onPress={item.onPress}
            >
              <Text className="text-white text-body-m14">{item.label}</Text>
              {/* TODO: 우측 아이콘은 #d1d5db(gray/300)으로 교체 */}
              <Feather name="chevron-right" size={16} color="gray" />
            </Pressable>
          ))
        }
        </View>
      </View>
  );
};