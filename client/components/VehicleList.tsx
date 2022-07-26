import { View, Text } from "react-native";
import Vehicle from "./Vehicle";
import { VehicleType } from "../types";

import React from "react";

interface VehicleListProps {
  vehicles: Array<VehicleType>;
  isReturningToOwner: boolean;
}

export default function VehicleList(props: VehicleListProps) {
  const { vehicles, isReturningToOwner } = props;
  return (
    <View>
      {vehicles.map((vehicle) => {
        return (
          <Vehicle
            isReturningToOwner={isReturningToOwner}
            key={vehicle.id}
            vehicle={vehicle}
          />
        );
      })}
    </View>
  );
}
