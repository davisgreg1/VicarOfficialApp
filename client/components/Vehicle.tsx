import React from "react";
import {  TouchableOpacity, StyleSheet, } from "react-native";
import { Text, View } from "../components/Themed";

import { FontAwesome } from "@expo/vector-icons";
import { VehicleType } from "../types";
import { useDispatch } from "react-redux";
import {
  setPickUpVehicle,
  setReturnVehicle,
} from "../redux/actions/serviceActions";

interface VehiclePropType {
  vehicle: VehicleType;
  isReturningToOwner: boolean;
}

export default function Vehicle(props: VehiclePropType) {
  const dispatch = useDispatch();
  const {
    vehicle: { color, year, make, model, licenseNumber, nickName },
    isReturningToOwner,
  } = props;

  const handleOnPress = () => {
    isReturningToOwner
      ? dispatch(setReturnVehicle(props.vehicle))
      : dispatch(setPickUpVehicle(props.vehicle));
  };

  return (
    <TouchableOpacity onPress={handleOnPress} style={styles.container}>
      <View style={styles.carView}>
        <Text>{nickName ? `"${nickName}"` : ""}</Text>
        <FontAwesome style={styles.carImage} name="car" size={50} color={'#c64141'} />
        <Text>
          {year} {make} {model}
        </Text>
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
    borderWidth: 2,
    borderRadius: 30,
    display: "flex",
    alignContent: "center",
    alignSelf: "center",
    marginVertical: 16,
  },
  carView: {
    alignItems: "center",
  },
  carImage: {
    margin: 16
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
