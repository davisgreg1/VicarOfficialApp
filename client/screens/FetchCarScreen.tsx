import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { StyleSheet, Alert, TouchableOpacity } from "react-native";
import dayjs from "dayjs";
import { Formik } from "formik";
import * as Yup from "yup";
import { VStack, TextInput, Spacer } from "@react-native-material/core";
import { Text, View } from "../components/Themed";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import VehicleList from "../components/VehicleList";
import DateTimePicker from "../components/DateTimePicker";
import { RootTabScreenProps, VehicleType, RootState } from "../types";
import {
  setReturnAddress,
  createReturnJob,
} from "../redux/actions/serviceActions";

export default function FetchCarScreen({
  navigation,
}: RootTabScreenProps<"FetchCarScreen">) {
  const dispatch = useDispatch();

  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const zipCodeRef = useRef<HTMLInputElement>(null);

  const vehicles: Array<VehicleType> = useSelector(
    (state: RootState) => state.user.vehicles,
  );
  const returnToOwnerVehicle = useSelector(
    (state: RootState) => state.service.returnToOwnerVehicle,
  );
  const returnToOwnerAddress = useSelector(
    (state: RootState) => state.service.returnToOwnerAddress,
  );
  const returnToOwnerCity = useSelector(
    (state: RootState) => state.service.returnToOwnerCity,
  );
  const returnToOwnerState = useSelector(
    (state: RootState) => state.service.returnToOwnerState,
  );
  const returnToOwnerZipCode = useSelector(
    (state: RootState) => state.service.returnToOwnerZipCode,
  );
  const returnToOwnerDate = useSelector(
    (state: RootState) => state.service.returnToOwnerDate,
  );

  const parsedDate = returnToOwnerDate
    ? dayjs(returnToOwnerDate).format("MMM DD, YYYY hh:mm A")
    : "";

  const vehiclesToFetch = vehicles.filter((vehicle) => vehicle.isCarParked);

  const handleOnSubmit = () => {
    const timeVal = dayjs(returnToOwnerDate).format("hh:mm A");
    const dateVal = dayjs(returnToOwnerDate).format("MMM DD");
    const data = {
      dropOffTime: timeVal,
      dropOffDate: dateVal,
      dropOffAddress1: returnToOwnerAddress,
      dropOffCity: returnToOwnerCity,
      dropOffState: returnToOwnerState,
      dropOffZipCode: returnToOwnerZipCode,
      vehicleId: returnToOwnerVehicle.id,
    };

    dispatch(createReturnJob(data));

    navigation.navigate("VicarAnimationScreen");
  };
  return (
    <View style={{ flex: 1 }}>
      <ProgressSteps>
        <ProgressStep errors={!returnToOwnerVehicle} label="Vehicle">
          <View style={{ alignItems: "center" }}>
            {!returnToOwnerVehicle ? (
              <Text>You have no parked vehicles.</Text>
            ) : (
              <Text>Which vehicle would you like us to bring?</Text>
            )}
          </View>
          <VehicleList vehicles={vehiclesToFetch} isReturningToOwner={true} />
        </ProgressStep>
        <ProgressStep label="Schedule">
          <View style={{ alignItems: "center" }}>
            <DateTimePicker
              typeOfSchedule={"return"}
              buttonTitle={"When would you like your valet to meet you?"}
              selectedDate={parsedDate}
            />
          </View>
        </ProgressStep>
        <ProgressStep label="Location">
          <View style={{ alignItems: "center" }}>
            <Text>Where would you like your valet to meet you?</Text>
          </View>
          <Formik
            initialValues={{
              address: "",
              city: "",
              state: "",
              zipCode: "",
            }}
            validationSchema={Yup.object({
              address: Yup.string().required("Provide a valid address."),
              city: Yup.string().required("Provide a valid city."),
              state: Yup.string().required("Provide a valid state."),
              zipCode: Yup.number().required("Provide a valid zipCode."),
            })}
            onSubmit={(values, formikActions) => {
              try {
                const data = {
                  address: values.address,
                  city: values.city,
                  state: values.state,
                  zipCode: values.zipCode,
                };
                // TODO: type dispatch
                dispatch(setReturnAddress(data));
              } catch (error) {
                console.error("SIGN IN SET ADDRESS -> error", error);
              }
            }}>
            {(props) => {
              const handleSetReturnAddress = () => {
                props.handleSubmit();
              };
              const { values, handleChange, errors } = props;

              const disabled =
                errors.address || errors.city || errors.state || errors.zipCode;

              return (
                <View style={[styles.contentContainer]}>
                  <Spacer style={{ padding: 16 }} />

                  <TextInput
                    ref={addressRef}
                    variant="standard"
                    placeholder={
                      returnToOwnerAddress ? returnToOwnerAddress : ""
                    }
                    keyboardType="default"
                    value={values.address}
                    onChangeText={handleChange("address")}
                    label="Address"
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                      cityRef.current?.focus();
                    }}
                    style={{
                      borderStyle: "dashed",
                      borderWidth: errors.address ? 2 : 0,
                      padding: errors.address ? 4 : 0,
                      borderColor: "red",
                    }}
                  />
                  <Spacer style={{ padding: 16 }} />

                  <TextInput
                    ref={cityRef}
                    variant="standard"
                    placeholder={returnToOwnerCity ? returnToOwnerCity : ""}
                    keyboardType="default"
                    value={values.city}
                    onChangeText={handleChange("city")}
                    label="City"
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                      stateRef.current?.focus();
                    }}
                    style={{
                      borderStyle: "dashed",
                      borderWidth: errors.city ? 2 : 0,
                      padding: errors.city ? 4 : 0,
                      borderColor: "red",
                    }}
                  />
                  <Spacer style={{ padding: 16 }} />

                  <TextInput
                    ref={stateRef}
                    variant="standard"
                    placeholder={returnToOwnerState ? returnToOwnerState : ""}
                    keyboardType="default"
                    value={values.state}
                    onChangeText={handleChange("state")}
                    label="State"
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                      zipCodeRef.current?.focus();
                    }}
                    style={{
                      borderStyle: "dashed",
                      borderWidth: errors.state ? 2 : 0,
                      padding: errors.state ? 4 : 0,
                      borderColor: "red",
                    }}
                  />
                  <Spacer style={{ padding: 16 }} />

                  <TextInput
                    ref={zipCodeRef}
                    variant="standard"
                    placeholder={
                      returnToOwnerZipCode ? returnToOwnerZipCode : ""
                    }
                    keyboardType="number-pad"
                    value={values.zipCode}
                    onChangeText={handleChange("zipCode")}
                    label="Zip Code"
                    returnKeyType={"done"}
                    onSubmitEditing={handleSetReturnAddress}
                    style={{
                      borderStyle: "dashed",
                      borderWidth: errors.zipCode ? 2 : 0,
                      padding: errors.zipCode ? 4 : 0,
                      borderColor: "red",
                    }}
                  />
                  <TouchableOpacity
                    disabled={disabled}
                    style={styles.buttonTouch}
                    onPress={() => handleSetReturnAddress()}>
                    <Text>{`Set Address`}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </Formik>
        </ProgressStep>
        <ProgressStep label="Confirm" onSubmit={handleOnSubmit}>
          <View style={{ alignItems: "center" }}>
            <Text>Please confirm your details.</Text>
            <Text>
              Vehicle: {returnToOwnerVehicle?.year} {returnToOwnerVehicle?.make}{" "}
              {returnToOwnerVehicle?.model}
            </Text>
            <Text>Date: {parsedDate}</Text>
            <Text>Address: {returnToOwnerAddress}</Text>
            <Text>City: {returnToOwnerCity}</Text>
            <Text>State: {returnToOwnerState}</Text>
            <Text>Zip Code: {returnToOwnerZipCode}</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 30,
    display: "flex",
  },
  buttonTouch: {
    backgroundColor: "#c64141",
    borderRadius: 24,
    width: 315,
    padding: 16,
    alignItems: "center",
    marginTop: 50,
    alignSelf: "center",
  },
});
