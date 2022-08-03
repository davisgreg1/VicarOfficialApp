const initialState = {
  userId: null,
  userAuthenticated: false,
  userEmail: "",
  userFirstName: "",
  userLastName: "",
  userName: "",
  userPhoneNumber: "",
  userZipCode: "",
  message: "",
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "auth/login":
      return {
        ...state,
        userId: action.userId,
        userAuthenticated: action.userAuthenticated,
        userEmail: action.userEmail,
        userFirstName: action.userFirstName,
        userLastName: action.userLastName,
        // userPhoneNumber: action.userPhoneNumber,
        // userName: action.userName,
        // userZipCode: action.zipCode,
      };
    case "auth/userAuthenticated":
      return {
        ...state,
        userId: action.userId,
        userAuthenticated: action.userAuthenticated,
        userEmail: action.userEmail,
        userFirstName: action.userFirstName,
        userLastName: action.userLastName,
        userPhoneNumber: action.userPhoneNumber,
        userName: action.userName,
        userZipCode: action.zipCode,
      };
    case "auth/createNewAccount":
      return {
        ...state,
        userId: action.id,
        accountCreated: action.accountCreated,
        userFirstName: action.userFirstName,
        userLastName: action.userLastName,
        userEmail: action.userEmail,
        userAuthenticated: action.userAuthenticated
      };
    case "auth/createNewAccount_error":
      return {
        ...state,
        accountCreated: action.accountCreated,
        message: action.message,
      };
    // case "auth/updatePW":
    //   return {
    //     ...state,
    //     pwUpdatedMsg: action.pwUpdatedMsg,
    //   };
    default:
      return state;
  }
};

export default authReducer;
