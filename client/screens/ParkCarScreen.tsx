import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, TextInput, Spacer } from "@react-native-material/core";
import VehicleList from "../components/VehicleList";
import DateTimePicker from "../components/DateTimePicker";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { RootTabScreenProps, VehicleType, RootState } from "../types";
import {
  setPickUpAddress,
  createPickUpJob,
} from "../redux/actions/serviceActions";
import dayjs from "dayjs";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Octicons } from "@expo/vector-icons";

import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "@react-navigation/native";

export default function ParkCarScreen({
  navigation,
}: RootTabScreenProps<"ParkCarScreen">) {
  const { colors } = useTheme();
  const colorStyle = { color: colors.text };
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

  const [locationNextDisabled, setLocationNextDisabled] = useState(true);

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

  const vehicleSelected = Boolean(vehicleToPark);

  const dateSelected = Boolean(date);

  const parsedDate = date ? dayjs(date).format("MMM DD, YYYY hh:mm A") : "";
  const allCarsAreParked = vehicles.every((vehicle) => vehicle.isCarParked);
  const vehiclesToPark = vehicles.filter((vehicle) => !vehicle.isCarParked);

  const FormSchema = Yup.object({
    address: Yup.string().required("address is required"),
    city: Yup.string().required("city is required"),
    state: Yup.string().required("state is required"),
    zipCode: Yup.string()
      .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, "please enter valid zip code")
      .required("zip code is required"),
  });

  return (
    <View style={{ flex: 1 }}>
      <ProgressSteps
        activeStepIconBorderColor="#c64141"
        activeLabelColor="#c64141"
        activeStepNumColor="#c64141">
        <ProgressStep
          nextBtnDisabled={!vehicleSelected || allCarsAreParked}
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
        <ProgressStep label="Schedule" nextBtnDisabled={!dateSelected}>
          <View style={{ alignItems: "center" }}>
            <DateTimePicker
              typeOfSchedule={"pick up"}
              buttonTitle={"When would you like your valet to meet you?"}
              selectedDate={parsedDate}
            />
          </View>
        </ProgressStep>
        <ProgressStep label="Location" nextBtnDisabled={locationNextDisabled}>
          <Text style={{ marginLeft: 25 }}>
            Where would you like your valet to meet you?
          </Text>
          <Formik
            initialValues={{
              address: address ? address : "",
              city: city ? city : "",
              state: state ? state : "",
              zipCode: zipCode ? zipCode : "",
            }}
            validationSchema={FormSchema}
            onSubmit={(values, formikActions) => {
              try {
                const data = {
                  address: values.address,
                  city: values.city,
                  state: values.state,
                  zipCode: values.zipCode,
                };
                setLocationNextDisabled(false);

                // TODO: type dispatch
                dispatch(setPickUpAddress(data));
              } catch (error) {
                console.error("SIGN IN SET ADDRESS -> error", error);
              }
            }}>
            {(props) => {
              const handleSetAddress = () => props.handleSubmit();

              const { values, handleChange, errors } = props;

              const disabled =
                errors.address || errors.city || errors.state || errors.zipCode;

              return (
                <View style={[styles.contentContainer]}>
                  <Spacer style={{ padding: 16 }} />
                  <TextInput
                    ref={addressRef}
                    inputStyle={[colorStyle]}
                    styles={colorStyle}
                    variant="standard"
                    placeholder={address ? address : ""}
                    keyboardType="default"
                    value={values.address}
                    onChangeText={handleChange("address")}
                    label="Address"
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                      cityRef.current?.focus();
                    }}
                    helperText={errors.address}
                    leading={(props) => <Icon name="city" {...props} />}
                  />
                  <Spacer style={{ padding: 16 }} />
                  <TextInput
                    ref={cityRef}
                    inputStyle={[colorStyle]}
                    variant="standard"
                    placeholder={city ? city : ""}
                    keyboardType="default"
                    value={values.city}
                    onChangeText={handleChange("city")}
                    label="City"
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                      stateRef.current?.focus();
                    }}
                    helperText={errors.city}
                    leading={(props) => <Icon name="city-variant" {...props} />}
                  />
                  <Spacer style={{ padding: 16 }} />

                  <TextInput
                    ref={stateRef}
                    inputStyle={[colorStyle]}
                    variant="standard"
                    placeholder={state ? state : ""}
                    keyboardType="default"
                    value={values.state}
                    onChangeText={handleChange("state")}
                    label="State"
                    returnKeyType={"next"}
                    onSubmitEditing={() => {
                      zipCodeRef.current?.focus();
                    }}
                    helperText={errors.state}
                    leading={(props) => <Icon name="home-city" {...props} />}
                  />
                  <Spacer style={{ padding: 16 }} />

                  <TextInput
                    ref={zipCodeRef}
                    inputStyle={[colorStyle]}
                    variant="standard"
                    placeholder={zipCode ? zipCode : ""}
                    keyboardType="number-pad"
                    value={values.zipCode}
                    onChangeText={handleChange("zipCode")}
                    label="Zip Code"
                    returnKeyType={"done"}
                    onSubmitEditing={handleSetAddress}
                    helperText={errors.zipCode}
                    leading={(props) => <Octicons name="number" {...props} />}
                  />
                  <Button
                    style={styles.buttonTouch}
                    title="Set Address"
                    disabled={!!disabled}
                    onPress={handleSetAddress}
                    color="#c64141"
                  />
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
    alignItems: "center",
    marginTop: 50,
    alignSelf: "center",
  },
});
