import React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";

const LottieScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LinearGradient
        colors={["rgba(95, 208, 120, 0)", "rgba(95, 208, 120, 0.2)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.lottieContainer}>
          <LottieView
            style={{
              width: "75%",
              height: "75%",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.9, //투명도
            }}
            source={require("../screen/animation/LottieSplash.json")}
            autoPlay
            loop={false}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  lottieContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LottieScreen;
