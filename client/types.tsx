/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  Drawer: undefined;
  NotFound: undefined;
  WelcomeScreen: undefined;
  SignUpScreen: undefined;
  AddVehicleScreen: undefined;
  ParkCarScreen: undefined;
  FetchCarScreen: undefined;
  VicarAnimationScreen: undefined;
  ProfileScreen: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  HomeScreen: undefined;
  AccountScreen: undefined;
  ProfileScreen: undefined;
  WelcomeScreen: undefined;
  SignUpScreen: undefined;
  AddVehicleScreen: undefined;
  ParkCarScreen: undefined;
  FetchCarScreen: undefined;
  VicarAnimationScreen: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
export type VehicleType = {
  id?: number;
  year: number;
  make: string;
  model: string;
  type: string;
  nickName?: string;
  color: string;
  licenseNumber: string;
  isCarParked: boolean;
};
export type AuthState = {
  userAuthenticated: boolean;
};
export type UserState = {
  vehicles: Array<any>;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPhoneNumber: string;
  userName: string;
};
export type ServiceState = {
  vehicle: VehicleType;
  date: Date | any;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  returnToOwnerDate: Date | any;
  returnToOwnerAddress: string;
  returnToOwnerCity: string;
  returnToOwnerState: string;
  returnToOwnerZipCode: string;
  returnToOwnerVehicle: VehicleType;
};
export type RootState = {
  auth: AuthState;
  user: UserState;
  service: ServiceState;
};
