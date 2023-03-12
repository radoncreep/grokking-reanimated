import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated";

interface PageProps {
    title: string;
    index: number;
    translateX: Animated.SharedValue<number>;
}

const { width, height } = Dimensions.get("window");
const SIZE = width * 0.7;


export const Page = ({index, translateX, title}: PageProps) => {
    const inputRange = [(index-1) * width, index * width, (index+1) * width];

    const rStyle = useAnimatedStyle(() => {
        // when the shared value is equal to the first index of the input range
        // the the scale value will be mapped to the first index of the output range
        // and so on for other indexes
        console.log(translateX.value, index)
        const scale = interpolate(
            translateX.value,
            inputRange,
            [0, 1, 0],
            Extrapolate.CLAMP
        );

        const borderRadius = interpolate(
            translateX.value,
            inputRange,
            [0, SIZE / 2 , 0],
            Extrapolate.CLAMP // retaining the range by not making the interpolate func automatically create values outside the output range
        );
        
        return {
            borderRadius,
            transform: [
                {scale}
            ]
        }
    }, []);


    const rTextStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            translateX.value,
            inputRange,
            [200, 0, -200]
        )
        console.log({ translateY })
        return {
            transform: [
                {translateY}
            ]
        }
    }, []);

    return (
        <View
            style={{ 
                width, 
                height, 
                backgroundColor: `rgba(0, 0, 256, 0.${index + 2})`,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Animated.View style={[styles.square, rStyle]} />
            <Animated.View style={[{ position: "absolute" }, rTextStyle]}>
                <Text style={{ color: "#FFF", fontSize: 40, fontWeight: "700"}}>
                    {title}
                </Text>
            </Animated.View>
        </View>
    )
}


const styles = StyleSheet.create({
    square: {
        width: 300,
        height: 300,
        backgroundColor: "rgba(0, 0, 256, 0.4)"
    }
})