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
  state: string;
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
  returnToOwnerVehicleId: number;
  returnToOwnerDate: Date | any;
  returnToOwnerAddress: string;
  returnToOwnerCity: string;
  returnToOwnerState: string;
  returnToOwnerZipCode: string;

  dropOffTime: Date | any;
  dropOffDate: Date | any;
  dropOffAddress1: string;
  dropOffCity: string;
  dropOffState: string;
  dropOffZipCode: string;
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

  return (
    dispatch: (arg0: { type: string; vehicle: AddVehicleData }) => void,
  ) => {
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
export const setReturnVehicle = (data: AddVehicleData) => {
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
        type: "service/setReturnVehicle",
        returnToOwnerVehicle: data,
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
export const setReturnAddress = (data: AddressType) => {
  const { address, state, city, zipCode } = data;
  return (dispatch) => {
    try {
      dispatch({
        type: "service/setReturnAddress",
        returnToOwnerAddress: address,
        returnToOwnerCity: city,
        returnToOwnerState: state,
        returnToOwnerZipCode: zipCode,
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
export const setReturnDate = (date: Date) => {
  return (dispatch) => {
    try {
      dispatch({
        type: "service/setReturnDate",
        returnToOwnerDate: date,
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

  return async (dispatch) => {
    const request = await axios.post("/users/createJob/parkVehicle", {
      pickUpTime: pickUpTime,
      pickUpDate: pickUpDate,
      pickUpAddress1: pickUpAddress1,
      pickUpCity: pickUpCity,
      pickUpState: pickUpState,
      pickUpZipCode: pickUpZipCode,
      vehicleId: vehicleId,
    });

    try {
      const { data } = request;
      dispatch({
        type: "service/createPickUpJob",
        // vehicles: vehicles,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const createReturnJob = (data: PickUpData) => {
  const {
    dropOffTime,
    dropOffDate,
    dropOffAddress1,
    dropOffCity,
    dropOffState,
    dropOffZipCode,
    vehicleId,
  } = data;

  return async (dispatch) => {
    const request = await axios.patch(
      `/users/createJob/fetchVehicle/${vehicleId}`,
      {
        dropOffTime: dropOffTime,
        dropOffDate: dropOffDate,
        dropOffAddress1: dropOffAddress1,
        dropOffCity: dropOffCity,
        dropOffState: dropOffState,
        dropOffZipCode: dropOffZipCode,
      },
    );

    try {
      const { data } = request;
      dispatch({
        type: "service/createReturnJob",
        // vehicles: vehicles,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const refreshVehicles = () => {
  return async (dispatch) => {
    const request = await axios.get("/users/getAllVehicles");
    try {
      const { data } = request;
      const vehicles = data?.vehicles;
      dispatch({
        type: "user/updateVehicle",
        vehicles: vehicles,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
