import React from 'react';
import { View } from 'react-native';
import type { Tab } from './menu-tabs';

import ToonList from './toon-list';
import ChallengeList from './challenge-list';

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