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
  Spacer,
} from "@react-native-material/core";
import { RadioButton } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { RootTabScreenProps } from "../types";
import { addVehicle } from "../redux/actions/userActions/addVehicle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
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
    type: Yup.string().required("type is required"),
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
        {({ errors, values, handleChange, handleSubmit, setFieldValue }) => {
          const disabled =
            errors.licenseNumber ||
            errors.year ||
            errors.make ||
            errors.model ||
            errors.color ||
            errors.type;
          const handleAddVehicle = () => handleSubmit();

          const handleSetColor = (color: string) => {
            setFieldValue("color", color);
            setShowPicker(!showPicker);
          };

          return (
            <KeyboardAwareScrollView>
              <View style={[styles.contentContainer]}>
                <Divider style={{ marginTop: 60 }} />

                <TextInput
                  ref={licenseRef}
                  variant="outlined"
                  value={values.licenseNumber}
                  onChangeText={handleChange("licenseNumber")}
                  label="Vehicle License Plate ID"
                  returnKeyType={"next"}
                  onSubmitEditing={() => {
                    yearRef.current?.focus();
                  }}
                  helperText={errors.licenseNumber}
                  leading={(props) => (
                    <FontAwesome name="drivers-license" {...props} />
                  )}
                />
                <Spacer style={{ padding: 16 }} />
                <TextInput
                  ref={yearRef}
                  variant="outlined"
                  keyboardType="numeric"
                  value={values.year}
                  onChangeText={handleChange("year")}
                  label="Vehicle Year"
                  returnKeyType={"next"}
                  onSubmitEditing={() => {
                    makeRef.current?.focus();
                  }}
                  helperText={errors.year}
                  leading={(props) => <Octicons name="number" {...props} />}
                />
                <Spacer style={{ padding: 16 }} />

                <TextInput
                  ref={makeRef}
                  variant="outlined"
                  keyboardType="default"
                  value={values.make}
                  onChangeText={handleChange("make")}
                  label="Vehicle Make"
                  returnKeyType={"next"}
                  onSubmitEditing={() => {
                    modelRef.current?.focus();
                  }}
                  helperText={errors.make}
                  leading={(props) => (
                    <FontAwesome5 name="car-side" {...props} />
                  )}
                />
                <Spacer style={{ padding: 16 }} />

                <TextInput
                  ref={modelRef}
                  variant="outlined"
                  keyboardType="default"
                  value={values.model}
                  onChangeText={handleChange("model")}
                  label="Vehicle Model"
                  returnKeyType={"next"}
                  onSubmitEditing={() => {
                    nickNameRef.current?.focus();
                  }}
                  helperText={errors.model}
                  leading={(props) => (
                    <FontAwesome5 name="car-alt" {...props} />
                  )}
                />
                <Spacer style={{ padding: 16 }} />

                <TextInput
                  ref={nickNameRef}
                  variant="outlined"
                  value={values.nickName}
                  onChangeText={handleChange("nickName")}
                  label="Vehicle Nick Name"
                  maxLength={16}
                  returnKeyType={"next"}
                />
                <Spacer style={{ padding: 16 }} />

                <Button
                  variant="text"
                  title="Select Vehicle Color"
                  color="#c64141"
                  style={styles.vehicleColorButton}
                  onPress={() => {
                    setShowPicker(!showPicker);
                  }}
                />
                {showPicker && (
                  <>
                    <ColorPicker
                      onColorSelected={(color) => handleSetColor(color)}
                      style={{
                        flex: 1,
                        width: 300,
                        height: 300,
                        alignSelf: "center",
                      }}
                    />
                    <Text>
                      {values.color && (
                        <Ionicons
                          name="checkmark-done-circle"
                          size={24}
                          color={"black"}
                        />
                      )}
                    </Text>
                    <Text>
                      {errors.color && (
                        <Text style={{ color: "gray" }}>{errors.color}</Text>
                      )}
                    </Text>
                  </>
                )}
                <Spacer style={{ padding: 16 }} />

                <View style={styles.radios}>
                  <View>
                    <Text style={[styles.btnHeadingText, colorStyle]}>
                      Is your vehicle already parked?
                    </Text>
                    <View style={styles.radioBtns}>
                      <RadioButton.Group
                        onValueChange={handleChange("isCarParked")}
                        value={values.isCarParked}>
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
                    <Text>
                      {errors.type && (
                        <Text style={{ color: "gray" }}>{errors.type}</Text>
                      )}
                    </Text>

                    <View style={styles.radioBtns}>
                      <RadioButton.Group
                        onValueChange={handleChange("type")}
                        value={values.type}>
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
              <Button
                style={styles.buttonTouch}
                title="Add Vehicle"
                disabled={!!disabled}
                onPress={handleAddVehicle}
                color="#c64141"
              />
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

  buttonTouch: {
    alignItems: "center",
    marginTop: 50,
    alignSelf: "center",
  },
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
  vehicleColorButton: {
    alignSelf: "center",
    margin: 16,
  },
});
