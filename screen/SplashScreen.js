import React from "react";
import { Text, StyleSheet, Animated, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontDancing from "../fonts/FontDancing";
import LottieScreen from "./LottieScreen";

const SplashScreen = () => {
  FontDancing();
  const [showSplash, setShowSplash] = React.useState(true);
  const opacityValue = React.useRef(new Animated.Value(0)).current;
  const textOpacityValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const transitionAnimation = Animated.timing(opacityValue, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    });

    const textAnimation = Animated.timing(textOpacityValue, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    });

    setTimeout(() => {
      setShowSplash(false);
      transitionAnimation.start();
    }, 1200);

    opacityValue.addListener(({ value }) => {
      if (value === 1) {
        textAnimation.start();
      }
    });

    return () => {
      opacityValue.removeAllListeners();
    };
  }, []);

  if (showSplash) {
    return <LottieScreen />;
  }

  return (
    <Animated.View style={[styles.container, { opacity: opacityValue }]}>
      <LinearGradient
        colors={["rgba(95, 208, 120, 0)", "rgba(95, 208, 120, 0.2)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <Animated.View
          style={[styles.textContainer, { opacity: textOpacityValue }]}
        >
          <View style={{ paddingRight: 5 }}>
            <Text style={styles.text}>PlatePal </Text>
          </View>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    width: "100%",
    height: "100%",
  },
  gradient: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "DancingScript_700Bold",
    fontSize: 60,
    color: "#5FD078",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
});

export default SplashScreen;
