const initialState = {
  vehicle: null,
  date: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
};

const serviceReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "service/setPickUpVehicle":
      return {
        ...state,
        vehicle: action.vehicle,
      };
    case "service/setPickUpDate":
      return {
        ...state,
        date: action.date,
      };
    case "service/setPickUpAddress":
      return {
        ...state,
        address: action.address,
        city: action.city,
        state: action.state,
        zipCode: action.zipCode,
      };
    case "service/createPickUpJob":
      return {
        ...state,
        vehicle: null,
        date: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
      };
    case "service/clearServiceData":
      return {
        vehicle: null,
        date: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
      };

    default:
      return state;
  }
};

export default serviceReducer;
