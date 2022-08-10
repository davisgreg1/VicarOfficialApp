import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { VehicleType } from "../types";

interface VehiclePropType {
  vehicle: VehicleType;
}

export default function Vehicle(props: VehiclePropType) {
  const {
    vehicle: { color, year, make, model, licenseNumber },
  } = props;
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.carView}>
        <FontAwesome
          name="car"
          size={50}
          color={color}
        />
        <Text>{year}{" "}{make}{" "}{model}</Text>
        <Text>{licenseNumber}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 200,
    borderColor: "#c64141",
    borderWidth: 5,
    display: "flex",
    alignContent: "center",
    alignSelf: "center",
    marginVertical: 16
  },
  carView: {
    alignItems: 'center'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
