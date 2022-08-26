import React, { useState } from "react";
import {
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Text, View } from "./Themed";
import { FormField } from "./FormField";

interface Props {
  heading: string;
  data: any;
  children: any;
  type: string;
}

export default function EditProfileSection(props: Props) {
  const { heading, children, data, type } = props;
  const [editOpen, setEditOpen] = useState(false);

  const handleOnPress = () => {
    setEditOpen(!editOpen);
  };

  const renderEditFields = () => {
    switch (type) {
      case "personal":
        return (
          <KeyboardAvoidingView
            keyboardVerticalOffset={10}
            behavior={Platform.OS === "ios" ? "position" : "height"}>
            <ScrollView style={[styles.contentContainer]}>
              <Formik
                initialValues={{
                  userFirstName: data.userFirstName,
                  userLastName: data.userLastName,
                  userPhoneNumber: data.userPhoneNumber,
                }}
                validationSchema={Yup.object({
                  userPhoneNumber: Yup.number()
                    .positive()
                    .integer("Provide a valid phone number."),
                  userFirstName: Yup.string(),
                  userLastName: Yup.string(),
                })}
                onSubmit={(values, formikActions) => {
                  try {
                    const data = {
                      userPhoneNumber: values.userPhoneNumber,
                      userFirstName: values.userFirstName,
                      userLastName: values.userLastName,
                    };
                    // dispatch(addVehicle(data));
                    console.log("data is:", data);
                  } catch (error) {
                    console.error("ADD Edit ERROR -> render -> error", error);
                  }
                }}>
                {(props) => {
                  const handleOnSubmit = () => {
                    props.handleSubmit();
                    setEditOpen(!editOpen);
                  };
                  return (
                    <KeyboardAvoidingView
                      keyboardVerticalOffset={10}
                      behavior={Platform.OS === "ios" ? "padding" : "height"}>
                      <View style={[styles.contentContainer]}>
                        <FormField
                          {...props}
                          value={props.values.userFirstName}
                          onChangeText={props.handleChange("userFirstName")}
                          label="First name"
                          returnKeyType={"next"}
                        />
                        <FormField
                          {...props}
                          value={props.values.userLastName}
                          onChangeText={props.handleChange("userLastName")}
                          label="Last name"
                          returnKeyType={"next"}
                        />
                        <FormField
                          {...props}
                          keyboardType="phone-pad"
                          value={props.values.userPhoneNumber}
                          onChangeText={props.handleChange("userPhoneNumber")}
                          label="Phone Number"
                          returnKeyType={"done"}
                        />
                      </View>
                      <View style={styles.signInLinks}>
                        <TouchableOpacity
                          style={styles.buttonTouch}
                          onPress={() => handleOnSubmit()}>
                          <Text style={styles.saveChangesBtn}>
                            {`Save Changes`}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </KeyboardAvoidingView>
                  );
                }}
              </Formik>
            </ScrollView>
          </KeyboardAvoidingView>
        );
      case "auth":
        return (
          <KeyboardAvoidingView
            keyboardVerticalOffset={10}
            behavior={Platform.OS === "ios" ? "position" : "height"}>
            <ScrollView style={[styles.contentContainer]}>
              <Formik
                initialValues={{
                  userEmail: data.userEmail,
                  userPassword: "",
                  confirmUserPassword: "",
                }}
                validationSchema={Yup.object({
                  userEmail: Yup.string(),
                  userPassword: Yup.string(),
                  confirmUserPassword: Yup.string(),
                })}
                onSubmit={(values, formikActions) => {
                  try {
                    const data = {
                      userEmail: values.userEmail,
                      userPassword: values.userPassword,
                      confirmUserPassword: values.confirmUserPassword,
                    };
                    // dispatch(addVehicle(data));
                    console.log("auth data is:", data);
                  } catch (error) {
                    console.error("ADD Edit ERROR -> render -> error", error);
                  }
                }}>
                {(props) => {
                  const handleOnSubmit = () => {
                    return props.handleSubmit();
                  };
                  return (
                    <>
                      <FormField
                        {...props}
                        value={props.values.userEmail}
                        onChangeText={props.handleChange("userEmail")}
                        label="Email"
                        returnKeyType={"next"}
                      />
                      <FormField
                        {...props}
                        keyboardType="visible-password"
                        value={props.values.userPassword}
                        onChangeText={props.handleChange("userPassword")}
                        label="Password"
                        returnKeyType={"next"}
                      />
                      <FormField
                        {...props}
                        keyboardType="visible-password"
                        value={props.values.confirmUserPassword}
                        onChangeText={props.handleChange("confirmUserPassword")}
                        label="Confirm Password"
                        returnKeyType={"done"}
                      />

                      <View style={styles.signInLinks}>
                        <TouchableOpacity
                          style={styles.buttonTouch}
                          onPress={() => handleOnSubmit()}>
                          <Text style={styles.saveChangesBtn}>
                            {`Save Changes`}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  );
                }}
              </Formik>
            </ScrollView>
          </KeyboardAvoidingView>
        );

      default:
        break;
    }
  };

  return (
    <View>
      <View style={styles.topHeader}>
        <Text style={styles.headingText}>{heading}</Text>
        <Pressable onPress={handleOnPress}>
          <Text style={styles.editLink}>{editOpen ? "Cancel" : "Edit"}</Text>
        </Pressable>
      </View>
      {editOpen && renderEditFields()}
      {!editOpen && <View style={styles.dataSection}>{children}</View>}
    </View>
  );
}

// function handleHelpPress() {
//   WebBrowser.openBrowserAsync("https://vicarparking.com/sign-up/");
// }

const styles = StyleSheet.create({
  contentContainer: {
    display: "flex",
    paddingTop: 40,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headingText: {
    fontWeight: "600",
  },
  editLink: {
    textDecorationLine: "underline",
  },
  dataSection: {
    paddingTop: 32,
    flexDirection: "column",
  },
  saveChangesBtn: {
    alignSelf: "center",
  },
});
