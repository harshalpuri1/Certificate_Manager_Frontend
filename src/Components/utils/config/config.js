const constants = {
  strings: {
    newSessionLabel: "newSessionToken",
    regError: "Error registering user",
    logoutSucc:"Logged out successfully!"
  },
  navigationLink: {
    serverDown: "/server-down",
    serverError: "/server-error",
    loginLink: "/",
    certificate:"/Certificate",
    settings:"/settings"
  },
  constantsErrors: {
    sessionExpire: "Your session has expired. Please log in again.",
    serverError: "There was a server error. Please try again later.",
    toastId: "333",
    somethingWentWrong: "Something Went Wrong!",
    logoutErr:"Error logging out"
  },
  apiName: {
    signup: "/signup/user",
    login: "/login/user",
    logout: "/logout/user",
    forgotpsw:"/forgot/send/otp",
    verifyotp:"/forgot/password",
    certificate:"/certificate/user"
  },
 localStorage: {
  authToken: "Authorization",
  userEmail: "Email",
  token:"Token"
  
 }

};

export default constants;