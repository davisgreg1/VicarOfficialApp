const initialState = {
  userAuthenticated: false,
  message: "",
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "auth/login":
      return {
        ...state,
        userAuthenticated: action.userAuthenticated,
      };
    case "auth/logout":
      return {
        ...state,
        userAuthenticated: action.userAuthenticated,
      };
    case "auth/userAuthenticated":
      return {
        ...state,
        userAuthenticated: action.userAuthenticated,
      };
    case "auth/createNewAccount":
      return {
        ...state,
        userAuthenticated: action.userAuthenticated,
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
