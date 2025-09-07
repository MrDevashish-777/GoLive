// This is a component for the tab bar background
import React from 'react';
import { View } from 'react-native';

// Create a proper component instead of undefined
export default function TabBarBackground() {
  return <View style={{ backgroundColor: 'transparent' }} />;
}

export function useBottomTabOverflow() {
  return 0;
}
