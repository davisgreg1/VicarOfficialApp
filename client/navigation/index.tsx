/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ColorSchemeName, Pressable, Image, View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "../utils/axios";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/HomeScreen";
import AccountScreen from "../screens/AccountScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import AddVehicleScreen from "../screens/AddVehicleScreen";
import ParkCarScreen from "../screens/ParkCarScreen";
import FetchCarScreen from "../screens/FetchCarScreen";
import VicarAnimationScreen from "../screens/VicarAnimationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
  VehicleType,
  RootState,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { refreshUser } from "../../client/redux/actions/authActions/refreshUser";
import { logoutUser } from "../redux/actions/authActions/logoutUser";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const dispatch = useDispatch();
  const userAuthenticated: boolean = useSelector(
    (state: RootState) => state.auth.userAuthenticated,
  );
  const vehicles: Array<VehicleType> = useSelector(
    (state: RootState) => state.user.vehicles,
  );
  const hasVehicles = vehicles.length > 0;

  async function getValueFor(key: any) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    } else {
      return "";
    }
  }

  const checkJWT = async () => {
    try {
      const accessToken = await getValueFor("accessToken");

      const response = await axios({
        method: "get",
        url: "/users/test",
        headers: {
          "x-access-token": accessToken,
        },
      });
      console.log('GREG LOOK!  ~ file: index.tsx ~ line 97 ~ checkJWT ~ response', response);
      const { data } = response;
      console.log('GREG LOOK!  ~ file: index.tsx ~ line 97 ~ checkJWT ~ data', data);
      dispatch(refreshUser(data));
    } catch (error: any) {
      const {
        data: { message },
        status,
      } = error.response;

      dispatch(logoutUser());

      switch (status) {
        case 403:
          return dispatch({
            type: "auth/loginError",
            message: "",
          });
        default:
          return dispatch({
            type: "auth/loginError",
            message: message,
          });
      }
    }
  };

  React.useEffect(() => {
    checkJWT();
  }, []);

  return (
    <>
      {!userAuthenticated ? (
        <Stack.Navigator>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{
              headerShown: true,
              headerTitle: (props) => (
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("../assets/images/vicarLogo1.png")}
                  resizeMode="contain"
                />
              ),
            }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{
              headerShown: true,
              headerTitle: (props) => (
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("../assets/images/vicarLogo1.png")}
                  resizeMode="contain"
                />
              ),
            }}
          />
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
        </Stack.Navigator>
      ) : !hasVehicles ? (
        <Stack.Navigator>
          <Stack.Screen
            name="AddVehicleScreen"
            component={AddVehicleScreen}
            options={{
              title: "",
              headerTitle: (props) => (
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("../assets/images/vicarLogo1.png")}
                  resizeMode="contain"
                />
              ),
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
              options={{
                title: "Settings",
                headerTitle: (props) => (
                  <Image
                    style={{ width: 60, height: 60 }}
                    source={require("../assets/images/vicarLogo1.png")}
                    resizeMode="contain"
                  />
                ),
              }}
              name="Modal"
              component={ModalScreen}
            />
          </Stack.Group>
          <Stack.Screen
            name="ParkCarScreen"
            component={ParkCarScreen}
            options={{
              title: "",
              headerTitle: (props) => (
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("../assets/images/vicarLogo1.png")}
                  resizeMode="contain"
                />
              ),
            }}
          />
          <Stack.Screen
            name="FetchCarScreen"
            component={FetchCarScreen}
            options={{
              title: "",
              headerTitle: (props) => (
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("../assets/images/vicarLogo1.png")}
                  resizeMode="contain"
                />
              ),
            }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              title: "",
              headerTitle: (props) => (
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("../assets/images/vicarLogo1.png")}
                  resizeMode="contain"
                />
              ),
            }}
          />
          <Stack.Screen
            name="VicarAnimationScreen"
            component={VicarAnimationScreen}
            options={{
              title: "",
              headerTitle: (props) => (
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("../assets/images/vicarLogo1.png")}
                  resizeMode="contain"
                />
              ),
            }}
          />
          <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{
              title: "Oops!",
              headerTitle: (props) => (
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("../assets/images/vicarLogo1.png")}
                  resizeMode="contain"
                />
              ),
            }}
          />
        </Stack.Navigator>
      )}
    </>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();
// const BottomTab = createMaterialBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"HomeScreen">) => ({
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "black", },
          tabBarColor: "transparent",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "md-home-sharp" : "home-outline"} color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarColor: "transparent",

          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "md-person-sharp" : "person-outline"} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
