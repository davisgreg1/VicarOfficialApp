import axios from "../../../utils/axios";


interface RefreshUserType {
  user: any;
  userAuthenticated: boolean;
}

export const refreshUser = (data: RefreshUserType) => {
  const { user, userAuthenticated } = data;
  const vehicles = user.slice(1);
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
