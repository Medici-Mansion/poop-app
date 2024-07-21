import React from 'react';
import { View } from 'react-native';
import type { Tab } from '@/components/my-profile/main/menu-tabs';

import ToonList from '@/components/my-profile/main/toon-list';
import ChallengeList from '@/components/my-profile/main/challenge-list';

interface ContentProps {
  tab: Tab;
}

const Content = (props: ContentProps) => {
  const { tab } = props;
  return (
    <View className='w-full h-full p-4'>
      { tab === 'toon' && <ToonList /> }
      { tab === 'challenge' && <ChallengeList /> }
    </View>
  );
}

export default Content;