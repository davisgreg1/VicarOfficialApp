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
import { Button } from "react-native-paper";
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
  const [profileEditOpen, setProfileEditOpen] = useState(false);

  const firstNameInput = useRef<HTMLInputElement>(null);
  const lastNameInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);

  const userId = useSelector((state: RootState) => state.user.userId);
  const handleOnPress = () => {
    setProfileEditOpen(!profileEditOpen);
  };

  const FormSchema = Yup.object({
    userFirstName: Yup.string()
      .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ\s\-\/.]+$/, "please enter valid name")
      .max(40)
      .required("first name is required"),
    userLastName: Yup.string()
      .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ\s\-\/.]+$/, "please enter valid name")
      .max(40)
      .required("last name is required"),
    email: Yup.string().email().required("email is required"),
    userPhoneNumber: Yup.number()
      .positive()
      .integer("phone number is required"),
  });

  const AuthFormSchema = Yup.object({
    userPassword: Yup.string().required("password is required"),
    confirmUserPassword: Yup.string()
      .required("please retype your password")
      .oneOf([Yup.ref("userPassword")], "your passwords do not match"),
  });

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
                  email: data.userEmail,
                }}
                validationSchema={FormSchema}
                onSubmit={(values, formikActions) => {
                  try {
                    const data = {
                      firstName: values.userFirstName,
                      lastName: values.userLastName,
                      email: values.email,
                      phoneNumber: values.userPhoneNumber,
                    };
                    dispatch(updateProfile(data));
                  } catch (error) {
                    console.error("ADD Edit ERROR -> render -> error", error);
                  }
                }}>
                {({
                  errors,
                  handleSubmit,
                  handleChange,
                  values,
                  dirty,
                  ...props
                }) => {
                  const handleOnSubmit = () => {
                    handleSubmit();
                    setProfileEditOpen(!profileEditOpen);
                  };

                  return (
                    <KeyboardAvoidingView
                      keyboardVerticalOffset={10}
                      behavior={Platform.OS === "ios" ? "padding" : "height"}>
                      <View style={[styles.contentContainer]}>
                        <TextInput
                          ref={emailInput}
                          variant="standard"
                          value={values.email}
                          onChangeText={handleChange("email")}
                          label="Email"
                          returnKeyType={"next"}
                          onSubmitEditing={() => {
                            firstNameInput.current?.focus();
                          }}
                          helperText={errors.email}
                        />
                        <Spacer style={{ padding: 16 }} />
                        <TextInput
                          ref={firstNameInput}
                          variant="standard"
                          value={values.userFirstName}
                          onChangeText={handleChange("userFirstName")}
                          label="First name"
                          returnKeyType={"next"}
                          onSubmitEditing={() => {
                            lastNameInput.current?.focus();
                          }}
                          helperText={errors.userFirstName}
                        />
                        <Spacer style={{ padding: 16 }} />
                        <TextInput
                          ref={lastNameInput}
                          variant="standard"
                          value={values.userLastName}
                          onChangeText={handleChange("userLastName")}
                          label="Last name"
                          returnKeyType={"next"}
                          onSubmitEditing={() => {
                            phoneInput.current?.focus();
                          }}
                          helperText={errors.userLastName}
                        />
                        <Spacer style={{ padding: 16 }} />

                        <TextInput
                          ref={phoneInput}
                          variant="standard"
                          keyboardType="phone-pad"
                          value={values.userPhoneNumber}
                          onChangeText={handleChange("userPhoneNumber")}
                          label="Phone Number"
                          returnKeyType={"done"}
                          onSubmitEditing={handleOnSubmit}
                        />
                        <Spacer style={{ padding: 16 }} />
                      </View>
                      <View>
                        <Button
                          onPress={handleOnSubmit}
                          mode="contained-tonal"
                          textColor="#fff"
                          buttonColor="#000"
                          disabled={!dirty}
                          accessibilityLabel="Save Changes Button"
                          icon="content-save">
                          {`Save Changes`}
                        </Button>
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
                validationSchema={AuthFormSchema}
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
                {({ errors, handleChange, handleSubmit, values, ...props }) => {
                  const authDisabled =
                    errors.userPassword || errors.confirmUserPassword;

                  const handleOnSubmit = () => {
                    if (values.userPassword === values.confirmUserPassword) {
                      handleSubmit();
                      setProfileEditOpen(!profileEditOpen);
                    }
                  };
                  return (
                    <VStack>
                      <TextInput
                        ref={passwordInput}
                        variant="standard"
                        secureTextEntry={true}
                        value={values.userPassword}
                        onChangeText={handleChange("userPassword")}
                        label="Password"
                        returnKeyType={"next"}
                        onSubmitEditing={() => {
                          confirmPasswordInput.current?.focus();
                        }}
                        helperText={errors.userPassword}
                      />
                      <Spacer style={{ padding: 16 }} />
                      <TextInput
                        ref={confirmPasswordInput}
                        variant="standard"
                        secureTextEntry={true}
                        value={values.confirmUserPassword}
                        onChangeText={handleChange("confirmUserPassword")}
                        label="Confirm Password"
                        returnKeyType={"done"}
                        onSubmitEditing={handleOnSubmit}
                        helperText={errors.confirmUserPassword}
                      />
                      <Spacer style={{ margin: 16 }} />

                      <View>
                        <Button
                          onPress={handleOnSubmit}
                          mode="contained-tonal"
                          textColor="#fff"
                          buttonColor="#000"
                          disabled={!!authDisabled}
                          accessibilityLabel="Save Changes Button"
                          icon="content-save">
                          {`Save Changes`}
                        </Button>
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
          <Text style={styles.editLink}>
            {profileEditOpen ? "Cancel" : "Edit"}
          </Text>
        </Pressable>
      </View>
      {profileEditOpen && renderEditFields()}
      {!profileEditOpen && <View style={styles.dataSection}>{children}</View>}
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
