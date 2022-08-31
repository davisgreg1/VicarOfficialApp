import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text, View } from "../components/Themed";
import EditProfileSection from "../components/EditProfileSection";
import { RootTabScreenProps, RootState } from "../types";
import { deleteAccount } from "../redux/actions/authActions/deleteAccount";
import { SafeAreaView } from "react-native-safe-area-context";
import {Spacer} from "@react-native-material/core";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"ProfileScreen">) {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const userFirstName = useSelector(
    (state: RootState) => state.user.userFirstName,
  );
  const userLastName = useSelector(
    (state: RootState) => state.user.userLastName,
  );
  const userEmail = useSelector((state: RootState) => state.user.userEmail);
  const userPhoneNumber = useSelector(
    (state: RootState) => state.user.userPhoneNumber,
  );
  const userName = useSelector((state: RootState) => state.user.userName);

  const handleOnClose = () => setModalVisible(!modalVisible);

  const myProfileData = {
    userFirstName: userFirstName,
    userLastName: userLastName,
    userPhoneNumber: userPhoneNumber,
    userName: userName,
    userEmail: userEmail,
  };

  const myProfileLoginData = {
    userEmail: userEmail,
  };

  const handleOnDeleteAccount = () => dispatch(deleteAccount());

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.container}>
      <Spacer style={{ margin: 16 }} />

        <EditProfileSection
          heading="My Profile"
          data={myProfileData}
          type="personal">
          <Text style={styles.profileSectionText}>
            {myProfileData.userFirstName} {myProfileData.userLastName}
          </Text>
          <Text style={styles.profileSectionText}>
            {myProfileData.userPhoneNumber}
          </Text>
        </EditProfileSection>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <EditProfileSection
          heading="Login & Password"
          data={myProfileLoginData}
          type="auth">
          <Text style={styles.profileSectionText}>
            {myProfileData.userEmail}{" "}
          </Text>
        </EditProfileSection>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={false}
            visible={modalVisible}
            onRequestClose={handleOnClose}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello, {userFirstName}!</Text>
                <Pressable
                  accessibilityLabel="Delete Account"
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleOnDeleteAccount}>
                  <Text style={styles.textStyle}>
                    Are you sure you want to delete your account?
                  </Text>
                </Pressable>
                <Pressable
                  accessibilityLabel="Cancel Delete Account"
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleOnClose}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <Pressable style={styles.deleteAccountBtn} onPress={handleOnClose}>
          <Text style={styles.headingText}>Delete Account</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: 16,
    height: Dimensions.get("window").height - StatusBar?.currentHeight,
    backgroundColor: "white",
  },
  headingText: {
    fontWeight: "600",
    color: "#c64141",
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
  profileSectionText: {
    color: "#63666A",
    paddingBottom: 8,
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
  deleteAccountBtn: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
    alignSelf: "center",
  },
});
