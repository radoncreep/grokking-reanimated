import { StyleSheet } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import { Page } from "../../components/Page";


const WORDS = ["firstword", "banana", "bayblade"];

export const InterpolateScrollView = () => {
    // store contentOffset in sharedValue then use it to interpolate and animate
    const translateX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        translateX.value = event.contentOffset.x;
    });

    return (
        <Animated.ScrollView 
            pagingEnabled
            horizontal
            onScroll={scrollHandler}
            scrollEventThrottle={16} // fires scrollevent every 16ms
            style={styles.container}
        >
            {WORDS.map((word, index) => (
                <Page 
                    key={index.toString()} 
                    title={word} 
                    index={index} 
                    translateX={translateX}
                />
            ))}
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})