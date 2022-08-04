import axios from "../../../utils/axios";

export const addVehicle = (data) => {
  const { year, make, model, type, color, nickName } = data;

  return (dispatch) => {
    const request = axios.post("/users/addVehicle", {
      year: year,
      make: make,
      model: model,
      type: type,
      color: color,
      nickName: nickName,
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
