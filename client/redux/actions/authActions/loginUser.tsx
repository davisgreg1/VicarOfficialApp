import axios from "../../../utils/axios";

interface LoginDataType {
  id: number;
  password: string;
}
export const loginUser = (data: LoginDataType) => {
  const { email, password } = data;
  return (dispatch) => {
    const request = axios.post("/auth/login", {
      email: email,
      password: password,
    });
    request
      .then((res) => {
        const { data, status } = res;

        const userAuthenticated = data?.userAuthenticated;
        const user = data?.user;
        dispatch({
          type: "auth/login",
          userEmail: user.email,
          userId: user.id,
          userFirstName: user.firstName,
          userLastName: user.lastName,
          userAuthenticated: userAuthenticated,
          // userEmail: data.email,
          // userName: data.userName,
          // userPhoneNumber: data.phoneNumber,
          // userZipCode: data.zipCode,
        });
      })
      .catch((err) => {
        console.error("userSignIn fn() catch block in the network call:", err);
      });
  };
};
