import axios from "../../../utils/axios";

export const deleteAccount = () => {
  return (dispatch) => {
    const request = axios.post("/auth/deleteAccount");
    request
      .then((request) => {
        const { data } = request;
        dispatch({
          type: "user/clearUserData",
        });
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
      })
      .catch((err) => {
        console.error("userSignIn fn() catch block in the network call:", err);
      });
  };
};
