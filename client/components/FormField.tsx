import React from "react";
import {
  TextInputProps,
  TextInput,
  ScrollView,
  View,
  Keyboard,
  StyleSheet,
  Text,
  Appearance,
} from "react-native";
import { useTheme } from "@react-navigation/native";

// const ErrorMessageContainer = styled.View`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   align-content: center;
//   align-self: center;
// `;

// const ErrorMessageText = styled.Text`
//   display: flex;
//   flex-direction: row;
//   text-align: left;
//   margin-top: -16px;
//   padding-bottom: 8px;
//   font-family: circularstd-bold;
//   font-size: 12px;
//   line-height: 20px;
//   letter-spacing: 0.236364px;
//   color: red;
// `;

type FormFieldProps = TextInputProps & {
  label?: string;
  name?: string;
  error?: boolean;
  errorMsg?: string;
};

const FormField = React.forwardRef(
  ({ label, name, error, errorMsg, ...props }: FormFieldProps, ref) => {
    const { colors } = useTheme();
    const colorStyle = { color: colors.text };

    return (
      <View>
        <View style={styles.inputContainer}>
          <ScrollView scrollEnabled={false}>
            <Text style={styles.vicarText}>{label}</Text>
            <TextInput
              style={[styles.vicarTextInput, colorStyle]}
              ref={ref}
              // onSubmit={Keyboard.dismiss}
              // name={name}
              autoCapitalize="none"
              {...props}
            />
          </ScrollView>
        </View>
        {/* {error && (
        <ErrorMessageContainer>
          <ErrorMessageText>{errorMsg}</ErrorMessageText>
        </ErrorMessageContainer>
      )} */}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    padding: 8,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: 1,
    width: 300,
    alignSelf: "center",
    elevation: 2
  },
  vicarText: {
    color: "#949393",
    fontSize: 11,
    width: 300,
  },
  vicarTextInput: {
    fontSize: 18,
    width: "auto",
  },
});

export { FormField };
