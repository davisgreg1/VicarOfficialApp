import React, { useState } from "react";
import {
  TextInputProps,
  TextInput,
  ScrollView,
  Keyboard,
  StyleSheet,
  Button,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { useSelector, useDispatch, connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import EditScreenInfo from "../components/EditScreenInfo";
import { FormField } from "../components/FormField";
import { RootTabScreenProps } from "../types";
import axios from "../utils/axios";
import { addVehicle } from "../redux/actions/userActions/addVehicle";

export default function AddVehicleScreen({
  navigation,
}: RootTabScreenProps<"AddVehicleScreen">) {
  const { colors } = useTheme();
  const colorStyle = { color: colors.text };
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        year: "",
        make: "",
        model: "",
        color: "",
        nickName: "",
        type: "",
        isCarParked: "no",
      }}
      validationSchema={Yup.object({
        year: Yup.number()
          .required()
          .positive()
          .integer("Provide a valid year."),
        make: Yup.string().required("Vehicle make is required."),
        model: Yup.string().required("Vehicle model is required."),
        type: Yup.string().required("Vehicle transmission type is required."),
        color: Yup.string().required("Vehicle color is required."),
        isCarParked: Yup.string().required("This field must be checked"),
        nickName: Yup.string(),
      })}
      onSubmit={(values, formikActions) => {
        try {
          const data = {
            year: values.year,
            make: values.make,
            model: values.model,
            color: values.color,
            nickName: values.nickName,
            type: values.type,
            isCarParked: values.isCarParked === "yes" ? true : false,
          };
          dispatch(addVehicle(data));
        } catch (error) {
          console.error("ADD VEHICLE ERROR -> render -> error", error);
        }
      }}>
      {(props) => {
        const handleAddVehicle = () => {
          return props.handleSubmit();
        };
        return (
          <SafeAreaView style={styles.container}>
            <View style={[styles.contentContainer]}>
              <FormField
                {...props}
                keyboardType="numeric"
                value={props.values.year}
                onChangeText={props.handleChange("year")}
                label="Vehicle Year"
                returnKeyType={"next"}
              />
              <FormField
                {...props}
                keyboardType="default"
                value={props.values.make}
                onChangeText={props.handleChange("make")}
                label="Vehicle Make"
                returnKeyType={"next"}
              />
              <FormField
                {...props}
                keyboardType="default"
                value={props.values.model}
                onChangeText={props.handleChange("model")}
                label="Vehicle Model"
                returnKeyType={"next"}
              />
              <FormField
                {...props}
                value={props.values.color}
                onChangeText={props.handleChange("color")}
                label="Vehicle Color"
                returnKeyType={"next"}
              />
              <FormField
                {...props}
                value={props.values.nickName}
                onChangeText={props.handleChange("nickName")}
                label="Vehicle Nick Name"
                maxLength={16}
                returnKeyType={"next"}
              />
              <View style={styles.radioBtnsContainer}>
                <Text style={[styles.btnHeadingText, colorStyle]}>
                  Is your vehicle already parked?
                </Text>
                <View style={styles.radioBtns}>
                  <RadioButton.Group
                    onValueChange={props.handleChange("isCarParked")}
                    value={props.values.isCarParked}>
                    <Text style={[styles.btnText, colorStyle]}>Yes</Text>
                    <RadioButton
                      uncheckedColor="#c64141"
                      color="#c64141"
                      value={"yes"}></RadioButton>
                    <Text style={[styles.btnText, colorStyle]}>No</Text>
                    <RadioButton
                      uncheckedColor="#c64141"
                      color="#c64141"
                      value={"no"}></RadioButton>
                  </RadioButton.Group>
                </View>
              </View>
              <View style={styles.radioBtnsContainer}>
                <Text style={[styles.btnHeadingText, colorStyle]}>
                  Type of Transmission:
                </Text>
                <View style={styles.radioBtns}>
                  <RadioButton.Group
                    onValueChange={props.handleChange("type")}
                    value={props.values.type}>
                    <Text style={[styles.btnText, colorStyle]}>Automatic</Text>
                    <RadioButton
                      uncheckedColor="#c64141"
                      color="#c64141"
                      value="Automatic"></RadioButton>
                    <Text style={[styles.btnText, colorStyle]}>Manual</Text>
                    <RadioButton
                      uncheckedColor="#c64141"
                      color="#c64141"
                      value="Manual"></RadioButton>
                    <Text style={[styles.btnText, colorStyle]}>Electric</Text>
                    <RadioButton
                      uncheckedColor="#c64141"
                      color="#c64141"
                      value="Electric"></RadioButton>
                  </RadioButton.Group>
                </View>
              </View>
            </View>
            <View style={styles.signInLinks}>
              <TouchableOpacity
                style={styles.buttonTouch}
                onPress={() => handleAddVehicle()}>
                <Text style={styles.getStartedText}>{`Add Vehicle`}</Text>
              </TouchableOpacity>
              <View style={styles.signInButton}></View>
            </View>
          </SafeAreaView>
        );
      }}
    </Formik>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  contentContainer: {
    display: "flex",
  },
  radioBtnsContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    width: Dimensions.get("window").width,
  },
  btnHeadingText: {
    marginLeft: 42,
  },
  btnText: {
    alignItems: "center",
  },
  radioBtns: {
    flexDirection: "row",
    alignItems: "center",
  },
  signInLinks: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
    left: 10,
  },
  buttonTouch: {
    backgroundColor: "#c64141",
    borderRadius: 24,
    width: 315,
    padding: 16,
    alignItems: "center",
  },
  getStartedText: {
    // color: "white",
  },
  signInButton: {
    alignItems: "center",
  },
});
