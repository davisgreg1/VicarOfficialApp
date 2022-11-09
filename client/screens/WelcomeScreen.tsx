import React, { useEffect, useRef } from "react";
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
  TouchableWithoutFeedback,
} from "react-native";
import {
  VStack,
  TextInput,
  Divider,
  Button,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { RootState, RootTabScreenProps } from "../types";
import { loginUser } from "../redux/actions/authActions/loginUser";

const HideKeyboard = ({ children }: any) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function WelcomeScreen({
  navigation,
}: RootTabScreenProps<"WelcomeScreen">) {
  const { colors } = useTheme();
  const colorStyle = { color: colors.text };
  const backGroundStyle = { color: colors.background };

  const dispatch = useDispatch();

  const loginError: string = useSelector(
    (state: RootState) => state.auth.message,
  );

  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const signInScreenRef = useRef<HTMLDivElement>(null);

  const FormSchema = Yup.object({
    email: Yup.string().email().required("provide a valid email"),
    password: Yup.string().required("password is required"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={FormSchema}
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

        const handleLoginPress = () => handleSubmit();

        const handleOnNavigate = (): void =>
          navigation.navigate("SignUpScreen");

        const disabled = errors.email || errors.password;

        return (
          <SafeAreaView>
            <HideKeyboard>
              <View ref={signInScreenRef}>
                <VStack m={50} spacing={24}>
                  <TextInput
                    ref={emailInput}
                    variant="standard"
                    keyboardType="email-address"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    label="Email"
                    returnKeyType={"next"}
                    onSubmitEditing={() => passwordInput?.current?.focus()}
                    leading={(props) => <Icon name="email" {...props} />}
                    helperText={errors.email}
                  />
                  <TextInput
                    ref={passwordInput}
                    variant="standard"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    label="Password"
                    maxLength={16}
                    secureTextEntry
                    returnKeyType={"done"}
                    onSubmitEditing={handleLoginPress}
                    helperText={errors.password}
                    leading={(props) => <Icon name="lock" {...props} />}
                  />
                  {!values.email && !values.password && (
                    <Text style={styles.errorStyle}>{loginError}</Text>
                  )}

                  {/* <ForgotPasswordContainer onPress={() => handleOnPress()}>
                <ForgotPasswordLink>I forgot my password</ForgotPasswordLink>
                <GoForwardButtonContainer>
                  <GoForwardButton />
                </GoForwardButtonContainer>
              </ForgotPasswordContainer> */}
                  <View style={styles.signInLinks}>
                    <Button
                      style={styles.buttonTouch}
                      title="Sign In"
                      disabled={!!disabled}
                      onPress={handleLoginPress}
                      color="#c64141"
                    />
                    <Text
                      style={[styles.signInText, colorStyle]}
                      onPress={handleOnNavigate}>
                      Don't have an account? Sign up now
                    </Text>
                  </View>
                </VStack>
              </View>
            </HideKeyboard>
          </SafeAreaView>
        );
      }}
    </Formik>
  );
}
const styles = StyleSheet.create({
  signInLinks: {
    justifyContent: "flex-end",
    marginBottom: 20,
    alignSelf: "center",
    alignItems: "center",
    padding: 8,
  },
  buttonTouch: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 40,
    alignSelf: "center",
  },
  signInText: {
    textDecorationLine: "underline",
    padding: 8,
    marginBottom: 16,
  },
  errorStyle: {
    color: "red",
    fontSize: 16,
    alignSelf: "center",
  },
});
