import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { VStack, TextInput, Spacer } from "@react-native-material/core";
import VehicleList from "../components/VehicleList";
import DateTimePicker from "../components/DateTimePicker";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { RootTabScreenProps, VehicleType, RootState } from "../types";
import {
  setPickUpAddress,
  createPickUpJob,
} from "../redux/actions/serviceActions";
import dayjs from "dayjs";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ParkCarScreen({
  navigation,
}: RootTabScreenProps<"ParkCarScreen">) {
  const dispatch = useDispatch();

  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const zipCodeRef = useRef<HTMLInputElement>(null);

  const vehicles: Array<VehicleType> = useSelector(
    (state: RootState) => state.user.vehicles,
  );

  const vehicleToPark = useSelector(
    (state: RootState) => state.service.vehicle,
  );

  const date = useSelector((state: RootState) => state.service.date);
  const address = useSelector((state: RootState) => state.service.address);
  const city = useSelector((state: RootState) => state.service.city);
  const state = useSelector((state: RootState) => state.service.state);
  const zipCode = useSelector((state: RootState) => state.service.zipCode);

  const handleOnSubmit = () => {
    const timeVal = dayjs(date).format("hh:mm A");
    const dateVal = dayjs(date).format("MMM DD");
    const data = {
      pickUpTime: timeVal,
      pickUpDate: dateVal,
      pickUpAddress1: address,
      pickUpCity: city,
      pickUpState: state,
      pickUpZipCode: zipCode,
      vehicleId: vehicleToPark.id,
    };

    dispatch(createPickUpJob(data));

    navigation.navigate("VicarAnimationScreen");
  };

  const vehicleSelected = vehicleToPark === null ? false : true;
  const dateSelected = date === "" ? false : true;
  const validAddress = address === "" ? false : true;
  const validCity = city === "" ? false : true;
  const validState = state === "" ? false : true;
  const validZipCode = zipCode === "" ? false : true;
  const locationErrors =
    !validAddress || !validCity || !validState || !validZipCode;

  const parsedDate = date ? dayjs(date).format("MMM DD, YYYY hh:mm A") : "";
  const allCarsAreParked = vehicles.every((vehicle) => vehicle.isCarParked);
  const vehiclesToPark = vehicles.filter((vehicle) => !vehicle.isCarParked);

  return (
    <View style={{ flex: 1 }}>
      <ProgressSteps
        activeStepIconBorderColor="#c64141"
        activeLabelColor="#c64141"
        activeStepNumColor="#c64141">
        <ProgressStep
          errors={!vehicleSelected || allCarsAreParked}
          label="Vehicle">
          <View style={{ alignItems: "center" }}>
            {allCarsAreParked ? (
              <Text>No available vehicles to park.</Text>
            ) : (
              <Text>Which vehicle would you like us to park?</Text>
            )}
          </View>
          <VehicleList vehicles={vehiclesToPark} isReturningToOwner={false} />
        </ProgressStep>
        <ProgressStep label="Schedule" errors={!dateSelected}>
          <View style={{ alignItems: "center" }}>
            <DateTimePicker
              typeOfSchedule={"pick up"}
              buttonTitle={"When would you like your valet to meet you?"}
              selectedDate={parsedDate}
            />
          </View>
        </ProgressStep>
        <ProgressStep label="Location" errors={locationErrors}>
          <Text style={{ marginLeft: 25 }}>
            Where would you like your valet to meet you?
          </Text>
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
                dispatch(setPickUpAddress(data));
              } catch (error) {
                console.error("SIGN IN SET ADDRESS -> error", error);
              }
            }}>
            {(props) => {
              const handleSetAddress = () => {
                props.handleSubmit();
              };
              const { values, handleChange, errors } = props;

              const disabled =
                errors.address || errors.city || errors.state || errors.zipCode;

              return (
                <View style={[styles.contentContainer]}>
                  <Spacer style={{ padding: 16 }} />

                  <TextInput
                    variant="standard"
                    placeholder={address ? address : ""}
                    keyboardType="default"
                    value={values.address}
                    onChangeText={handleChange("address")}
                    label="Address"
                    returnKeyType={"next"}
                    ref={addressRef}
                    onSubmitEditing={() => {
                      cityRef.current?.focus();
                    }}
                    style={{
                      borderStyle: "dashed",
                      borderWidth: props.errors.address ? 2 : 0,
                      padding: props.errors.address ? 4 : 0,
                      borderColor: "red",
                    }}
                  />
                  <Spacer style={{ padding: 16 }} />

                  <TextInput
                    variant="standard"
                    placeholder={city ? city : ""}
                    keyboardType="default"
                    value={values.city}
                    onChangeText={handleChange("city")}
                    label="City"
                    returnKeyType={"next"}
                    ref={cityRef}
                    onSubmitEditing={() => {
                      stateRef.current?.focus();
                    }}
                    style={{
                      borderStyle: "dashed",
                      borderWidth: props.errors.city ? 2 : 0,
                      padding: props.errors.city ? 4 : 0,
                      borderColor: "red",
                    }}
                  />
                  <Spacer style={{ padding: 16 }} />

                  <TextInput
                    variant="standard"
                    placeholder={state ? state : ""}
                    keyboardType="default"
                    value={values.state}
                    onChangeText={handleChange("state")}
                    label="State"
                    returnKeyType={"next"}
                    ref={stateRef}
                    onSubmitEditing={() => {
                      zipCodeRef.current?.focus();
                    }}
                    style={{
                      borderStyle: "dashed",
                      borderWidth: props.errors.state ? 2 : 0,
                      padding: props.errors.state ? 4 : 0,
                      borderColor: "red",
                    }}
                  />
                  <Spacer style={{ padding: 16 }} />

                  <TextInput
                    variant="standard"
                    placeholder={zipCode ? zipCode : ""}
                    keyboardType="number-pad"
                    value={values.zipCode}
                    onChangeText={handleChange("zipCode")}
                    label="Zip Code"
                    returnKeyType={"done"}
                    ref={zipCodeRef}
                    onSubmitEditing={handleSetAddress}
                    style={{
                      borderStyle: "dashed",
                      borderWidth: props.errors.zipCode ? 2 : 0,
                      padding: props.errors.zipCode ? 4 : 0,
                      borderColor: "red",
                    }}
                  />
                  <TouchableOpacity
                    disabled={disabled}
                    style={styles.buttonTouch}
                    onPress={() => handleSetAddress()}>
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
              Vehicle: {vehicleToPark?.year} {vehicleToPark?.make}{" "}
              {vehicleToPark?.model}
            </Text>
            <Text>Date: {parsedDate}</Text>
            <Text>Address: {address}</Text>
            <Text>City: {city}</Text>
            <Text>State: {state}</Text>
            <Text>Zip Code: {zipCode}</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    display: "flex",
    padding: 30,
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
