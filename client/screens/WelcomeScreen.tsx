import React, { useState } from "react";
import {
  TextInputProps,
  TextInput,
  ScrollView,
  Keyboard,
  StyleSheet,
  Button,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch, connect } from "react-redux";
import { Text, View } from "../components/Themed";
import EditScreenInfo from "../components/EditScreenInfo";
import { RootTabScreenProps } from "../types";
import axios from "../utils/axios";
import { loginUser } from "../redux/actions/authActions/loginUser";

export default function WelcomeScreen({
  navigation,
}: RootTabScreenProps<"WelcomeScreen">) {
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = () => {
    const data = {
      id: id,
      password: password,
    };
    try {
      // TODO: type dispatch
      dispatch(loginUser(data));
    } catch (error) {
      console.error(error);
    } finally {
      setId("");
      setPassword("");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text>ID here:</Text>
        <TextInput style={styles.input} onChangeText={setId} value={id} />
        <Text>Password here:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />
        <Button
          onPress={handleSubmit}
          title="Sign in"
          color="#841584"
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
