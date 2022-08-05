import { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { Text, View } from "../components/Themed";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { RootTabScreenProps } from "../types";

export default function FetchCarScreen({
  navigation,
}: RootTabScreenProps<"FetchCarScreen">) {
  const handleOnSubmit = () => {
    Alert.alert("submitting");
    navigation.navigate("VicarAnimationScreen");
  };
  return (
    <View style={{ flex: 1 }}>
      <ProgressSteps>
        <ProgressStep label="Vehicle">
          <View style={{ alignItems: "center" }}>
            <Text>Which vehicle would you like us to bring?</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="Location">
          <View style={{ alignItems: "center" }}>
            <Text>Where would you like the valet to return your vehicle?</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="Confirm" onSubmit={handleOnSubmit}>
          <View style={{ alignItems: "center" }}>
            <Text>Please confirm your details.</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
