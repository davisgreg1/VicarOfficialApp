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
          HomeScreen: {
            screens: {
              HomeScreen: "HomeScreen",
            },
          },
          ProfileScreen: {
            screens: {
              ProfileScreen: "ProfileScreen",
            },
          },
          ParkCarScreen: {
            screens: {
              ParkCarScreen: "ParkCarScreen",
            },
          },
          FetchCarScreen: {
            screens: {
              FetchCarScreen: "FetchCarScreen",
            },
          },
          VicarAnimationScreen: {
            screens: {
              VicarAnimationScreen: "VicarAnimationScreen",
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
