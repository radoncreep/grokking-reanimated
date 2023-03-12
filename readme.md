reanimated plugin in the babel config provides the ability to work with the worklets

useSharedValue
https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/shared-values
useSharedValue allows us create a value that can be handled by worklets
so a value that can be handled on the UI thread.
It can handle whatever data type.
Progress is just a wrapper for value.. progress.value.

useAnimatedStyle
In Reanimated we allow for animations to be specified directly in the useAnimatedStyle hook when we dont want to directly map to sharedValue to animate properties. Its dependency array is optional and useful when your animated style depends on state value(s).

Reanimated Utilities/Helpers
used to tranform shared values to animated updates.
=> withTiming - 

PAN GESTURE HANDLER
react-native-gesture-handler library provides us with our pan gesture handler component