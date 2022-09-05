import axios from "../../../utils/axios";

interface EditPWData {
  password?: string;
  userId?: any;
}

export const updatePassword = (data: EditPWData) => {
  const { password, userId } = data;
  return (dispatch: (arg0: { type: string; message: string }) => void) => {
    const request = axios.patch(`/auth/updatePW/${userId}`, {
      password: password,
    });
    request
      .then((res) => {
        const { data } = res;
        const message = data?.message;
        dispatch({
          type: "auth/updatePW",
          message: message,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
