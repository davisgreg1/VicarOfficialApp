import axios from "../../../utils/axios";

interface AddVehicleData {
  licenseNumber: string;
  year: number;
  make: string;
  model: string;
  type: string;
  color: string;
  nickName?: string;
  isCarParked?: boolean;
}
interface AddressType {
  address: string;
  state: number;
  city: string;
  zipCode: string;
}

interface PickUpData {
  pickUpTime: Date | any;
  pickUpDate: Date | any;
  pickUpAddress1: string;
  pickUpCity: string;
  pickUpState: string;
  pickUpZipCode: string;
  vehicleId: number;
}

export const setPickUpVehicle = (data: AddVehicleData) => {
  const {
    year,
    make,
    model,
    type,
    color,
    nickName,
    isCarParked,
    licenseNumber,
  } = data;

  return (dispatch) => {
    try {
      dispatch({
        type: "service/setPickUpVehicle",
        vehicle: data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const setPickUpAddress = (data: AddressType) => {
  const { address, state, city, zipCode } = data;
  return (dispatch) => {
    try {
      dispatch({
        type: "service/setPickUpAddress",
        address: address,
        city: city,
        state: state,
        zipCode: zipCode,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const setPickUpDate = (date: Date) => {
  return (dispatch) => {
    try {
      dispatch({
        type: "service/setPickUpDate",
        date: date,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const createPickUpJob = (data: PickUpData) => {
  const {
    pickUpTime,
    pickUpDate,
    pickUpAddress1,
    pickUpCity,
    pickUpState,
    pickUpZipCode,
    vehicleId,
  } = data;

  return (dispatch) => {
    const request = axios.post("/users/createJob/parkVehicle", {
      pickUpTime: pickUpTime,
      pickUpDate: pickUpDate,
      pickUpAddress1: pickUpAddress1,
      pickUpCity: pickUpCity,
      pickUpState: pickUpState,
      pickUpZipCode: pickUpZipCode,
      vehicleId: vehicleId,
    });

    request
      .then((res) => {
        const { data } = res;
        console.log(
          "GREG LOOK!  ~ file: index.tsx ~ line 109 ~ .then ~ data",
          data,
        );
        // const vehicles = data?.vehicles;
        dispatch({
          type: "service/createPickUpJob",
          // vehicles: vehicles,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
