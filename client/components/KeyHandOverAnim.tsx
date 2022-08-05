import { StatusBar } from "expo-status-bar";
import { Platform, Dimensions, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native"; // if you have "esModuleInterop": true

export default function KeyHandOverAnim() {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.lottieElem}
        source={require("../assets/images/valet.json")}
        autoPlay={true}
        loop={false}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lottieElem: {
    flex: 1,
    height: Dimensions.get("screen").height,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
