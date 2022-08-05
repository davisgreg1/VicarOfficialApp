import axios from "../../../utils/axios";

interface AddVehicleData {
  year: number;
  make: string;
  model: string;
  type: string;
  color: string;
  nickName?: string;
  isCarParked: boolean;
}

export const addVehicle = (data: AddVehicleData) => {
  const { year, make, model, type, color, nickName, isCarParked } = data;

  return (dispatch) => {
    const request = axios.post("/users/addVehicle", {
      year: year,
      make: make,
      model: model,
      type: type,
      color: color,
      nickName: nickName,
      isCarParked: isCarParked,
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
