import React, { useRef, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { VStack, TextInput, Spacer } from "@react-native-material/core";
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
      {(props) => {
        const handleLoginPress = () => props.handleSubmit();
        return (
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <VStack m={4} spacing={4}>
              <Spacer style={{ padding: 16 }} />
              <TextInput
                variant="standard"
                ref={firstNameInput}
                value={props.values.firstName}
                onChangeText={props.handleChange("firstName")}
                label="Your First Name"
                returnKeyType={"next"}
                onSubmitEditing={() => lastNameInput?.current?.focus()}
              />
              <Spacer style={{ padding: 16 }} />
              <TextInput
                variant="standard"
                ref={lastNameInput}
                value={props.values.lastName}
                onChangeText={props.handleChange("lastName")}
                label="Your Last Name"
                returnKeyType={"next"}
                onSubmitEditing={() => emailInput?.current?.focus()}
              />
              <Spacer style={{ padding: 16 }} />
              <TextInput
                variant="standard"
                ref={emailInput}
                keyboardType="email-address"
                value={props.values.email}
                onChangeText={props.handleChange("email")}
                label="Your Email Address"
                returnKeyType={"next"}
                onSubmitEditing={() => passwordInput?.current?.focus()}
              />
              <Spacer style={{ marginVertical: 80 }} />
              <TextInput
                variant="standard"
                ref={passwordInput}
                value={props.values.password}
                onChangeText={props.handleChange("password")}
                label="Your Password"
                secureTextEntry={true}
                returnKeyType={"next"}
                onSubmitEditing={() => confirmPWInput?.current?.focus()}
              />
              <Spacer style={{ padding: 16 }} />
              <TextInput
                variant="standard"
                ref={confirmPWInput}
                value={props.values.confirmPassword}
                onChangeText={props.handleChange("confirmPassword")}
                label="Repeat Password"
                secureTextEntry
                returnKeyType={"done"}
                onSubmitEditing={handleLoginPress}
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
          </ScrollView>
          // </SafeAreaView>
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
    backgroundColor: "#c64141",
    borderRadius: 24,
    width: 315,
    padding: 16,
    alignItems: "center",
  },
});
