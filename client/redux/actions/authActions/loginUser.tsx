import axios from "../../../utils/axios";
import * as SecureStore from "expo-secure-store";

interface LoginDataType {
  id: number;
  password: string;
  email: string;
}

const save = async (key: any, value: any) => {
  await SecureStore.setItemAsync(key, value);
};
export const loginUser = (data: LoginDataType) => {
  const { email, password } = data;
  return async (
    dispatch: (arg0: {
      type: string;
      userAuthenticated?: any;
      userId?: any;
      userEmail?: any;
      userFirstName?: any;
      userLastName?: any;
      userPhoneNumber?: any;
      vehicles?: any;
      message?: string;
      userZipCode?: string;
    }) => void,
  ) => {
    try {
      const request = await axios.post("/auth/login", {
        email: email,
        password: password,
      });

      const { data, status } = request;
      const accessToken = data.accessToken;
      const userAuthenticated = data?.userAuthenticated;
      const user = data?.user;
      const vehicles = user.slice(1);
      save("accessToken", accessToken);
      dispatch({
        type: "auth/login",
        userAuthenticated: userAuthenticated,
      });
      dispatch({
        type: "auth/clearLoginError",
      });
      dispatch({
        type: "user/setUser",
        userId: user[0].id,
        userEmail: user[0].email,
        userFirstName: user[0].firstName,
        userLastName: user[0].lastName,
        userPhoneNumber: user[0].phoneNumber,
        userZipCode: user[0].zipCode,
        vehicles: vehicles,
      });
    } catch (error: any) {
      const data = error.response.data;
      dispatch({
        type: "auth/loginError",
        message: data.message,
      });
    }
  };
};
