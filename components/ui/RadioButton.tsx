import React from 'react';
import AnimatedPressable from './AnimationPressable';

import { View, StyleSheet, Text } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioButtonProps {
  option: RadioOption;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

const defaultOption: RadioOption = {
  value: '',
  label: '',
};

const RadioButton = (props: RadioButtonProps) => {
  const { option = defaultOption, isSelected = false, onSelect =()=> {} } = props;


  const handlePress = () => {
    onSelect(option.value);
  }

  return (
    <View style={styles.container}>
    <AnimatedPressable
      style={styles.container}
      onPress={handlePress}
      >
      <Fontisto name="radio-btn-passive" size={24} color={ isSelected ? 'black' : 'transparent'} />
      <Text style={styles.buttonText}>{option.label}</Text>
      </AnimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'blue', // Change this to your preferred color
    marginLeft: 5,
  },
});

export default RadioButton;
