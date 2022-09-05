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
} from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { RootTabScreenProps } from "../types";
import { refreshVehicles } from "../redux/actions/serviceActions";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
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
