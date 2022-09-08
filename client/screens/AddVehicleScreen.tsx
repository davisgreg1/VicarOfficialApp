import React, { useRef, useState } from "react";
import {
  TextInputProps,
  ScrollView,
  Keyboard,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import {
  VStack,
  TextInput,
  Divider,
  Button,
} from "@react-native-material/core";
import { RadioButton } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { RootTabScreenProps } from "../types";
import { addVehicle } from "../redux/actions/userActions/addVehicle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ColorPicker } from "react-native-color-picker";

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

  const [showPicker, setShowPicker] = useState(false);

  const FormSchema = Yup.object({
    year: Yup.number().required().positive().integer("provide a valid year"),
    make: Yup.string().required("vehicle make is required"),
    licenseNumber: Yup.string().required("vehicle license number is required"),
    model: Yup.string().required("vehicle model is required"),
    type: Yup.string().required("vehicle transmission type is required"),
    color: Yup.string().required("vehicle color is required"),
    isCarParked: Yup.string().required("this field must be checked"),
    nickName: Yup.string(),
  });

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
        validationSchema={FormSchema}
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
          const handleAddVehicle = () => props.handleSubmit();

          const handleSetColor = (color: string) =>
            props.setFieldValue("color", color);

          return (
            <KeyboardAwareScrollView>
              <View style={[styles.contentContainer]}>
                <Divider style={{ marginTop: 60 }} />

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
                  style={{
                    borderStyle: "dashed",
                    borderWidth: props.errors.licenseNumber ? 2 : 0,
                    padding: props.errors.licenseNumber ? 8 : 0,
                    marginBottom: props.errors.licenseNumber ? 1 : 0,
                    borderColor: "red",
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
                  style={{
                    borderStyle: "dashed",
                    borderWidth: props.errors.year ? 2 : 0,
                    padding: props.errors.year ? 8 : 0,
                    marginBottom: props.errors.year ? 1 : 0,
                    borderColor: "red",
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
                  style={{
                    borderStyle: "dashed",
                    borderWidth: props.errors.make ? 2 : 0,
                    padding: props.errors.make ? 8 : 0,
                    marginBottom: props.errors.make ? 1 : 0,
                    borderColor: "red",
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
                    nickNameRef.current?.focus();
                  }}
                  style={{
                    borderStyle: "dashed",
                    borderWidth: props.errors.model ? 2 : 0,
                    padding: props.errors.model ? 8 : 0,
                    marginBottom: props.errors.model ? 1 : 0,
                    borderColor: "red",
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
                <Button
                  variant="text"
                  title="Select Vehicle Color"
                  color="#c64141"
                  onPress={() => {
                    setShowPicker(!showPicker);
                  }}
                  style={{
                    borderStyle: "dashed",
                    borderWidth: props.errors.color ? 2 : 0,
                    padding: props.errors.color ? 8 : 0,
                    marginBottom: props.errors.color ? 1 : 0,
                    borderColor: "red",
                  }}
                />
                {showPicker && (
                  <ColorPicker
                    onColorSelected={(color) => handleSetColor(color)}
                    style={{
                      flex: 1,
                      width: 300,
                      height: 300,
                      alignSelf: "center",
                    }}
                  />
                )}
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
                    <Text
                      style={[
                        styles.btnHeadingText,
                        colorStyle,
                        {
                          borderStyle: "dashed",
                          borderWidth: props.errors.type ? 2 : 0,
                          padding: props.errors.type ? 8 : 0,
                          marginBottom: props.errors.type ? 1 : 0,
                          borderColor: "red",
                        },
                      ]}>
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
                style={styles.addVehicleBtn}
                onPress={handleAddVehicle}>
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
    marginHorizontal: 16,
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
