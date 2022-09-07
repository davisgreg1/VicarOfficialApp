import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { Linking, Modal, StyleSheet, Pressable, Platform } from "react-native";
import { Button } from "react-native-paper";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps, RootState } from "../types";
import { logoutUser } from "../redux/actions/authActions/logoutUser";
import dayjs from "dayjs";

export default function AccountScreen({
  navigation,
}: RootTabScreenProps<"AccountScreen">) {
  const dispatch = useDispatch();
  const userFirstName = useSelector(
    (state: RootState) => state.user.userFirstName,
  );
  const [modalVisible, setModalVisible] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          accessibilityLabel="Settings Button"
          onPress={() => setModalVisible(true)}
          style={({ pressed }) => ({
            paddingRight: 16,
            opacity: pressed ? 0.5 : 1,
          })}>
          <FontAwesome
            name="ellipsis-v"
            size={25}
            color={"#c64141"}
            style={{ marginRight: 15 }}
          />
        </Pressable>
      ),
    });
  }, [navigation]);

  const handleLogOut = () => {
    dispatch(logoutUser());
    setModalVisible(!modalVisible);
  };

  const handleOnClose = () => {
    setModalVisible(!modalVisible);
  };

  const renderGreeting = () => {
    const currentHour = dayjs().hour();
    const morning = currentHour < 12;
    const afterNoon = currentHour >= 12 && currentHour <= 15;
    const evening = currentHour > 15 && currentHour < 18;
    const night = currentHour >= 18 && currentHour < 24;

    if (morning) {
      return `Good morning, ${userFirstName}`;
    }
    if (afterNoon) {
      return `Good afternoon, ${userFirstName}`;
    }
    if (evening) {
      return `Good evening, ${userFirstName}`;
    }
    if (night) {
      return `Good night, ${userFirstName}`;
    }
  };

  const onPressMobileNumberClick = (number: string, isTel: boolean) => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      isTel ? (phoneNumber = `tel:${number}`) : (phoneNumber = `sms:${number}`);
    } else {
      isTel
        ? (phoneNumber = `telprompt:${number}`)
        : (phoneNumber = `sms:${number}`);
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{renderGreeting()}</Text>
      <Pressable onPress={() => navigation.navigate("ProfileScreen")}>
        <Text style={styles.viewProfileText}>View Profile</Text>
      </Pressable>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.profileSubSection}>
        <Text style={styles.profileSubSectionTitle}>Contact Us</Text>
        <View style={styles.contactOptionsContainer}>
          <Button
            onPress={() => onPressMobileNumberClick("9172319139", false)}
            mode="elevated"
            textColor="#eee"
            style={styles.optionButton}
            accessibilityLabel="Text us Button"
            icon="cellphone-message">
            Text Us
          </Button>
          <Button
            onPress={() => onPressMobileNumberClick("9172319139", true)}
            mode="elevated"
            textColor="#eee"
            style={styles.optionButton}
            accessibilityLabel="Call us Button"
            icon="cellphone-wireless">
            Call Us
          </Button>
        </View>
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={handleOnClose}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello, {userFirstName}!</Text>
              <Pressable
                accessibilityLabel="Sign Out Button"
                style={[styles.button, styles.buttonClose]}
                onPress={handleLogOut}>
                <Text style={styles.textStyle}>Sign Out</Text>
              </Pressable>
              <Pressable
                accessibilityLabel="Cancel Sign Out"
                style={[styles.button, styles.buttonClose]}
                onPress={handleOnClose}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
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
    borderRadius: 4,
    backgroundColor: "black",
    width: 150,
    height: 60,
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
