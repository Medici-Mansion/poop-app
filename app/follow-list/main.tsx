
import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

import { MenuTabs, MenuTabType, FriendItem } from '@/components/follow-list/main';

const myFriends = [
  { name: '까망이', id: 'aaaaa', uri: '', isFollowing: true },
  { name: '재롱이', id: 'bbbbb', uri: '', isFollowing: false },
];

const totalFollower = [
  { name: '까1망1이', id: 'aaaaa', uri: '' },
  { name: '재1롱2이', id: 'bbbbb', uri: '' },
  { name: '까1망1이', id: 'aaaaa', uri: '' },
  { name: '재1롱2이', id: 'bbbbb', uri: '' },
  { name: '까1망1이', id: 'aaaaa', uri: '' },
  { name: '재1롱2이', id: 'bbbbb', uri: '' },
];

export default function MainPage() {
  const [tab, setTab] = React.useState<MenuTabType>('follower');
  return (
    <ScrollView className="w-full h-full flex-1 bg-gray-600">
      <MenuTabs tab={tab} onTabPress={setTab} />
      <View className="px-4 flex flex-col items-center w-full h-full">
        <View className="w-full mt-12">
          <Text className="text-gray-200 body-b16 font-bold mb-8">내가 아는 친구들</Text>
          {
            myFriends.map((friend, index) => (
              <FriendItem
                key={index}
                className="mb-8"
                name={friend.name}
                id={friend.id}
                uri={friend.uri}
                isFollowing={friend.isFollowing}
              />
            ))
          }
        </View>
        <View className="w-full mt-12">
          <Text className="text-gray-200 body-b16 font-bold mb-8">내가 아는 친구들</Text>
          {
            totalFollower.map((friend, index) => (
              <FriendItem
                key={index}
                className="mb-8"
                name={friend.name}
                id={friend.id}
                uri={friend.uri}
              />
            ))
          }
        </View>
      </View>
    </ScrollView>
  )
};
