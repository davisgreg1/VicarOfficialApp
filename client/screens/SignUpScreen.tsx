import React, { useRef, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { VStack, TextInput, Spacer, Button } from "@react-native-material/core";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { RootTabScreenProps } from "../types";
import { createAccount } from "../redux/actions/authActions/createAccount";

export default function SignUpScreen({
  navigation,
}: RootTabScreenProps<"SignUpScreen">) {
  const dispatch = useDispatch();

  const firstNameInput = useRef<HTMLInputElement>(null);
  const lastNameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const confirmPWInput = useRef<HTMLInputElement>(null);

  const FormSchema = Yup.object({
    email: Yup.string().email().required("provide a valid email"),
    firstName: Yup.string()
      .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ\s\-\/.]+$/, "please enter valid name")
      .max(40)
      .required("your first name is required"),
    lastName: Yup.string()
      .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ\s\-\/.]+$/, "please enter valid name")
      .max(40)
      .required("your last name is required"),
    password: Yup.string().required("password is required"),
    confirmPassword: Yup.string()
      .required("please retype your password")
      .oneOf([Yup.ref("password")], "your passwords do not match"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        confirmPassword: "",
      }}
      validationSchema={FormSchema}
      onSubmit={(values) => {
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
      {({ errors, handleSubmit, ...props }) => {
        const handleLoginPress = () => handleSubmit();
        const disabled =
          errors.firstName ||
          errors.lastName ||
          errors.email ||
          errors.password ||
          errors.confirmPassword;
        return (
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <VStack m={4} spacing={4}>
              <Spacer style={{ padding: 16 }} />
              <TextInput
                ref={firstNameInput}
                variant="standard"
                value={props.values.firstName}
                onChangeText={props.handleChange("firstName")}
                label="First Name"
                returnKeyType={"next"}
                onSubmitEditing={() => lastNameInput?.current?.focus()}
                helperText={errors.firstName}
              />
              <Spacer style={{ padding: 16 }} />
              <TextInput
                ref={lastNameInput}
                variant="standard"
                value={props.values.lastName}
                onChangeText={props.handleChange("lastName")}
                label="Last Name"
                returnKeyType={"next"}
                onSubmitEditing={() => emailInput?.current?.focus()}
                helperText={errors.lastName}
              />
              <Spacer style={{ padding: 16 }} />
              <TextInput
                ref={emailInput}
                variant="standard"
                keyboardType="email-address"
                value={props.values.email}
                onChangeText={props.handleChange("email")}
                label="Email Address"
                returnKeyType={"next"}
                onSubmitEditing={() => passwordInput?.current?.focus()}
                helperText={errors.email}
              />
              <Spacer style={{ marginVertical: 80 }} />
              <TextInput
                ref={passwordInput}
                variant="standard"
                value={props.values.password}
                onChangeText={props.handleChange("password")}
                label="Password"
                secureTextEntry={true}
                returnKeyType={"next"}
                onSubmitEditing={() => confirmPWInput?.current?.focus()}
                helperText={errors.password}
              />
              <Spacer style={{ padding: 16 }} />
              <TextInput
                ref={confirmPWInput}
                variant="standard"
                value={props.values.confirmPassword}
                onChangeText={props.handleChange("confirmPassword")}
                label="Repeat Password"
                secureTextEntry
                returnKeyType={"done"}
                onSubmitEditing={handleLoginPress}
                helperText={errors.confirmPassword}
              />
              <Spacer style={{ padding: 16 }} />
              {/* <ForgotPasswordContainer onPress={() => handleOnPress()}>
                <ForgotPasswordLink>I forgot my password</ForgotPasswordLink>
                <GoForwardButtonContainer>
                  <GoForwardButton />
                </GoForwardButtonContainer>
              </ForgotPasswordContainer> */}
            </VStack>
            <View style={styles.signUpBtn}>
              <Button
                style={styles.buttonTouch}
                title="Sign Up"
                disabled={!!disabled}
                onPress={handleLoginPress}
                color="#c64141"
              />
            </View>
          </ScrollView>
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
  },
  container: {
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
    alignItems: "center",
    marginTop: 50,
    alignSelf: "center",
  },
});
