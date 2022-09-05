import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { VStack, TextInput, Spacer } from "@react-native-material/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { Text, View } from "./Themed";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/actions/userActions/updateProfile";
import { updatePassword } from "../redux/actions/authActions/updatePW";
import { RootState } from "../types";

interface Props {
  heading: string;
  data: any;
  children: any;
  type: string;
}

export default function EditProfileSection(props: Props) {
  const dispatch = useDispatch();
  const { heading, children, data, type } = props;
  const [editOpen, setEditOpen] = useState(false);

  const firstNameInput = useRef<HTMLInputElement>(null);
  const lastNameInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);

  const userId = useSelector((state: RootState) => state.user.userId);;
  console.log('GREG LOOK!  ~ file: EditProfileSection.tsx ~ line 40 ~ EditProfileSection ~ userId', userId);
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
                  userEmail: data.userEmail,
                }}
                validationSchema={Yup.object({
                  userPhoneNumber: Yup.number()
                    .positive()
                    .integer("Provide a valid phone number."),
                  userFirstName: Yup.string(),
                  userLastName: Yup.string(),
                  userEmail: Yup.string(),
                })}
                onSubmit={(values, formikActions) => {
                  try {
                    const data = {
                      firstName: values.userFirstName,
                      lastName: values.userLastName,
                      email: values.userEmail,
                      phoneNumber: values.userPhoneNumber,
                    };
                    dispatch(updateProfile(data));
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
                        <TextInput
                          variant="standard"
                          value={props.values.userEmail}
                          onChangeText={props.handleChange("userEmail")}
                          label="Email"
                          returnKeyType={"next"}
                          ref={emailInput}
                          onSubmitEditing={() => {
                            firstNameInput.current?.focus();
                          }}
                        />
                        <Spacer style={{ padding: 16 }} />
                        <TextInput
                          variant="standard"
                          value={props.values.userFirstName}
                          onChangeText={props.handleChange("userFirstName")}
                          label="First name"
                          returnKeyType={"next"}
                          ref={firstNameInput}
                          onSubmitEditing={() => {
                            lastNameInput.current?.focus();
                          }}
                        />
                        <Spacer style={{ padding: 16 }} />
                        <TextInput
                          variant="standard"
                          value={props.values.userLastName}
                          onChangeText={props.handleChange("userLastName")}
                          label="Last name"
                          returnKeyType={"next"}
                          ref={lastNameInput}
                          onSubmitEditing={() => {
                            phoneInput.current?.focus();
                          }}
                        />
                        <Spacer style={{ padding: 16 }} />

                        <TextInput
                          variant="standard"
                          keyboardType="phone-pad"
                          value={props.values.userPhoneNumber}
                          onChangeText={props.handleChange("userPhoneNumber")}
                          label="Phone Number"
                          returnKeyType={"done"}
                          ref={phoneInput}
                          onSubmitEditing={handleOnSubmit}
                        />
                        <Spacer style={{ padding: 16 }} />
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
                  userPassword: "",
                  confirmUserPassword: "",
                }}
                validationSchema={Yup.object({
                  userPassword: Yup.string(),
                  confirmUserPassword: Yup.string(),
                })}
                onSubmit={(values, formikActions) => {
                  try {
                    const data = {
                      password: values.userPassword,
                      userId: userId,
                    };
                    dispatch(updatePassword(data));
                  } catch (error) {
                    console.error("ADD Edit ERROR -> render -> error", error);
                  }
                }}>
                {(props) => {
                  const handleOnSubmit = () => {
                    if (
                      props.values.userPassword ===
                      props.values.confirmUserPassword
                    ) {
                      props.handleSubmit();
                      setEditOpen(!editOpen);
                    }
                  };
                  return (
                    <VStack>
                      <TextInput
                        variant="standard"
                        keyboardType="visible-password"
                        value={props.values.userPassword}
                        onChangeText={props.handleChange("userPassword")}
                        label="Password"
                        returnKeyType={"next"}
                        ref={passwordInput}
                        onSubmitEditing={() => {
                          confirmPasswordInput.current?.focus();
                        }}
                      />
                      <Spacer style={{ padding: 16 }} />
                      <TextInput
                        variant="standard"
                        keyboardType="visible-password"
                        value={props.values.confirmUserPassword}
                        onChangeText={props.handleChange("confirmUserPassword")}
                        label="Confirm Password"
                        returnKeyType={"done"}
                        ref={confirmPasswordInput}
                        onSubmitEditing={handleOnSubmit}
                      />
                      <Spacer style={{ margin: 16 }} />

                      <View style={styles.signInLinks}>
                        <TouchableOpacity
                          style={styles.buttonTouch}
                          onPress={() => handleOnSubmit()}>
                          <Text style={styles.saveChangesBtn}>
                            {`Save Changes`}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </VStack>
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
