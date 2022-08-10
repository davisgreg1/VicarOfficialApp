import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
// import { Text, View } from "../components/Themed";
import VehicleList from "../components/VehicleList";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { RootTabScreenProps, VehicleType, RootState } from "../types";

export default function ParkCarScreen({
  navigation,
}: RootTabScreenProps<"ParkCarScreen">) {
  const vehicles: Array<VehicleType> = useSelector(
    (state: RootState) => state.user.vehicles,
  );
  
  const handleOnSubmit = () => {
    navigation.navigate("VicarAnimationScreen");
  };
  return (
    <View style={{ flex: 1 }}>
      <ProgressSteps
        activeStepIconBorderColor="#c64141"
        activeLabelColor="#c64141"
        activeStepNumColor="#c64141">
        <ProgressStep label="Vehicle">
          <View style={{ alignItems: "center" }}>
            <Text>Which vehicle would you like us to park?</Text>
          </View>
          <VehicleList vehicles={vehicles} />
        </ProgressStep>
        <ProgressStep label="Schedule">
          <View style={{ alignItems: "center" }}>
            <Text>When would you like it returned?</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="Location">
          <View style={{ alignItems: "center" }}>
            <Text>
              Where would you like the valet to retrieve and return your
              vehicle, if needed?
            </Text>
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
