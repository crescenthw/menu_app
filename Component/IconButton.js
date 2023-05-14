import { Pressable, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function IconButton(onPress) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <FontAwesome
        name="send-o"
        size={24}
        color="#5a67ea"
        style={styles.inputBtn}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  inputBtn: {
    marginBottom: 10,
    marginRight: 10,
  },
});
