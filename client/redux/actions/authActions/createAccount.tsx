import axios from "../../../utils/axios";
// import { generateErrorMsg } from "../utils";

export const createAccount = (data) => {
  const { firstName, lastName, email, password } = data;
  return (dispatch) => {
    try {
      const request = axios.post("/auth/signup", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      request.then((res) => {
        const { data } = res;
        const userAuthenticated = data?.userAuthenticated;
        dispatch({
          type: "auth/createNewAccount",
          userAuthenticated: userAuthenticated,
        });
        dispatch({
          type: "user/setUser",
          userFirstName: data.user.firstName,
          userLastName: data.user.lastName,
          userEmail: data.user.email,
          id: data.user.id,
          userPhoneNumber: data.user.phoneNumber,
          zipCode: data.user.zipCode,
          vehicles: []
        });
      });
    } catch (error) {
      // const errorCode = err.response.status;
      dispatch({
        type: "auth/createNewAccount_error",
        //   message: generateErrorMsg(errorCode),
        accountCreated: false,
      });
    }
  };
};
