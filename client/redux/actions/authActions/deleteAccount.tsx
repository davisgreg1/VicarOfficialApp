import axios from "../../../utils/axios";
import * as SecureStore from "expo-secure-store";

export const deleteAccount = () => {
  return async (
    dispatch: (arg0: {
      type: string;
      userAuthenticated?: any;
      message?: any;
    }) => void,
  ) => {
    try {
      const request = await axios.post("/auth/deleteAccount");

      const { data } = request;
      dispatch({
        type: "auth/deleteAccount",
        userAuthenticated: data.userAuthenticated,
        message: data.message,
      });
      dispatch({
        type: "service/clearServiceData",
      });
      dispatch({
        type: "service/clearReturnServiceData",
      });
      dispatch({
        type: "user/clearUserData",
      });
      // remove jwt token from secure store
      await SecureStore.deleteItemAsync("accessToken");
    } catch (error: any) {
      console.error(
        "userSignIn fn() catch block in the network call:",
        error.response.data,
      );
    }
  };
};
