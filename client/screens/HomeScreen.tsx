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
import { useSelector, useDispatch, connect } from "react-redux";
import EditScreenInfo from "../components/EditScreenInfo";
import { RootTabScreenProps } from "../types";
import axios from "../utils/axios";
import { logoutUser } from "../redux/actions/authActions/logoutUser";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
  const dispatch = useDispatch();

  const handleLogOut = () => dispatch(logoutUser());

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Button
          onPress={() => navigation.navigate("ParkCarScreen")}
          title="Park My Car"
          color="#c64141"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() => navigation.navigate("FetchCarScreen")}
          title="Bring My Car"
          color="#c64141"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() => handleLogOut()}
          title="Log Out"
          color="#c64141"
          accessibilityLabel="Learn more about this purple button"
        />
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
