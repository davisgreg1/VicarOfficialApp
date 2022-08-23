import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { Linking, Modal, StyleSheet, Pressable, Platform } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps, RootState } from "../types";
import { logoutUser } from "../redux/actions/authActions/logoutUser";
import dayjs from "dayjs";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"ProfileScreen">) {
  const dispatch = useDispatch();
  const userFirstName = useSelector(
    (state: RootState) => state.user.userFirstName,
  );

  //   const handleLogOut = () => {
  //     dispatch(logoutUser());
  //     setModalVisible(!modalVisible);
  //   };

  return (
    <View style={styles.container}>
      <Text>PROFILE HERE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 16,
  },
  viewProfileText: {
    color: "#63666A",
    paddingTop: 8,
  },
  greeting: { fontSize: 24 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "100%",
  },
  profileSubSection: {},
  profileSubSectionTitle: {
    fontSize: 20,
  },
  contactOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
  },
  contactOption: {
    padding: 36,
    borderRadius: 12,
    borderStartColor: "red",
    // elevation: 2,
  },
  // BUTTON CALL/TEXT
  optionButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 12,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
