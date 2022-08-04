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
          };
          dispatch(addVehicle(data));
        } catch (error) {
          console.error("SIGN IN ERROR -> render -> error", error);
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
                <Text>Type of Transmission:</Text>
                <View style={styles.radioBtns}>
                  <RadioButton.Group
                    onValueChange={props.handleChange("type")}
                    value={props.values.type}>
                    <Text style={styles.btnText}>Automatic</Text>
                    <RadioButton value="Automatic"></RadioButton>
                    <Text style={styles.btnText}>Manual</Text>
                    <RadioButton value="Manual"></RadioButton>
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
    paddingTop: 8,
    display: "flex",
  },
  radioBtnsContainer: {
    alignSelf: "center",
    justifyContent: "center",
  },
  btnText: {
    alignItems: "center",
  },
  radioBtns: {
    flexDirection: "row",
    alignSelf: "center",
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
    backgroundColor: "red",
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
    padding: 16,
  },
  signInText: {
    textDecorationLine: "underline",
    padding: 8,
    marginBottom: 16,
  },
});
