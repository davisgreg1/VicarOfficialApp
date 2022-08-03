import  axios  from "../../../utils/axios";
// import { generateErrorMsg } from "../utils";

export const setEmailNamePW = (data) => {
  const { userFirstName, userLastName, userEmail, userPassword } = data;
  return (dispatch) => {
    const request = axios.post("/auth/signup", {
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail,
      password: userPassword,
    });
    request
      .then((res) => {
        const { data, status } = res;
        console.log('GREG LOOK!  ~ file: createAccount.js ~ line 16 ~ .then ~ data', data);
        dispatch({
          type: "user/createNewAccount",
          accountCreated: status === 200,
          userFirstName: data?.user?.firstName,
          userLastName: data?.user?.lastName,
        //   userEmail: data?.user?.email,
          id: data?.user?.id,
          message: data.message,
        });
      })
      .catch((err) => {
        const errorCode = err.response.status;
        dispatch({
          type: "user/createNewAccount_error",
        //   message: generateErrorMsg(errorCode),
          accountCreated: false,
        });
      });
  };
};
