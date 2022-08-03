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
import { Text, View } from "../components/Themed";
import EditScreenInfo from "../components/EditScreenInfo";
import { RootTabScreenProps } from "../types";
import axios from "../utils/axios";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = () => {
    try {
      axios.post("auth/signup", {
        lastName: lastName,
        firstName: firstName,
        password: password,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setFirstName("");
      setLastName("");
      setPassword("")
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Tab One</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <EditScreenInfo path="/screens/TabOneScreen.tsx" />
        <TextInput
          style={styles.input}
          onChangeText={setFirstName}
          value={firstName}
        />
        <TextInput
          style={styles.input}
          onChangeText={setLastName}
          value={lastName}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />
        <Button
          onPress={handleSubmit}
          title="Sign up"
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
