const initialState = {
  vehicle: null,
  date: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  returnToOwnerDate: "",
  returnToOwnerAddress: "",
  returnToOwnerCity: "",
  returnToOwnerState: "",
  returnToOwnerZipCode: "",
  returnToOwnerVehicle: null,
};

const serviceReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "service/setPickUpVehicle":
      return {
        ...state,
        vehicle: action.vehicle,
      };
    case "service/setReturnVehicle":
      return {
        ...state,
        returnToOwnerVehicle: action.returnToOwnerVehicle,
      };

    case "service/setPickUpDate":
      return {
        ...state,
        date: action.date,
      };
    case "service/setReturnDate":
      return {
        ...state,
        returnToOwnerDate: action.returnToOwnerDate,
      };

    case "service/setPickUpAddress":
      return {
        ...state,
        address: action.address,
        city: action.city,
        state: action.state,
        zipCode: action.zipCode,
      };
    case "service/setReturnAddress":
      return {
        ...state,
        returnToOwnerAddress: action.returnToOwnerAddress,
        returnToOwnerCity: action.returnToOwnerCity,
        returnToOwnerState: action.returnToOwnerState,
        returnToOwnerZipCode: action.returnToOwnerZipCode,
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
    case "service/createReturnJob":
      return {
        ...state,
        returnToOwnerVehicle: null,
        returnToOwnerDate: "",
        returnToOwnerAddress: "",
        returnToOwnerCity: "",
        returnToOwnerState: "",
        returnToOwnerZipCode: "",
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
    case "service/clearReturnServiceData":
      return {
        returnToOwnerDate: "",
        returnToOwnerAddress: "",
        returnToOwnerCity: "",
        returnToOwnerState: "",
        returnToOwnerZipCode: "",
        returnToOwnerVehicle: null,
      };

    default:
      return state;
  }
};

export default serviceReducer;
