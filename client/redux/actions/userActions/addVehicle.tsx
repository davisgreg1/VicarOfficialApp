import axios from "../../../utils/axios";

interface AddVehicleData {
  licenseNumber: string;
  year: number;
  make: string;
  model: string;
  type: string;
  color: string;
  nickName?: string;
  isCarParked: boolean;
}

export const addVehicle = (data: AddVehicleData) => {
  const { year, make, model, type, color, nickName, isCarParked, licenseNumber } = data;

  return (dispatch: (arg0: {type: string; vehicles: any;}) => void) => {
    const request = axios.post("/users/addVehicle", {
      year: year,
      make: make,
      model: model,
      type: type,
      color: color,
      nickName: nickName,
      isCarParked: isCarParked,
      licenseNumber: licenseNumber,
    });
    request
      .then((res) => {
        const { data } = res;
        const vehicles = data?.vehicles;
        dispatch({
          type: "user/addVehicle",
          vehicles: vehicles,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
