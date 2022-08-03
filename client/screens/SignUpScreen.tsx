import React from "react";
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
import { useTheme } from "@react-navigation/native";
import { useSelector, useDispatch, connect } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import EditScreenInfo from "../components/EditScreenInfo";
import { FormField } from "../components/FormField";
import { RootTabScreenProps } from "../types";
import axios from "../utils/axios";
import { createAccount } from "../redux/actions/authActions/createAccount";

export default function SignUpScreen({
  navigation,
}: RootTabScreenProps<"SignUpScreen">) {
  const { colors } = useTheme();
  const colorStyle = { color: colors.text };
  const backGroundStyle = { color: colors.background };

  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email().required("Provide a valid email."),
        firstName: Yup.string().required("First name is required."),
        lastName: Yup.string().required("Last name is required."),
        password: Yup.string().required("Password is required."),
        confirmPassword: Yup.string().required("Password is required."),
      })}
      onSubmit={(values, formikActions) => {
        try {
          const data = {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
          };
          dispatch(createAccount(data));
        } catch (error) {
          console.error("SIGN IN ERROR -> render -> error", error);
        }
      }}>
      {(props) => {
        const handleLoginPress = () => {
          props.handleSubmit();
        };
        return (
          <SafeAreaView style={styles.container}>
            <View style={[styles.contentContainer]}>
              <FormField
                {...props}
                keyboardType="default"
                value={props.values.firstName}
                onChangeText={props.handleChange("firstName")}
                label="Your First Name"
                returnKeyType={"next"}
                // ref={signInEmailInput}
                // onSubmitEditing={() => handleEmailInput()}
              />
              <FormField
                {...props}
                keyboardType="default"
                value={props.values.lastName}
                onChangeText={props.handleChange("lastName")}
                label="Your Last Name"
                returnKeyType={"next"}
                // ref={signInEmailInput}
                // onSubmitEditing={() => handleEmailInput()}
              />
              <FormField
                {...props}
                keyboardType="email-address"
                value={props.values.email}
                onChangeText={props.handleChange("email")}
                label="Your Email Address"
                returnKeyType={"next"}
                // ref={signInEmailInput}
                // onSubmitEditing={() => handleEmailInput()}
              />
              <FormField
                {...props}
                // ref={signInPasswordInput}
                value={props.values.password}
                onChangeText={props.handleChange("password")}
                label="Your Password"
                maxLength={16}
                secureTextEntry
                returnKeyType={"next"}
                keyboardType="visible-password"
                // onSubmitEditing={() => handlePasswordInput()}
              />
              <FormField
                {...props}
                // ref={signInPasswordInput}
                value={props.values.confirmPassword}
                onChangeText={props.handleChange("confirmPassword")}
                label="Confirm Password"
                maxLength={16}
                secureTextEntry
                returnKeyType={"done"}
                keyboardType="visible-password"
                // onSubmitEditing={() => handlePasswordInput()}
              />
              {/* <ForgotPasswordContainer onPress={() => handleOnPress()}>
                <ForgotPasswordLink>I forgot my password</ForgotPasswordLink>
                <GoForwardButtonContainer>
                  <GoForwardButton />
                </GoForwardButtonContainer>
              </ForgotPasswordContainer> */}
            </View>
            <View style={styles.signInLinks}>
              <TouchableOpacity
                disabled={
                  !props.values.email &&
                  !props.values.password &&
                  !props.values.firstName &&
                  !props.values.lastName &&
                  !props.values.confirmPassword &&
                  props.values.password !== props.values.confirmPassword
                }
                style={styles.buttonTouch}
                onPress={() => handleLoginPress()}>
                <Text style={styles.getStartedText}>{`Sign Up`}</Text>
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
    // height: Dimensions.get("screen").height,
    // marginTop: 30,
  },
  contentContainer: {
    paddingTop: 8,
    display: "flex",
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
