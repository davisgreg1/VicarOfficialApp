import React, { useState } from "react";
import {
  TextInputProps,
  TextInput,
  ScrollView,
  Keyboard,
  StyleSheet,
  // Button,
  SafeAreaView,
  View,
  Pressable,
  Image,
} from "react-native";
import { Button, Colors } from "react-native-paper";
import { useDispatch } from "react-redux";
import { RootTabScreenProps } from "../types";
import { refreshVehicles } from "../redux/actions/serviceActions";
import { FontAwesome } from "@expo/vector-icons";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate("Modal")}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}>
          <FontAwesome
            name="cogs"
            size={25}
            color={"black"}
            style={{ marginRight: 15 }}
          />
        </Pressable>
      ),
      headerTitle: (props) => (
        <Image
          style={{ width: 60, height: 60 }}
          source={require("../assets/images/vicarLogo1.png")}
          resizeMode="contain"
        />
      ),
    });
  }, [navigation]);
  const dispatch = useDispatch();

  const handleParkMyCarClick = () => {
    dispatch(refreshVehicles());
    navigation.navigate("ParkCarScreen");
  };

  const handleFetchMyCarClick = () => {
    dispatch(refreshVehicles());
    navigation.navigate("FetchCarScreen");
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Button
          onPress={handleParkMyCarClick}
          mode="elevated"
          textColor="#c64141"
          style={styles.button}
          accessibilityLabel="Park My Car Button"
          icon="car-key">
          Park My Car
        </Button>

        <Button
          onPress={handleFetchMyCarClick}
          mode="elevated"
          textColor="#c64141"
          accessibilityLabel="Bring My Car Button"
          style={styles.button}
          icon="car-arrow-right">
          Bring My Car
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginVertical: 10,
    width: 300,
  },
});
