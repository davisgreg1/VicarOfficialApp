import React, { useRef } from "react";
import {
  TextInputProps,
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
import { VStack, TextInput, Divider } from "@react-native-material/core";
import { useTheme } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { RootTabScreenProps } from "../types";
import { loginUser } from "../redux/actions/authActions/loginUser";

export default function WelcomeScreen({
  navigation,
}: RootTabScreenProps<"WelcomeScreen">) {
  const { colors } = useTheme();
  const colorStyle = { color: colors.text };
  const backGroundStyle = { color: colors.background };

  const dispatch = useDispatch();

  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

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
          <SafeAreaView>
            <View style={styles.mainCont}>
              <VStack m={12} spacing={24}>
                <Divider style={{ marginTop: 60 }} />

                <TextInput
                  ref={emailInput}
                  color={"black"}
                  variant="outlined"
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  label="Email"
                  returnKeyType={"next"}
                  onSubmitEditing={() => passwordInput?.current?.focus()}
                />
                <TextInput
                  ref={passwordInput}
                  variant="outlined"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  label="Your Password"
                  maxLength={16}
                  secureTextEntry
                  returnKeyType={"done"}
                  // onFocus={() => {
                  //   alert('fuck you');
                  // }}
                  onSubmitEditing={() => handleLoginPress()}
                />
                {/* <ForgotPasswordContainer onPress={() => handleOnPress()}>
                <ForgotPasswordLink>I forgot my password</ForgotPasswordLink>
                <GoForwardButtonContainer>
                  <GoForwardButton />
                </GoForwardButtonContainer>
              </ForgotPasswordContainer> */}
                <View style={styles.signInLinks}>
                  <TouchableOpacity
                    disabled={!values.email && !values.password}
                    style={styles.buttonTouch}
                    onPress={() => handleLoginPress()}>
                    <Text>{`Sign In`}</Text>
                  </TouchableOpacity>
                  <Text
                    style={[styles.signInText, colorStyle]}
                    onPress={(): void => {
                      navigation.navigate("SignUpScreen");
                    }}>
                    Don't have an account? Sign up now
                  </Text>
                </View>
              </VStack>
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
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  mainCont: {
    // display: "flex",
    // justifyContent: "center",
    // alignSelf: "center",
    // height: "100%",
  },
  signInLinks: {
    justifyContent: "flex-end",
    marginBottom: 20,
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
  signInText: {
    textDecorationLine: "underline",
    padding: 8,
    marginBottom: 16,
  },
});
