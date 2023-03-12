import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated';


const SIZE = 100;

const handleRotation = (progress: Animated.SharedValue<number>) => {
  'worklet'
  return `${(progress.value * 2 * Math.PI)}rad`;
}

export const Scale = () => {
    const progress = useSharedValue(1);
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
        opacity: progress.value,
        transform: [
            { scale: scale.value},
            {rotate: handleRotation(progress)}, 
        ],
        borderRadius: progress.value * SIZE / 2
        }
    }, []);

    useEffect(() => {
        progress.value = withRepeat(withSpring(0.5), 3, true)
        scale.value = withRepeat(withSpring(2), -1);
      }, []);

    return (
        <View style={styles.container}>
            <Animated.View 
                style={[
                {width: SIZE, height: SIZE, backgroundColor: "blue"},
                animatedStyle
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });