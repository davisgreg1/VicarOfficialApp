import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from "dayjs";
import { setPickUpDate, setReturnDate } from "../redux/actions/serviceActions";

type Props = {
  buttonTitle: string;
  typeOfSchedule?: string;
  selectedDate?: string;
};

const DateTimePicker = (props: Props) => {
  const dispatch = useDispatch();
  const { buttonTitle, typeOfSchedule, selectedDate } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateValue, setDateValue] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date | any) => {
    const parsedDate = dayjs(date).format("MMM DD, YYYY hh:mm A");
    setDateValue(parsedDate);
    typeOfSchedule === "return"
      ? dispatch(setReturnDate(date))
      : dispatch(setPickUpDate(date))
    hideDatePicker();
  };

  return (
    <View style={{ margin: 16 }}>
      {selectedDate ? (
        <Text>
          Your vehicle will be scheduled to be{" "}
          {typeOfSchedule === "pick up" ? "picked up" : "dropped off"} on:{" "}
          {selectedDate}
        </Text>
      ) : !dateValue ? (
        <Button title={buttonTitle} onPress={showDatePicker} />
      ) : (
        <Text></Text>
      )}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {dateValue && selectedDate ? (
        <Text></Text>
      ) : dateValue ? (
        <Text>
          Your vehicle will be{" "}
          {typeOfSchedule === "pick up" ? "picked up" : "dropped off"} on:{" "}
          {dateValue}
        </Text>
      ) : (
        <Text></Text>
      )}
      {dateValue || selectedDate ? (
        <Button title={"Change it"} onPress={showDatePicker} />
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

export default DateTimePicker;
