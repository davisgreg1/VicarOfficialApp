/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          SignUpScreen: {
            screens: {
              SignUpScreen: "SignUpScreen",
            },
          },
          WelcomeScreen: {
            screens: {
              WelcomeScreen: "Welcome",
            },
          },
          AddVehicleScreen: {
            screens: {
              AddVehicleScreen: "AddVehicleScreen",
            },
          },
          TabOne: {
            screens: {
              TabOneScreen: "one",
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: "two",
            },
          },
        },
      },
      Modal: "modal",
      NotFound: "*",
    },
  },
};

export default linking;
