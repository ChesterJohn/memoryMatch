import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, disabled, selected }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: selected ? '#00a2ff' : '#ffaa00' },
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 150,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 5,
    borderColor: '#dde4d8',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#113450',
    fontFamily: 'ChalkboardSE-Regular',
    fontSize: 20,
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default CustomButton;
