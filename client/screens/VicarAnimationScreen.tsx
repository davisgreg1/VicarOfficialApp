import React, { useState, useEffect } from "react";
import {
  TextInputProps,
  TextInput,
  ScrollView,
  Keyboard,
  StyleSheet,
  Button,
  SafeAreaView,
  View,
  Text,
} from "react-native";
import KeyHandOverAnim from "../components/KeyHandOverAnim";
import { RootTabScreenProps } from "../types";

export default function VicarAnimationScreen({
  navigation,
}: RootTabScreenProps<"VicarAnimationScreen">) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("HomeScreen");
    }, 4999);
  }, []);
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <KeyHandOverAnim />
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
});
