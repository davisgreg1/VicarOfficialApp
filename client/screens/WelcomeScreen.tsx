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
import { loginUser } from "../redux/actions/authActions/loginUser";

export default function WelcomeScreen({
  navigation,
}: RootTabScreenProps<"WelcomeScreen">) {
  const { colors } = useTheme();
  const colorStyle = { color: colors.text };
  const backGroundStyle = { color: colors.background };

  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email().required("Provide a valid email."),
        password: Yup.string().required("Password is required."),
      })}
      onSubmit={(values, formikActions) => {
        try {
          const data = {
            email: values.email,
            password: values.password,
          };
          // TODO: type dispatch
          dispatch(loginUser(data));
        } catch (error) {
          console.error("SIGN IN ERROR -> render -> error", error);
        }
      }}>
      {(props) => {
        const {
          errors,
          status,
          touched,
          isSubmitting,
          dirty,
          handleSubmit,
          values,
          handleChange,
        } = props;
        const handleLoginPress = () => {
          handleSubmit();
        };
        return (
          <SafeAreaView style={styles.container}>
            <View style={[styles.contentContainer]}>
              <FormField
                {...props}
                keyboardType="email-address"
                value={values.email}
                onChangeText={handleChange("email")}
                label="Your Email Address"
                returnKeyType={"next"}
                // ref={signInEmailInput}
                // onSubmitEditing={() => handleEmailInput()}
              />
              <FormField
                {...props}
                // ref={signInPasswordInput}
                value={values.password}
                onChangeText={handleChange("password")}
                label="Your Password"
                maxLength={16}
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
            <View style={styles.signInLinks}>
              <TouchableOpacity
                disabled={!values.email && !values.password}
                style={styles.buttonTouch}
                onPress={() => handleLoginPress()}>
                <Text style={styles.getStartedText}>{`Sign In`}</Text>
              </TouchableOpacity>
              <View style={styles.signInButton}>
                <Text
                  style={[styles.signInText, colorStyle]}
                  onPress={(): void => {
                    navigation.navigate("SignUpScreen");
                  }}>
                  Don't have an account? Sign up now
                </Text>
              </View>
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
    backgroundColor: "#c64141",
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
