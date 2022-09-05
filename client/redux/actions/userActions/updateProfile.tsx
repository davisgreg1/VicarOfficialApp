import axios from "../../../utils/axios";

interface EditProfileData {
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  password?: string;
  userId?: any;
}

export const updateProfile = (data: EditProfileData) => {
  const { email, firstName, lastName, phoneNumber } = data;

  return (
    dispatch: (arg0: {
      type: string;
      userFirstName: any;
      userLastName: any;
      userEmail: any;
      userPhoneNumber: any;
      vehicles: never[];
      userId: any;
    }) => void,
  ) => {
    const request = axios.patch("/users/editProfile", {
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
    });
    request
      .then((res) => {
        const { data } = res;
        const user = data?.updatedUser;
        dispatch({
          type: "user/setUser",
          userId: user.id,
          userFirstName: user.firstName,
          userLastName: user.lastName,
          userEmail: user.email,
          userPhoneNumber: user.phoneNumber,
          vehicles: [],
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
