import React, { useRef, useState } from "react";
import {
  TextInputProps,
  ScrollView,
  Keyboard,
  StyleSheet,
  Button,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { VStack, TextInput, Divider } from "@react-native-material/core";
import { RadioButton } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { RootTabScreenProps } from "../types";
import { addVehicle } from "../redux/actions/userActions/addVehicle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function AddVehicleScreen({
  navigation,
}: RootTabScreenProps<"AddVehicleScreen">) {
  const { colors } = useTheme();
  const colorStyle = { color: colors.text };
  const dispatch = useDispatch();

  const makeRef = useRef<HTMLInputElement>(null);
  const modelRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const licenseRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{
          licenseNumber: "",
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
          licenseNumber: Yup.string().required(
            "Vehicle license number is required.",
          ),
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
              licenseNumber: values.licenseNumber,
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
            <KeyboardAwareScrollView>
              <View style={[styles.contentContainer]}>
              <Divider style={{ marginTop: 60 }}/>

                <TextInput
                  variant="outlined"
                  value={props.values.licenseNumber}
                  onChangeText={props.handleChange("licenseNumber")}
                  label="Vehicle License Plate ID"
                  returnKeyType={"next"}
                  ref={licenseRef}
                  onSubmitEditing={() => {
                    yearRef.current?.focus();
                  }}
                />
                <TextInput
                  variant="outlined"
                  keyboardType="numeric"
                  value={props.values.year}
                  onChangeText={props.handleChange("year")}
                  label="Vehicle Year"
                  returnKeyType={"next"}
                  ref={yearRef}
                  onSubmitEditing={() => {
                    makeRef.current?.focus();
                  }}
                />
                <TextInput
                  variant="outlined"
                  keyboardType="default"
                  value={props.values.make}
                  onChangeText={props.handleChange("make")}
                  label="Vehicle Make"
                  returnKeyType={"next"}
                  ref={makeRef}
                  onSubmitEditing={() => {
                    modelRef.current?.focus();
                  }}
                />
                <TextInput
                  variant="outlined"
                  keyboardType="default"
                  value={props.values.model}
                  onChangeText={props.handleChange("model")}
                  label="Vehicle Model"
                  returnKeyType={"next"}
                  ref={modelRef}
                  onSubmitEditing={() => {
                    colorRef.current?.focus();
                  }}
                />
                <TextInput
                  variant="outlined"
                  value={props.values.color}
                  onChangeText={props.handleChange("color")}
                  label="Vehicle Color"
                  returnKeyType={"next"}
                  ref={colorRef}
                  onSubmitEditing={() => {
                    nickNameRef.current?.focus();
                  }}
                />
                <TextInput
                  variant="outlined"
                  value={props.values.nickName}
                  onChangeText={props.handleChange("nickName")}
                  label="Vehicle Nick Name"
                  maxLength={16}
                  returnKeyType={"next"}
                  ref={nickNameRef}
                />
                <View style={styles.radios}>
                  <View>
                    <Text style={[styles.btnHeadingText, colorStyle]}>
                      Is your vehicle already parked?
                    </Text>
                    <View style={styles.radioBtns}>
                      <RadioButton.Group
                        onValueChange={props.handleChange("isCarParked")}
                        value={props.values.isCarParked}>
                        <RadioButton.Item
                          uncheckedColor="#c64141"
                          color="#c64141"
                          label="Yes"
                          value="yes"
                        />
                        <RadioButton.Item
                          uncheckedColor="#c64141"
                          color="#c64141"
                          label="No"
                          value="no"
                        />
                      </RadioButton.Group>
                    </View>
                  </View>
                  <View>
                    <Text style={[styles.btnHeadingText, colorStyle]}>
                      Type of Transmission:
                    </Text>
                    <View style={styles.radioBtns}>
                      <RadioButton.Group
                        onValueChange={props.handleChange("type")}
                        value={props.values.type}>
                        <RadioButton.Item
                          uncheckedColor="#c64141"
                          color="#c64141"
                          label="Automatic"
                          value="Automatic"
                        />
                        <RadioButton.Item
                          uncheckedColor="#c64141"
                          color="#c64141"
                          label="Manual"
                          value="Manual"
                        />
                        <RadioButton.Item
                          uncheckedColor="#c64141"
                          color="#c64141"
                          label="Electric"
                          value="Electric"
                        />
                      </RadioButton.Group>
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                // style={styles.buttonTouch}
                style={styles.addVehicleBtn}
                onPress={() => handleAddVehicle()}>
                <Text>{`Add Vehicle`}</Text>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          );
        }}
      </Formik>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // display: "flex",
    height: Dimensions.get("window").height - StatusBar?.currentHeight,
    marginTop: 16,
  },
  contentContainer: {
    display: "flex",
  },
  radioBtnsContainer: {
    // justifyContent: "flex-start",
    flexDirection: "row",
    // width: Dimensions.get("window").width,
  },
  btnHeadingText: {
    // marginLeft: 42,
  },
  btnText: {
    alignItems: "center",
  },
  radios: {
    display: "flex",
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  radioBtns: {
    flexDirection: "row",
    // alignItems: "center",
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
  // buttonTouch: {
  //   backgroundColor: "#c64141",
  //   borderRadius: 24,
  //   width: 315,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  getStartedText: {
    // color: "white",
  },
  signInButton: {
    alignItems: "center",
  },
  addVehicleBtn: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
    alignSelf: "center",

    backgroundColor: "#c64141",
    borderRadius: 24,
    width: 315,
    alignItems: "center",
    padding: 8,
  },
});
