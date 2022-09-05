import axios from "../../../utils/axios";

export const deleteAccount = () => {
  return (dispatch: (arg0: {type: string; userAuthenticated?: any; message?: any;}) => void) => {
    const request = axios.post("/auth/deleteAccount");
    request
      .then((request) => {
        const { data } = request;
        dispatch({
          type: "auth/deleteAccount",
          userAuthenticated: data.userAuthenticated,
          message: data.message
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
      })
      .catch((err) => {
        console.error("userSignIn fn() catch block in the network call:", err);
      });
  };
};
