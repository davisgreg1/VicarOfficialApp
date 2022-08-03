import axios from "../../../utils/axios";
// import { generateErrorMsg } from "../utils";

export const createAccount = (data) => {
  const { firstName, lastName, email, password } = data;
  return (dispatch) => {
    const request = axios.post("/auth/signup", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    request
      .then((res) => {
        const { data, status } = res;
        const userAuthenticated = data?.userAuthenticated;
        const user = data?.user;
        dispatch({
          type: "auth/createNewAccount",
          accountCreated: status === 200,
          userFirstName: user?.firstName,
          userLastName: user?.lastName,
          userEmail: user?.email,
          id: user?.id,
          userAuthenticated: userAuthenticated,
        });
      })
      .catch((err) => {
        const errorCode = err.response.status;
        dispatch({
          type: "auth/createNewAccount_error",
          //   message: generateErrorMsg(errorCode),
          accountCreated: false,
        });
      });
  };
};
