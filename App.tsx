import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated';
import { InterpolateScrollView } from './animations/interpolation/interpolate.scrollview';
import { AppPanGesture } from './animations/pangesture/PanGesture';
import { Scale } from './animations/Scale';


export default function App() {

  return (
    // <Scale />
    
    // <AppPanGesture />

    <InterpolateScrollView />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
