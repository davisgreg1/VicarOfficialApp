import axios from "../../../utils/axios";

// import { generateErrorMsg } from "../utils";

export const createAccount = (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const { firstName, lastName, email, password } = data;
  return (
    dispatch: (arg0: {
      type: string;
      userAuthenticated?: boolean;
      userFirstName?: string;
      userLastName?: string;
      userEmail?: string;
      userId?: number;
      userPhoneNumber?: any;
      zipCode?: any;
      vehicles?: never[];
      accountCreated?: boolean;
    }) => void,
  ) => {
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
          userId: data.user.id,
          userPhoneNumber: data.user.phoneNumber,
          zipCode: data.user.zipCode,
          vehicles: [],
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
