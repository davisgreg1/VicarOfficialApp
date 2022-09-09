import axios from "../../../utils/axios";
import * as SecureStore from "expo-secure-store";

export const logoutUser = () => {
  return async (
    dispatch: (arg0: { type: string; userAuthenticated?: any }) => void,
  ) => {
    const request = await axios.post("/auth/logout");
    try {
      const { data } = request;
      dispatch({
        type: "user/clearUserData",
      });
      dispatch({
        type: "auth/logout",
        userAuthenticated: data.userAuthenticated,
      });
      dispatch({
        type: "service/clearServiceData",
      });
      dispatch({
        type: "service/clearReturnServiceData",
      });
      await SecureStore.deleteItemAsync("accessToken");
    } catch (error: any) {
      console.error(
        "userSignIn fn() catch block in the network call:",
        error.response.data,
      );
    }
  };
};
