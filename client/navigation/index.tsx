/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useSelector } from "react-redux";
import { ColorSchemeName, Pressable, Image, View, Text } from "react-native";
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
  const userAuthenticated: boolean = useSelector(
    (state: RootState) => state.auth.userAuthenticated,
  );
  const vehicles: Array<VehicleType> = useSelector(
    (state: RootState) => state.user.vehicles,
  );
  const hasVehicles = vehicles.length > 0;
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
          {/* <Stack.Screen
            name="Drawer"
            component={MyDrawer}
            options={{ headerShown: true }}
          /> */}
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

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      {/* <Stack.Screen
        name="Drawer"
        component={MyDrawer}
        options={{ headerShown: true }}
      /> */}
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"HomeScreen">) => ({
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#c64141" },
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={"#c64141"} />
          ),
          // headerRight: () => (
          //   <Pressable
          //     onPress={() => navigation.navigate("Modal")}
          //     style={({ pressed }) => ({
          //       opacity: pressed ? 0.5 : 1,
          //     })}>
          //     <FontAwesome
          //       name="cogs"
          //       size={25}
          //       color={Colors[colorScheme].text}
          //       style={{ marginRight: 15 }}
          //     />
          //   </Pressable>
          // ),
          headerTitle: (props) => (
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../assets/images/vicarLogo1.png")}
              resizeMode="contain"
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarLabelStyle: { color: "#c64141" },
          title: "",
          headerTitle: (props) => (
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../assets/images/vicarLogo1.png")}
              resizeMode="contain"
            />
          ),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user" color={"#c64141"} />
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
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
