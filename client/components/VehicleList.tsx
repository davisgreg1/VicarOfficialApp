import { View, Text } from "react-native";
import Vehicle from "./Vehicle";
import { VehicleType } from "../types";

import React from "react";

interface VehicleListProps {
  vehicles: Array<VehicleType>;
}

export default function VehicleList(props: VehicleListProps) {
  const { vehicles } = props;
  return (
    <View>
      {vehicles.map((vehicle) => {
        return <Vehicle key={vehicle.id} vehicle={vehicle} />;
      })}
    </View>
  );
}
