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
  KeyboardAvoidingView,
  Platform,
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
          <SafeAreaView>
            <KeyboardAvoidingView
              style={styles.container}
              behavior={Platform.OS === "ios" ? "padding" : "padding"}
              keyboardVerticalOffset={150}>
              <View>
                <View>
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
                    // ref={signInPasswordInput}
                    {...props}
                    value={props.values.password}
                    onChangeText={props.handleChange("password")}
                    label="Your Password"
                    secureTextEntry={true}
                    returnKeyType={"next"}
                    // onSubmitEditing={() => handlePasswordInput()}
                  />
                  <FormField
                    // ref={signInPasswordInput}
                    {...props}
                    value={props.values.confirmPassword}
                    onChangeText={props.handleChange("confirmPassword")}
                    label="Confirm Password"
                    secureTextEntry
                    returnKeyType={"done"}
                    // onSubmitEditing={() => handlePasswordInput()}
                  />
                  {/* <ForgotPasswordContainer onPress={() => handleOnPress()}>
                <ForgotPasswordLink>I forgot my password</ForgotPasswordLink>
                <GoForwardButtonContainer>
                  <GoForwardButton />
                </GoForwardButtonContainer>
              </ForgotPasswordContainer> */}
                </View>
                <View style={styles.signUpBtn}>
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
                    <Text>{`Sign Up`}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        );
      }}
    </Formik>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  signUpBtn: {
    justifyContent: "flex-end",
    alignSelf: "center",
    alignItems: "center",
    padding: 8,
  },
  buttonTouch: {
    backgroundColor: "#c64141",
    borderRadius: 24,
    width: 315,
    padding: 16,
    alignItems: "center",
  },
});
