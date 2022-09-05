import axios from "../../../utils/axios";

export const logoutUser = () => {
  return (dispatch: (arg0: {type: string; userAuthenticated?: any;}) => void) => {
    const request = axios.post("/auth/logout");
    request
      .then((request) => {
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
      })
      .catch((err) => {
        console.error("userSignIn fn() catch block in the network call:", err);
      });
  };
};
