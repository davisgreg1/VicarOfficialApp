const initialState = {
  userId: null,
  userFirstName: "",
  userLastName: "",
  userEmail: "",
  userName: "",
  userPhoneNumber: "",
  userZipCode: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "user/getCurrentUserInfo":
      return {
        ...state,
        ...action,
      };

    case "user/updateInformation":
      return {
        ...state,
        userFirstName: action.userFirstName,
        userLastName: action.userLastName,
        userEmail: action.userEmail,
        userId: action.id,
        userName: action.userName,
        userPhoneNumber: action.userPhoneNumber,
        userZipCode: action.zipCode,
      };


    // case "user/resetPWConfirmEmail":
    //   return {
    //     ...state,
    //     pwUpdatedMsg: action.pwUpdatedMsg,
    //     resetPWConfirmEmailStatusCode: action.resetPWConfirmEmailStatusCode,
    //     pwResetRequesting: action.pwResetRequesting,
    //     userEmail: action.userEmail,
    //     showEmailStage: action.showEmailStage,
    //     showConfirmCodeStage: action.showConfirmCodeStage,
    //     resendLink: action.resendLink,
    //   };

    // case "user/resetPWConfirmCode":
    //   return {
    //     ...state,
    //     resetPWConfirmCodeMsg: action.resetPWConfirmCodeMsg,
    //     resetPWConfirmCodeStatusCode: action.resetPWConfirmCodeStatusCode,
    //     pwResetRequesting: action.pwResetRequesting,
    //     showResetPasswordStage: action.showResetPasswordStage,
    //     showConfirmCodeStage: action.showConfirmCodeStage,
    //     resendLink: action.resendLink,
    //   };

    // case "user/changedAppState":
    //   return {
    //     ...state,
    //     appStateChanged: action.appStateChanged,
    //   };

    default:
      return state;
  }
};

export default userReducer;
