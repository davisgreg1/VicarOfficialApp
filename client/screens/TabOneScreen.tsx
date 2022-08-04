import React, { useState } from "react";
import {
  TextInputProps,
  TextInput,
  ScrollView,
  Keyboard,
  StyleSheet,
  Button,
  SafeAreaView,
  View,
} from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import { RootTabScreenProps } from "../types";
import axios from "../utils/axios";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}></View>
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
