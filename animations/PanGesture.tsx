import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { StyleSheet, View } from "react-native";

const SIZE = 100.0;
const CIRCLE = SIZE * 2;


type ContextType = {
    translateX: number;
    translateY: number;
}

export const AppPanGesture = () => {
    const translationX = useSharedValue<number>(1);
    // implementing a gesture for moving the animated view along the Y-axis also
    const translationY = useSharedValue<number>(0);

    // the callback functionality varies for each type
    // we get the event as an arg "event.translationX or event.translationY"
    // useAnimatedGestureHandler provides us with a context to store the previous values
    // store the event value in context on start
    // retrieve the event value on active
    const panGestureEvent = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        ContextType
    >({
        // this callback is fired when an onPress event occurs
        onStart: (event, context) => {
            // the shared value is stored in the context
            context.translateX = translationX.value;
            context.translateY = translationY.value;

        },
        onActive: (event, context) => {
            translationX.value = event.translationX + context.translateX;
            translationY.value = event.translationY + context.translateY
        },
        onEnd: (event) => {
            const distance = Math.sqrt((translationX.value ** 2) + (translationY.value ** 2));

            if (distance < CIRCLE + SIZE / 2) {
                translationX.value = withSpring(0);
                translationY.value = withSpring(0);
            }
        }
    })

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: translationX.value},
                {translateY: translationY.value}
            ]
        }
    }, [])

    return (
        <View style={styles.container}>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
                <Animated.View style={styles.cirle}>
                    <Animated.View 
                        style={[
                            styles.square,
                            animatedStyle
                        ]}
                    />
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    square: {
        width: SIZE,
        height: SIZE,
        backgroundColor: 'rgba(0, 0, 256, 0.5)'
    },
    cirle: {
        width: CIRCLE * 2,
        height: CIRCLE * 2,
        borderRadius: CIRCLE,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 5,
        borderColor: 'rgba(0, 0, 256, 0.5)'
    }
})